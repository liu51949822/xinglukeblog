import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { z } from "zod";

// import  type { chatRequestSchema } from "./schema";
import { createErrorResult } from "../common/error";
import { createHonoApp } from "../common/app";
import { defaultValidatorErrorHandler } from "../common/error";
import {
  createSuccessResponse,
  createValidatorErrorResponse,
  createServerErrorResponse,
} from "../common/response";

const app = createHonoApp();

export const testPath = "/test";
export type TestApiType = typeof testRoutes;
export const testTags = ["测试接口"];

// 请求体Schema
const testChatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1, "消息内容不能为空"),
    })
  ).min(1, "至少需要一条消息"),
});

// 响应体Schema
const testChatResponseSchema = z.object({
  message: z.string(),
  data: z.string(),
  timestamp: z.string().datetime(),
});

export const testRoutes = app
  .get(
    "/chat",
    describeRoute({
      tags: testTags,
      summary: "测试聊天接口",
      description: "测试接口，返回固定响应数据",
      responses: {
        ...createSuccessResponse(
          z.object({
            status: z.string(),
            timestamp: z.string().datetime(),
            version: z.string(),
          }),
          "服务正常运行"
        ),
        ...createServerErrorResponse("服务异常"),
      },
    }),
    async (c) => {
      try {
        
        
        // 返回测试响应
        return c.json({
          message: "success",
          data: "32423423423423",
          timestamp: new Date().toISOString(),
        }, 200);

      } catch (error: any) {
        console.error("测试接口错误:", error.message);
        return c.json(
          createErrorResult("测试接口调用失败", error.message),
          500
        );
      }
    }
  )
  .get(
    "/health",
    describeRoute({
      tags: testTags,
      summary: "健康检查接口",
      description: "检查服务是否正常运行",
      responses: {
        ...createSuccessResponse(
          z.object({
            status: z.string(),
            timestamp: z.string().datetime(),
            version: z.string(),
          }),
          "服务正常运行"
        ),
        ...createServerErrorResponse("服务异常"),
      },
    }),
    async (c) => {
      try {
        return c.json({
          status: "healthy",
          timestamp: new Date().toISOString(),
          version: "1.0.0",
        }, 200);
      } catch (error: any) {
        return c.json(
          createErrorResult("健康检查失败", error.message),
          500
        );
      }
    }
  )
  .get(
    "/echo",
    describeRoute({
      tags: testTags,
      summary: "回显测试接口",
      description: "返回传入的查询参数",
      parameters: [
        {
          name: "message",
          in: "query",
          required: false,
          schema: { type: "string" },
          description: "要回显的消息",
        },
      ],
      responses: {
        ...createSuccessResponse(
          z.object({
            echo: z.string(),
            receivedAt: z.string().datetime(),
          }),
          "回显成功"
        ),
      },
    }),
    async (c) => {
      const message = c.req.query("message") || "Hello, World!";
      
      return c.json({
        echo: message,
        receivedAt: new Date().toISOString(),
      }, 200);
    }
  );
