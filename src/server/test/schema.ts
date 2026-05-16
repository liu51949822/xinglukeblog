import { z } from 'zod';

/** Test chat request validation schema */
export const chatRequestSchema = z.object({
    messages: z
        .array(
            z.object({
                role: z.enum(['user', 'assistant']),
                content: z.string().min(1),
            }),
        )
        .min(1),
});

/** Inferred chat request type */
export type ChatRequestInput = z.infer<typeof chatRequestSchema>;