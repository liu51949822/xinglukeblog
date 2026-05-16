import type { DeepseekApiType } from '@/server/deepseek/routes';

import { buildClient, fetchApi } from '@/libs/hono';
import { deepseekPath } from '@/server/deepseek/routes';

export const deepseekClient = buildClient<DeepseekApiType>(deepseekPath);

export const chatApi = {
    sendMessage: async (messages: { role: string; content: string }[]) =>
        fetchApi(deepseekClient, async (c) =>
            c.chat.$post({
                json: { messages },
            }),
        ),
};
