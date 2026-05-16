import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import type { ChatRequestInput } from '@/server/deepseek/schema';

const apiKey = process.env.DEEPSEEK_API_KEY || '';
const baseURL = 'https://api.deepseek.com/v1';

const deepseek = createOpenAI({
    apiKey,
    baseURL,
    compatibility: 'strict',
});

/** Generate streaming chat response via DeepSeek API */
export async function generateChatResponse(messages: ChatRequestInput['messages']) {
    try {
        const result = await streamText({
            model: deepseek('deepseek-chat'),
            messages,
        });
        return result;
    } catch (error) {
        console.error('streamText 调用出错:', error);
        throw error;
    }
}
