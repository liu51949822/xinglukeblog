'use client';

import { useChat } from '@ai-sdk/react';  // 改为官方推荐的导入路径
import { Send } from 'lucide-react';

export default function DeepSeekChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/deepseek/chat',
  });

  return (
    <div className="flex flex-col h-[500px] max-w-2xl mx-auto border rounded-lg">
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg px-4 py-2 ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-gray-500">思考中...</div>}
      </div>

      {/* 输入框 */}
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="输入消息..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button type="submit" disabled={isLoading} className="bg-blue-500 text-white rounded-lg px-4 py-2">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
