import type { z } from 'zod';

import type { messageCreateSchema, messageListSchema, messageSchema } from './schema';

/** Message item type */
export type MessageItem = z.infer<typeof messageSchema>;

/** Message list type */
export type MessageList = z.infer<typeof messageListSchema>;

/** Create message request type */
export type MessageCreateRequest = z.infer<typeof messageCreateSchema>;
