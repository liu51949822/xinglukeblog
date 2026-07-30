// src/server/chat/schema.ts
import { z } from 'zod';
import type { DeepSeekRequestBody } from './type';

export const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string().min(1),
    })
  ).min(1)
});


// 自动推导类型（可覆盖 type.ts 中的手写类型）
export type ChatRequestInput = z.infer<typeof chatRequestSchema>;