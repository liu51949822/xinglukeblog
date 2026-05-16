import type { MessageApiType } from '@/server/message/routes';

import { buildClient, fetchApi } from '@/libs/hono';
import { messagePath } from '@/server/message/routes';

export const messageClient = buildClient<MessageApiType>(messagePath);

export const messageApi = {
    /** Get paginated message list */
    list: async () => fetchApi(messageClient, async (c) => c.index.$get()),

    /** Create a new message */
    create: async (data: { name: string; content: string }) =>
        fetchApi(messageClient, async (c) =>
            c.index.$post({
                json: data,
            }),
        ),
};
