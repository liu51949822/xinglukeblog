// src/server/chat/service.ts
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import type { ChatRequestInput } from './schema';
import { searchKnowledge } from '@/knowledge-base';

// 从环境变量读取 API Key，避免硬编码导致密钥泄露
const apiKey = process.env.DEEPSEEK_API_KEY || '';
const baseURL = process.env.OPENAI_BASE_URL || 'https://api.deepseek.com/v1';

const deepseek = createOpenAI({
  apiKey,
  baseURL,
  compatibility: 'strict',
});

// 知识库问答的系统提示词
const RAG_SYSTEM_PROMPT = `你是一位求职知识库问答助手，负责回答关于「求职者行路客」的问题。

## 你的职责
- 根据提供的知识库内容，准确回答关于求职者的技能、经历、项目、求职方向等问题
- 知识库内容来自求职者的真实简历信息

## 回答规则
1. 优先基于「知识库内容」回答，引用其中信息
2. 如果问题与求职者信息无关（如闲聊、技术难题、其他话题），礼貌说明「我可以回答关于求职者技能、经历和求职方向的问题」，并简要引导
3. 如果知识库中没有相关信息，如实说明「知识库中暂无此信息」
4. 回答简洁、专业，使用中文
5. 不要编造知识库中不存在的信息

## 知识库内容
{{knowledge}}
`;

/**
 * 从知识库检索相关片段，拼入系统提示词
 */
function buildRagSystemPrompt(query: string): string {
  const chunks = searchKnowledge(query, 4);
  if (chunks.length === 0) {
    return RAG_SYSTEM_PROMPT.replace('{{knowledge}}', '（本次问题未命中知识库，请引导用户询问求职者信息）');
  }
  const knowledgeText = chunks
    .map((c, i) => `【片段${i + 1}】${c.content}`)
    .join('\n\n');
  return RAG_SYSTEM_PROMPT.replace('{{knowledge}}', knowledgeText);
}

export async function generateChatResponse(messages: ChatRequestInput['messages']) {
  // 取用户最后一条消息作为检索 query
  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
  const query = lastUserMsg?.content || '';

  // 构建带知识库上下文的系统提示
  const systemPrompt = buildRagSystemPrompt(query);

  // 组装最终消息（系统提示 + 历史对话）
  const ragMessages = [
    { role: 'system' as const, content: systemPrompt },
    ...messages,
  ];

  console.info('========== RAG 知识库问答调用 ==========');
  console.info('检索 query:', query);
  console.info('命中知识片段数:', searchKnowledge(query, 4).length);

  try {
    const result = await streamText({
      model: deepseek('deepseek-chat'),
      messages: ragMessages,
    });

    console.info('========== RAG 问答完成 ==========');
    return result;
  } catch (error) {
    console.error('RAG 问答调用出错:', error);
    throw error;
  }
}
