'use client';

import { useChat } from 'ai/react';
import { Send } from 'lucide-react';

export default function DeepSeekChat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: '/api/deepseek/chat',
  });

  return (
    <div className="flex flex-col h-[500px] max-w-2xl mx-auto border rounded-lg shadow-sm">
      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-white">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            开始与 DeepSeek 对话吧...
          </div>
        )}
        
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-4 py-2 break-words ${
                m.role === 'user' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-900 border border-gray-200'
              }`}
            >
              {/* 这里可以后续接入 markdown 渲染组件 */}
              {m.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 rounded-lg px-4 py-2 text-sm italic animate-pulse">
              DeepSeek 正在思考...
            </div>
          </div>
        )}
      </div>

      {/* 输入框区域 */}
      <form 
        onSubmit={handleSubmit} 
        className="flex gap-2 p-4 border-t bg-gray-50 rounded-b-lg"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="输入消息..."
          disabled={isLoading}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400 transition-all"
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()} 
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
