// src/server/chat/schema.ts
import { z } from 'zod';

// ✅ 明确指定 role 的合法值
const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']), // 👈 关键修复！
  content: z.string().min(1, 'Content cannot be empty'),
});

export const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1, 'At least one message is required'),
});

// 自动推导完整类型
export type ChatRequestInput = z.infer<typeof chatRequestSchema>;