// src/server/chat/service.ts
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai'; 
import type { StreamTextResult } from 'ai';
import type { ChatRequestInput} from './schema';

 
const apiKey = 'sk-76ad0f1d9d89480495f575a062aaec21'; // 确保有 sk- 前缀
const baseURL = 'https://api.deepseek.com/v1';

const deepseek = createOpenAI({
  apiKey: apiKey,     
  baseURL: baseURL,   
});
/**
 * 生成聊天响应，调用DeepSeek API获取流式文本回复
 * @param {ChatRequestInput['messages']} messages - 聊天消息数组，包含用户输入和上下文
 * @returns {Promise<StreamingTextResponse>} 返回流式文本响应对象
 * @throws {Error} 当API调用失败时抛出错误
 */
export async function generateChatResponse(messages: ChatRequestInput['messages']) {

  console.info('========== Service 层调用 DeepSeek API ==========');
  console.info('使用的模型: deepseek-chat');
  console.info('Base URL:', baseURL);
  console.info('API Key 前 10 位:', apiKey.substring(0, 10) + '...');

  const result = await streamText({
    model: deepseek.chat('deepseek-chat'),
    messages,
  });

  console.info('streamText 返回结果类型:', typeof result);
  console.info('streamText 返回结果 keys:', Object.keys(result));
  console.info('========== Service 层调用完成 ==========');

  return result;
}  