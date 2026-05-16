'use server';

import db from '@/libs/db/client';
import type { Message, Prisma } from '@prisma/client';

type MessageCreateInput = Prisma.MessageCreateInput;

/** Query paginated message list (newest first) */
export const queryMessageList = async (page = 1, limit = 20) => {
    const data = await db.message.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
    });
    const total = await db.message.count();
    return {
        items: data.map(formatMessage),
        meta: {
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        },
    };
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
