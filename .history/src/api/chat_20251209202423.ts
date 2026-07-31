import type { DeepseekApiType } from '@/server/deepseek/routes';
import { deepseekPath } from '@/server/deepseek/routes';
import type { DeepSeekRequestBody, CreateDeepSeekReponseBody } from '@/server/deepseek/type';
import { buildClient, fetchApi } from '@/libs/hono';

export const deepseekClient = buildClient<DeepseekApiType>(deepseekPath);

export const deepseekApi = {
    /**
     * 向DeepSeek聊天API发送POST请求
     * @param data - 包含聊天消息的请求体数据
     * @returns 包含聊天响应的Promise对象
     * @throws 当API请求失败时抛出错误
     */
    chat: async (data: DeepSeekRequestBody): Promise<CreateDeepSeekReponseBody> => {
        console.log('调用deepseekApi chat方法');
        const back = await fetchApi(deepseekClient, async (c) => 
            c.chat.$post({ json: data })
        );
        return await back;
    },
    // 其他接口...
};