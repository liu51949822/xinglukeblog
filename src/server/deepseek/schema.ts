import { z } from 'zod';

/** Chat message with role and content */
const messageSchema = z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1, 'Content cannot be empty'),
});

/** DeepSeek chat request body */
export const chatRequestSchema = z.object({
    messages: z.array(messageSchema).min(1, 'At least one message is required'),
});

/** Inferred chat request type */
export type ChatRequestInput = z.infer<typeof chatRequestSchema>;