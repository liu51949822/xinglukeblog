import { describeRoute } from 'hono-openapi';
import { validator } from 'hono-openapi/zod';
import { z } from 'zod';

import { createErrorResult } from '@/server/common/error';
import { createHonoApp } from '@/server/common/app';
import { generateChatResponse } from '@/server/deepseek/service';
import type { ChatRequestInput } from '@/server/deepseek/schema';

const app = createHonoApp();

/** DeepSeek API route prefix */
export const deepseekPath = '/deepseek';

export type DeepseekApiType = typeof deepseekRoutes;

/** DeepSeek 聊天接口 */
export const postTags = ['deepseek 聊天接口'];

/** Chat request body validation schema */
const chatSchema = z.object({
    messages: z
        .array(
            z.object({
                role: z.enum(['user', 'assistant', 'system']),
                content: z.string().min(1, 'Content cannot be empty'),
            }),
        )
        .min(1, 'At least one message is required'),
});

/** Standard error response schema */
const errorResponseSchema = z.object({
    error: z.string(),
    details: z.any().optional(),
});

/** DeepSeek streaming chat endpoint */
export const deepseekRoutes = app.post('/chat', describeRoute({
    tags: ['DeepSeek 聊天接口'],
    summary: 'DeepSeek 聊天接口',
    description: '调用 DeepSeek API 进行聊天对话，支持流式响应',
    requestBody: {
        required: true,
        content: {
            'application/json': {
                schema: {
                    type: 'string',
                    description: '流式文本响应',
                },
            },
        },
    },
    responses: {
        200: {
            description: '成功返回流式聊天响应',
            content: {
                'text/plain': {
                    schema: {
                        type: 'string',
                        description: '流式文本响应',
                    },
                },
            },
        },
        400: {
            description: '请求格式错误',
            content: {
                'application/json': {
                    schema: {
                        type: 'string',
                        description: '流式文本响应',
                    },
                },
            },
        },
        500: {
            description: '服务器内部错误',
            content: {
                'application/json': {
                    schema: {
                        type: 'string',
                        description: '流式文本响应',
                    },
                },
            },
        },
    },
}), validator('json', chatSchema, (result, c) => {
    if (!result.success) {
        return c.json(
            createErrorResult('Invalid request format', result.error.issues),
            400,
        );
    }
}), async (c) => {
    try {
        const { messages } = c.req.valid('json');
        const stream = await generateChatResponse(messages as ChatRequestInput['messages']);
        return stream.toAIStreamResponse();
    } catch (error: any) {
        console.error('DeepSeek API error:', error.message);

        if (error.message.includes('API key')) {
            return c.json(createErrorResult('API authentication failed'), 401);
        }
        if (error.message.includes('quota')) {
            return c.json(createErrorResult('API quota exceeded'), 429);
        }
        return c.json(
            createErrorResult('Failed to connect to DeepSeek', error.message),
            500,
        );
    }
});
