import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { validator } from 'hono-openapi/zod';
import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';

const app = new Hono();

export const knowledgePath = '/knowledge';

const knowledgeSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string().min(1, 'Content cannot be empty'),
    })
  ).min(1, 'At least one message is required'),
});

async function loadKnowledgeBase(): Promise<string> {
  const knowledgeDir = path.join(process.cwd(), 'src', 'knowledge');
  const files = ['profile.md', 'skills.md', 'experience.md', 'projects.md'];
  let content = '';

  for (const file of files) {
    try {
      const fileContent = await fs.readFile(path.join(knowledgeDir, file), 'utf-8');
      content += `\n\n---\n\n${fileContent}`;
    } catch {
      console.warn(`Knowledge file not found: ${file}`);
    }
  }

  return content.trim();
}

const apiKey = process.env.DEEPSEEK_API_KEY || 'sk-76ad0f1d9d89480495f575a062aaec21';
const baseURL = 'https://api.deepseek.com/v1';

const deepseek = createOpenAI({
  apiKey,
  baseURL,
  compatibility: 'strict',
});

export const knowledgeRoutes = app.post(
  '/chat',
  describeRoute({
    tags: ['知识库问答'],
    summary: '基于 MD 知识库的 AI 问答',
    description: '加载个人知识库 Markdown 文件作为上下文，回答关于个人的问题',
  }),
  validator('json', knowledgeSchema, (result, c) => {
    if (!result.success) {
      return c.json({ error: 'Invalid request format', details: result.error.issues }, 400);
    }
  }),
  async (c) => {
    try {
      const { messages } = c.req.valid('json');

      const knowledgeBase = await loadKnowledgeBase();

      const systemPrompt = `你是一个关于"行路客"（求职者）的个人 AI 助手，用于求职场景。

【核心原则 - 必须遵守】
1. 所有回答必须严格基于以下知识库内容，绝对禁止编造和幻觉
2. 如果用户的问题在知识库中找不到对应信息，必须明确告知用户"知识库中没有相关信息"
3. 不要猜测、不要假设、不要补充知识库之外的任何信息
4. 如果用户问的问题与行路客本人无关（如写代码、做数学题、闲聊等），回答："我是行路客的个人 AI 助手，我只能回答与行路客相关的问题。请问你想了解关于行路客的哪些方面？"
5. 回答时用中文，语气友好专业，简洁有条理

以下是关于"行路客"的知识库内容：

${knowledgeBase}

【知识库边界提醒】
再次强调：只回答知识库中明确存在的内容。不确定的、没有依据的、知识库之外的，一律回复"知识库中没有相关信息"。`;

      const fullMessages = [
        { role: 'system' as const, content: systemPrompt },
        ...messages,
      ];

      const result = await streamText({
        model: deepseek('deepseek-chat'),
        messages: fullMessages,
      });

      return result.toAIStreamResponse();
    } catch (error: any) {
      console.error('Knowledge chat error:', error.message);
      return c.json({ error: 'Failed to process request', message: error.message }, 500);
    }
  }
);

export type KnowledgeApiType = typeof knowledgeRoutes;
