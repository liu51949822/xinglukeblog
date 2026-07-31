'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
// 假设 deepseekApi.chat 的响应类型包含 error 字段
import type { CreateDeepSeekReponseBody } from '@/server/deepseek/type'; 
import { deepseekApi } from '@/api/chat';

// --- 类型定义 ---
// 定义聊天消息的基本结构
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// 定义 useChat Hook 接收的参数
interface UseChatOptions {
  // 如果未来需要支持不同的 API，可以在这里添加选项
  // api?: string; // 如果不需要，可以移除或保留备用
  // 其他可能的选项...
}

// 定义 useChat Hook 返回的值
interface UseChatReturn {
  messages: ChatMessage[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>; // 明确返回 Promise<void>
  isLoading: boolean;
}


// --- Hook 实现 ---
function useChat({}: UseChatOptions = {}): UseChatReturn { // 解构参数，即使目前没用也保持结构清晰
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // 1. 准备消息和 ID
    const userMessageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const assistantMessageId = `msg_${Date.now() + 1}_${Math.random().toString(36).slice(2, 9)}`; // +1 增加唯一性，或考虑 uuid 库

    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: trimmedInput,
    };

    const assistantPlaceholder: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '', // 空白占位符
    };

    // 2. 原子性地更新状态：同时添加用户消息和助手占位符
    setMessages(prevMessages => [...prevMessages, userMessage, assistantPlaceholder]);
    setInput(''); // 清空输入框
    setIsLoading(true); // 设置加载状态

    try {
      // 3. 构造请求载荷
      // 注意：此时 messages 状态还未更新，我们需要使用即将更新后的列表
      const currentMessages = [...messages, userMessage]; // 包含即将发送的用户消息

      // 4. 调用 API
      const requestBody = {
        messages: currentMessages.map(m => ({ role: m.role, content: m.content })),
        // ... 其他可能需要的参数
      };

      const response: CreateDeepSeekReponseBody = await deepseekApi.chat(requestBody);

      // 5. 检查 API 返回的业务逻辑错误 (关键!)
      // if (response.error) {
      //   throw new Error(response.error.message || 'API returned an error');
      // }

      // 流式响应提取
const content = response
  ?.map(chunk => chunk.choices?.[0]?.delta?.content ?? '')
  .join('')
  .trim();


      if (!content) {
         // 不抛错，而是给出提示，用户体验更好
         console.warn('Received empty content from API.');
      }

      // 7. 成功：更新助手消息的内容
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === assistantMessageId ? { ...msg, content } : msg
        )
      );

    } catch (err: unknown) { // 使用 unknown 更安全
      // 8. 错误处理：构建用户友好的错误信息
      let errorMsg = '未知错误';
      if (err instanceof Error) {
        errorMsg = err.message;
      } else if (typeof err === 'string') {
        errorMsg = err;
      }
      console.error('Chat submission error:', err);

      // 9. 更新助手消息为错误信息
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === assistantMessageId
            ? { ...msg, content: `❌ 请求失败: ${errorMsg}` } // 更清晰的错误提示
            : msg
        )
      );
    } finally {
      // 10. 清理：无论如何都重置加载状态
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
}

export { useChat };
export type { ChatMessage, UseChatOptions, UseChatReturn }; // 导出类型以便复用