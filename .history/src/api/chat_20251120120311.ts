// src/api/deepseek.ts
import type { DeepseekApiType } from '@/server/deepseek/routes';
import { deepseekPath } from '@/server/deepseek/routes';
import type { DeepSeekRequestBody } from '@/server/deepseek/type';
import { buildClient, fetchApi } from '@/libs/hono';

// Create the type-safe client
export const deepseekClient = buildClient<DeepseekApiType>(deepseekPath);

export const deepseekApi = {
    /**
     * Calls the DeepSeek chat API
     * @param {DeepSeekRequestBody} data - Chat request data containing messages
     * @returns {Promise<DeepSeekResponseBody>} Returns the chat response
     * @throws {Error} Throws error when API request fails
     */
    chat/**
 * 向DeepSeek聊天API发送POST请求
 * @param {DeepSeekRequestBody} data - 包含聊天消息的请求体数据
 * @returns {Promise<DeepSeekResponseBody>} 包含聊天响应的Promise对象
 * @throws {Error} 当API请求失败时抛出错误
 */
: async (data: DeepSeekRequestBody) => {
        console.log('调用deepseekApi chat方法');

        return fetchApi(deepseekClient, async (c) => 
              c.deepseek.chat.$post({ json: data })
        );
    },
    
    // Add other endpoints as needed
    // Example: getStatus: async () => fetchApi(deepseekClient, c => c.status.$get())
};
