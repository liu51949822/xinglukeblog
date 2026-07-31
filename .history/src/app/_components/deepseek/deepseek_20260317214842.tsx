'use client';

import { useChat } from '@ai-sdk/react';
import { Send } from 'lucide-react';
import Background from '../background/background';

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
    <>
      {/* 背景 */}
      <Background />

      {/* 页面容器 - 必须用这个包裹才能居中 */}
      <div className="tw-page-item">
        {/* 内容容器 */}
        <div className="tw-page-container">
          
          {/* 页面标题 */}
          <div className="tw-text-center tw-mb-6">
            <h1 className="tw-text-3xl tw-font-bold tw-text-black tw-bg-white/80 tw-inline-block tw-px-6 tw-py-2 tw-rounded-lg tw-backdrop-blur-sm">
              DeepSeek AI 对话
            </h1>
            <p className="tw-mt-2 tw-text-gray-600 dark:tw-text-gray-300 tw-bg-white/60 dark:tw-bg-black/60 tw-inline-block tw-px-4 tw-py-1 tw-rounded tw-backdrop-blur-sm">
              与 AI 智能助手对话
            </p>
          </div>

          {/* 聊天容器 */}
          <div className="tw-w-full tw-bg-white dark:tw:bg-gray-800 tw-rounded-xl tw-shadow-lg tw-border tw-border-gray-200 dark:tw-border-gray-700 tw-overflow-hidden">
            
            {/* 消息列表 */}
            <div className="tw-h-[500px] tw-overflow-y-auto tw-p-4 tw-space-y-4 tw-bg-white dark:tw:bg-gray-800">
              {messages.length === 0 && (
                <div className="tw-text-center tw-text-gray-400 tw-py-20">
                  开始与 DeepSeek 对话吧...
                </div>
              )}
              
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`tw-flex ${m.role === 'user' ? 'tw-justify-end' : 'tw-justify-start'}`}
                >
                  <div 
                    className={`tw-max-w-[80%] tw-rounded-lg tw-px-4 tw-py-2 tw-break-words ${
                      m.role === 'user' 
                        ? 'tw-bg-blue-500 tw-text-white tw-shadow-md' 
                        : 'tw-bg-gray-100 dark:tw:bg-gray-700 tw-text-gray-900 dark:tw:text-gray-100'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="tw-flex tw-justify-start">
                  <div className="tw-bg-gray-100 dark:tw:bg-gray-700 tw-text-gray-500 dark:tw:text-gray-400 tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm tw-italic animate-pulse">
                    DeepSeek 正在思考...
                  </div>
                </div>
              )}
            </div>

            {/* 输入框区域 */}
            <form 
              onSubmit={handleSubmit} 
              className="tw-flex tw-gap-2 tw-p-4 tw-border-t tw-border-gray-200 dark:tw-border-gray-700 tw-bg-gray-50 dark:tw:bg-gray-900"
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="输入消息..."
                disabled={isLoading}
                className="tw-flex-1 tw-border tw-border-white-300 dark:tw-border-gray-600 tw-rounded-lg tw-px-4 tw-py-2 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-disabled:tw-bg-gray-100 dark:tw-disabled:tw-bg-gray-800 tw-transition-all tw-bg-white dark:tw-bg-gray-800 tw-text-black"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()} 
                className="tw-bg-blue-500 tw-text-white tw-rounded-lg tw-px-4 tw-py-2 hover:tw-bg-blue-600 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed tw-transition-colors tw-flex tw-items-center tw-justify-center"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
