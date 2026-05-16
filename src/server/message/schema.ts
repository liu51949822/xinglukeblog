import { z } from 'zod';
import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

/** Message list response item */
export const messageSchema = z.object({
    id: z.string().openapi({ description: '留言ID' }),
    name: z.string().openapi({ description: '留言者名称' }),
    content: z.string().openapi({ description: '留言内容' }),
    createdAt: z.string().datetime().openapi({ description: '创建时间' }),
});

/** Message list response */
export const messageListSchema = z
    .array(messageSchema)
    .openapi({ ref: 'MessageList', description: '留言列表数据' });

/** Create message request body */
export const messageCreateSchema = z.object({
    name: z.string().min(1, '名称不能为空').max(50, '名称最长50个字符'),
    content: z
        .string()
        .min(1, '留言内容不能为空')
        .max(1000, '留言内容最长1000个字符'),
});
