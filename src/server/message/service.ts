'use server';

import db from '@/libs/db/client';
import type { Message, Prisma } from '@prisma/client';

type MessageCreateInput = Prisma.MessageCreateInput;

/** Query message list (newest first, limited to 50) */
export const queryMessageList = async () => {
    const data = await db.message.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
    });
    return data.map(formatMessage);
};

/** Create a new message */
export const createMessage = async (data: MessageCreateInput) => {
    const message = await db.message.create({ data });
    return formatMessage(message);
};

/** Format Prisma Message to API response */
const formatMessage = (m: Message) => ({
    id: m.id,
    name: m.name,
    content: m.content,
    createdAt: m.createdAt.toISOString(),
});
