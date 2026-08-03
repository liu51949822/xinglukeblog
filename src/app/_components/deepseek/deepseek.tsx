'use client';

import { useChat } from '@ai-sdk/react';
import { Send, Mic, Square, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';
import Background from '../background/background';
import { useLocale } from '@/i18n/store';
import { getTranslation } from '@/i18n/translations';
import { useVoiceChat } from './useVoiceChat';

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
  const locale = useLocale();
  const t = getTranslation(locale).chat;
  const examples = getTranslation(locale).kb.examples;

  // 语音对话
  const voice = useVoiceChat();
  const [autoSpeak, setAutoSpeak] = useState(true);

  // 处理语音识别结果：识别完自动发送
  const handleVoiceToggle = async () => {
    if (voice.listening) {
      const text = await voice.stopListening();
      if (text.trim()) {
        // 把识别文字放入输入框并发送
        handleInputChange({ target: { value: text } } as any);
        // 通过 appendMessage 方式发送
        setTimeout(() => {
          // 触发发送（复用 useChat 的 submit）
          const form = document.getElementById('chat-form') as HTMLFormElement;
          form?.requestSubmit();
        }, 100);
      }
    } else {
      voice.startListening();
    }
  };

  // 处理回答朗读：最后一条 assistant 消息自动朗读
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === 'assistant');

  const handleSpeakAnswer = () => {
    if (!lastAssistantMsg) return;
    if (voice.speaking) {
      voice.stopSpeaking();
    } else {
      voice.speak(lastAssistantMsg.content, locale === 'en' ? 'en-US' : 'zh-CN');
    }
  };

  return (
    <>
      {/* 背景 */}
      <Background />

      {/* 页面容器 */}
      <div className="tw-page-item">
        <div className="tw-page-container">

          {/* 页面标题 */}
          <div className="tw-text-center tw-mb-6">
            <h1 className="tw-text-3xl tw-font-bold tw-text-black tw-bg-white/80 tw-inline-block tw-px-6 tw-py-2 tw-rounded-lg tw-backdrop-blur-sm">
              {t.title}
            </h1>
            <p className="tw-mt-2 tw-text-gray-600 dark:tw-text-gray-300 tw-bg-white/60 dark:tw-bg-black/60 tw-inline-block tw-px-4 tw-py-1 tw-rounded tw-backdrop-blur-sm">
              {t.subtitle}
            </p>
          </div>

          {/* 聊天容器 */}
          <div className="tw-w-full tw-bg-white dark:tw:bg-gray-800 tw-rounded-xl tw-shadow-lg tw-border tw-border-gray-200 dark:tw-border-gray-700 tw-overflow-hidden">

            {/* 消息列表 */}
            <div className="tw-h-[420px] tw-overflow-y-auto tw-p-4 tw-space-y-4 tw-bg-white dark:tw:bg-gray-800">
              {messages.length === 0 && (
                <div className="tw-text-center tw-text-gray-400 tw-py-16">
                  <div className="tw-mb-3">💡 {t.emptyTitle}</div>
                  <div className="tw-space-y-2 tw-text-sm">
                    {examples.map((ex) => (
                      <div key={ex} className="tw-bg-gray-50 dark:tw:bg-gray-700 tw-rounded-lg tw-px-4 tw-py-2 tw-inline-block">
                        {ex}
                      </div>
                    ))}
                  </div>
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
                    {/* 朗读按钮（assistant 消息） */}
                    {m.role === 'assistant' && (
                      <button
                        onClick={handleSpeakAnswer}
                        className="tw-ml-2 tw-text-gray-400 hover:tw-text-blue-500 tw-transition-colors tw-align-middle"
                        title={voice.speaking ? '停止朗读' : '朗读'}
                      >
                        {voice.speaking ? <VolumeX className="tw-w-3.5 tw-h-3.5" /> : <Volume2 className="tw-w-3.5 tw-h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="tw-flex tw-justify-start">
                  <div className="tw-bg-gray-100 dark:tw:bg-gray-700 tw-text-gray-500 dark:tw:text-gray-400 tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm tw-italic animate-pulse">
                    {t.thinking}
                  </div>
                </div>
              )}
            </div>

            {/* 输入框区域 */}
            <form
              id="chat-form"
              onSubmit={handleSubmit}
              className="tw-flex tw-gap-2 tw-p-4 tw-border-t tw-border-gray-200 dark:tw-border-white-700 tw-bg-gray-50 dark:tw:bg-white-900"
            >
              <input
                value={voice.interimText || input}
                onChange={handleInputChange}
                placeholder={t.inputPlaceholder}
                disabled={isLoading}
                className="tw-flex-1 tw-border tw-border-white-300 tw-rounded-lg tw-px-4 tw-py-2 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-blue-500 tw-focus:border-transparent tw-disabled:tw-bg-gray-100 dark:tw-disabled:tw-bg-gray-800 tw-transition-all tw-bg-white tw-text-black"
              />
              {/* 麦克风按钮（语音输入） */}
              {voice.supported && (
                <button
                  type="button"
                  onClick={handleVoiceToggle}
                  title={voice.listening ? '停止录音' : '语音输入'}
                  className={`tw-rounded-lg tw-px-4 tw-py-2 tw-flex tw-items-center tw-justify-center tw-transition-colors ${
                    voice.listening
                      ? 'tw-bg-red-500 tw-text-white hover:tw-bg-red-600 tw-animate-pulse'
                      : 'tw-bg-emerald-500 tw-text-white hover:tw-bg-emerald-600'
                  }`}
                >
                  {voice.listening ? <Square className="tw-size-5" /> : <Mic className="tw-size-5" />}
                </button>
              )}
              <button
                type="submit"
                disabled={isLoading || !(input.trim() || voice.interimText.trim())}
                className="tw-bg-blue-500 tw-text-white tw-rounded-lg tw-px-4 tw-py-2 hover:tw-bg-blue-600 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed tw-transition-colors tw-flex tw-items-center tw-justify-center"
              >
                <Send size={20} />
              </button>
            </form>
          </div>

          {/* 语音提示 */}
          {!voice.supported && (
            <p className="tw-text-center tw-text-xs tw-text-gray-500 tw-mt-3">
              当前浏览器不支持语音对话，请使用 Chrome/Edge
            </p>
          )}
        </div>
      </div>

    </>
  );
}
