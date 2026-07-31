import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { z } from "zod";
import { createErrorResult } from "../common/error";
import { createHonoApp } from "../common/app";
import { generateChatResponse } from "./service";
import type { ChatRequestInput } from "./schema";

const app = createHonoApp();

export const deepseekPath = "/deepseek";

export type DeepseekApiType = typeof deepseekRoutes;
export const postTags = ['deepseek 聊天接口 '];


// 强化 Zod 校验
const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1, "Content cannot be empty"),
    })
  ).min(1, "At least one message is required"),
});

// 错误响应模式
const errorResponseSchema = z.object({
  error: z.string(),
  details: z.any().optional(),
});

export const deepseekRoutes = app.post(
  `/chat`,
  describeRoute({
    tags: ["DeepSeek 聊天接口"],
    summary: "DeepSeek 聊天接口",
    description: "调用 DeepSeek API 进行聊天对话，支持流式响应",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
              type: "string",
              description: "流式文本响应",
            },
        },
      },
    },
    responses: {
      200: {
        description: "成功返回流式聊天响应",
        content: {
          "text/plain": {
            schema: {
              type: "string",
              description: "流式文本响应",
            },
          },
        },
      },
      400: {
        description: "请求格式错误",
        content: {
          "application/json": {
            schema: {
              type: "string",
              description: "流式文本响应",
            },
          },
        },
      },
      500: {
        description: "服务器内部错误",
        content: {
          "application/json": {
            schema: {
              type: "string",
              description: "流式文本响应",
            },
          },
        },
      },
    },
  }),
  validator("json", chatSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        createErrorResult(
          "Invalid request format",
          result.error.issues
        ),
        400
      );
    }
  }),
  async (c) => {
    try {
      const { messages } = c.req.valid("json");

      console.info('========== DeepSeek 请求开始 ==========');
      console.info('请求消息数量:', messages.length);
      console.info('请求内容:', JSON.stringify(messages, null, 2));

      // 调用服务层生成响应
      const stream = await generateChatResponse(messages as ChatRequestInput['messages']);

      console.info('Stream 对象类型:', typeof stream);
      console.info('Stream 对象 keys:', Object.keys(stream));

      // 返回 AI SDK 格式的流式响应
      const response = stream.toAIStreamResponse();

      console.info('响应 Content-Type:', response.headers.get('content-type'));
      return response;

    } catch (error: any) {
      console.error("DeepSeek API error:", error.message);
      
      // 根据错误类型返回不同的状态码
      if (error.message.includes("API key")) {
        return c.json(
          createErrorResult("API authentication failed"),
          401
        );
      }
      
      if (error.message.includes("quota")) {
        return c.json(
          createErrorResult("API quota exceeded"),
          429
        );
      }
      
      return c.json(
        createErrorResult("Failed to connect to DeepSeek", error.message),
        500
      );
    }
  }
);


