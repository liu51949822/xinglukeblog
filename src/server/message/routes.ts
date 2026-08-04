import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { z } from "zod";

import { createErrorResult } from "../common/error";
import { createHonoApp } from "../common/app";
import {
  createSuccessResponse,
  createServerErrorResponse,
  createValidatorErrorResponse,
} from "../common/response";
import db from '@/libs/db/client';

const app = createHonoApp();

export const messagePath = "/message";
export const messageTags = ["留言板"];

// 创建留言请求体
const createMessageSchema = z.object({
  name: z.string().min(1, "昵称不能为空").max(50, "昵称过长"),
  content: z.string().min(1, "留言内容不能为空").max(500, "留言过长"),
});

// 留言响应体
const messageItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.string(),
  createdAt: z.string(),
});

export const messageRoutes = app
  // 获取留言列表
  .get(
    "/list",
    describeRoute({
      tags: messageTags,
      summary: "获取留言列表",
      description: "按时间倒序返回所有留言",
      responses: {
        ...createSuccessResponse(
          z.object({
            list: z.array(messageItemSchema),
          }),
          "获取成功"
        ),
        ...createServerErrorResponse("服务异常"),
      },
    }),
    async (c) => {
      try {
        const messages = await db.message.findMany({
          orderBy: { createdAt: 'desc' },
          take: 100,
        });
        return c.json({
          message: "success",
          data: {
            list: messages.map((m) => ({
              id: m.id,
              name: m.name,
              content: m.content,
              createdAt: m.createdAt.toISOString(),
            })),
          },
        }, 200);
      } catch (error: any) {
        console.error("获取留言失败:", error.message);
        return c.json(
          createErrorResult("获取留言失败", error.message),
          500
        );
      }
    }
  )
  // 创建留言
  .post(
    "/create",
    describeRoute({
      tags: messageTags,
      summary: "创建留言",
      description: "新增一条留言",
      responses: {
        ...createSuccessResponse(
          z.object({
            item: messageItemSchema,
          }),
          "创建成功"
        ),
        ...createValidatorErrorResponse("参数校验失败"),
        ...createServerErrorResponse("服务异常"),
      },
    }),
    validator("json", createMessageSchema, (result, c) => {
      if (!result.success) {
        return c.json(
          createErrorResult(
            "参数校验失败",
            result.error.issues.map((i) => i.message).join("; ")
          ),
          400
        );
      }
    }),
    async (c) => {
      try {
        const { name, content } = c.req.valid("json");
        const created = await db.message.create({
          data: { name, content },
        });
        return c.json({
          message: "success",
          data: {
            item: {
              id: created.id,
              name: created.name,
              content: created.content,
              createdAt: created.createdAt.toISOString(),
            },
          },
        }, 200);
      } catch (error: any) {
        console.error("创建留言失败:", error.message);
        return c.json(
          createErrorResult("创建留言失败", error.message),
          500
        );
      }
    }
  );
