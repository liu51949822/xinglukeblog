// src/server/chat/service.ts
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import type { ChatRequestInput} from './schema';


// 从环境变量读取 API Key，避免硬编码导致密钥泄露
const apiKey = process.env.DEEPSEEK_API_KEY || '';
const baseURL = process.env.OPENAI_BASE_URL || 'https://api.deepseek.com/v1';

const deepseek = createOpenAI({
  apiKey: apiKey,
  baseURL: baseURL,
  compatibility: 'strict',  // 添加兼容性模式
});

export async function generateChatResponse(messages: ChatRequestInput['messages']) {

  console.info('========== Service 层调用 DeepSeek API ==========');
  console.info('使用的模型: deepseek-chat');
  console.info('Base URL:', baseURL);
  console.info('API Key 前 10 位:', apiKey.substring(0, 10) + '...');

  try {
    const result = await streamText({
      model: deepseek('deepseek-chat'),  // 直接调用，而不是 deepseek.chat()
      messages,
    });

    console.info('streamText 返回结果类型:', typeof result);
    console.info('streamText 返回结果 keys:', Object.keys(result));
    console.info('========== Service 层调用完成 ==========');

    return result;
  } catch (error) {
    console.error('streamText 调用出错:', error);
    throw error;
  }
}