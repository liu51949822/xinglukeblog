import { describeRoute } from 'hono-openapi';
import { validator } from 'hono-openapi/zod';

import { createHonoApp } from '@/server/common/app';
import { createErrorResult } from '@/server/common/error';
import {
    createServerErrorResponse,
    createSuccessResponse,
    createValidatorErrorResponse,
} from '@/server/common/response';
import { messageCreateSchema, messageListSchema } from './schema';
import { createMessage, queryMessageList } from './service';

const app = createHonoApp();

export const messageTags = ['留言操作'];

export const messagePath = '/messages';

export type MessageApiType = typeof messageRoutes;

export const messageRoutes = app
    .get('/', describeRoute({
        tags: messageTags,
        summary: '留言列表查询',
        description: '查询留言板列表，按时间倒序排列',
        responses: {
            ...createSuccessResponse(messageListSchema),
            ...createServerErrorResponse('查询留言列表数据失败'),
        },
    }), async (c) => {
        try {
            const { items } = await queryMessageList();
            return c.json(items, 200);
        } catch (error) {
            return c.json(createErrorResult('查询留言列表数据失败', error), 500);
        }
    })
    .post('/', describeRoute({
        tags: messageTags,
        summary: '创建留言',
        description: '在留言板中创建一条新留言',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            name: { type: 'string', description: '留言者名称' },
                            content: { type: 'string', description: '留言内容' },
                        },
                        required: ['name', 'content'],
                    },
                },
            },
        },
        responses: {
            ...createSuccessResponse(messageListSchema, '留言成功'),
            ...createValidatorErrorResponse(),
            ...createServerErrorResponse('留言失败'),
        },
    }), validator('json', messageCreateSchema, async (result, c) => {
        if (!result.success) {
            return c.json(
                createErrorResult('请求数据格式错误', result.error.issues),
                400,
            );
        }
    }), async (c) => {
        try {
            const data = c.req.valid('json');
            const message = await createMessage(data);
            return c.json(message, 201);
        } catch (error) {
            return c.json(createErrorResult('留言失败', error), 500);
        }
    });
