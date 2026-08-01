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

// 知识库问答的系统提示词（口语化，不要 AI 腔）
const RAG_SYSTEM_PROMPT = `你是「行路客」的小档案问答助手，别人问你关于这个人的事，你照着档案内容回答。

## 回答风格
- 用大白话回答，像朋友聊天一样，别整官方腔调
- 别用"根据知识库""综上所述"这种词
- 别人问啥答啥，简短点，别啰嗦
- 用中文回答

## 规则
1. 优先用下面档案里的信息回答，别瞎编
2. 别人问的东西档案里没有，就说"这个档案里没写"，顺便引导他问档案里有的（技能、经历、项目、求职方向）
3. 别人问无关的话题（天气、闲聊别的），就说"我只了解行路客的简历，问点他的事吧"
4. 别吹过头，也别刻意低调，正常介绍就行

## 档案内容
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
