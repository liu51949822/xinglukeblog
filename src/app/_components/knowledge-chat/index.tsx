'use client';

import type { FC } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import Background from '../background/background';
import { Send, Bot, User, Sparkles, ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestions = [
  '介绍一下你自己',
  '你有什么技能？',
  '你有什么项目经验？',
  '你的工作经历是怎样的？',
];

const INTRO_TEXT = `你好，我是行路客的 AI 个人助手 🤖

我是一个基于知识库的智能问答系统，你可以问我关于行路客的任何问题，比如：

• 他的技术栈和专业技能
• 过往的工作经历和项目经验
• 教育背景和职业发展历程

所有回答都基于知识库内容，有据可查。请问你想了解什么？`;

const TypewriterText: FC<{ text: string; onComplete: () => void }> = ({ text, onComplete }) => {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
        onComplete();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <span>
      {displayed.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          {i < displayed.split('\n').length - 1 && <br />}
        </span>
      ))}
      <span className="tw-inline-block tw-w-0.5 tw-h-4 tw-bg-blue-400 tw-ml-0.5 tw-animate-pulse" />
    </span>
  );
};

export const KnowledgeChat: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!typingStarted) {
      setTypingStarted(true);
      setMessages([{ id: 'intro', role: 'assistant', content: '' }]);
    }
  }, [typingStarted]);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
    setShowSuggestions(true);
    setMessages([{ id: 'intro', role: 'assistant', content: INTRO_TEXT }]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowSuggestions(false);
    setIsLoading(true);

    try {
      const res = await fetch('/api/knowledge/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: userMessage.content }],
        }),
      });

      if (!res.ok) throw new Error('API request failed');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      };
      setMessages(prev => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('0:"')) {
            const text = line.slice(3, -2);
            fullText += text;
            setMessages(prev => {
              const updated = [...prev];
              const lastMsg = updated[updated.length - 1];
              if (lastMsg && lastMsg.role === 'assistant') {
                updated[updated.length - 1] = { ...lastMsg, content: fullText };
              }
              return updated;
            });
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: '抱歉，我暂时无法回答这个问题。请稍后再试。',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  return (
    <>
      <Background />
      <div className="tw-page-item">
        <div className="tw-page-container tw-max-w-4xl tw-mx-auto">
          <div className="tw-text-center tw-mb-6">
            <h1 className="tw-text-3xl tw-font-bold tw-text-white tw-bg-black/40 tw-inline-block tw-px-6 tw-py-2 tw-rounded-lg tw-backdrop-blur-sm">
              <Sparkles className="tw-inline-block tw-mr-2 tw-mb-1" size={24} />
              AI 个人助手
            </h1>
            <p className="tw-mt-2 tw-text-gray-300 tw-bg-black/40 tw-inline-block tw-px-4 tw-py-1 tw-rounded tw-backdrop-blur-sm">
              基于知识库的智能问答 — 关于我的一切，都可以问
            </p>
          </div>

          <div className="tw-w-full tw-bg-white/10 tw-backdrop-blur-md tw-rounded-xl tw-shadow-lg tw-border tw-border-white/20 tw-overflow-hidden">
            <div className="tw-h-[450px] tw-overflow-y-auto tw-p-4 tw-space-y-4 tw-bg-black/20">
              {messages.length === 0 && !typingStarted && (
                <div className="tw-text-center tw-py-8">
                  <Bot size={48} className="tw-mx-auto tw-mb-3 tw-text-blue-400" />
                  <p className="tw-text-gray-300 tw-text-lg">加载中...</p>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`tw-flex ${m.role === 'user' ? 'tw-justify-end' : 'tw-justify-start'}`}
                >
                  <div className="tw-flex tw-gap-2 tw-max-w-[85%]">
                    {m.role === 'assistant' && (
                      <div className="tw-flex-shrink-0 tw-w-8 tw-h-8 tw-rounded-full tw-bg-blue-500/20 tw-flex tw-items-center tw-justify-center tw-mt-1">
                        <Bot size={16} className="tw-text-blue-400" />
                      </div>
                    )}
                    <div
                      className={`tw-rounded-lg tw-px-4 tw-py-2.5 tw-break-words tw-leading-relaxed ${
                        m.role === 'user'
                          ? 'tw-bg-blue-500 tw-text-white tw-shadow-md'
                          : 'tw-bg-gray-800/60 tw-text-gray-100 tw-border tw-border-gray-700/50'
                      }`}
                    >
                      {m.id === 'intro' && !introDone ? (
                        <TypewriterText text={INTRO_TEXT} onComplete={handleIntroComplete} />
                      ) : (
                        m.content
                      )}
                    </div>
                    {m.role === 'user' && (
                      <div className="tw-flex-shrink-0 tw-w-8 tw-h-8 tw-rounded-full tw-bg-blue-500 tw-flex tw-items-center tw-justify-center tw-mt-1">
                        <User size={16} className="tw-text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="tw-flex tw-justify-start">
                  <div className="tw-flex tw-gap-2">
                    <div className="tw-flex-shrink-0 tw-w-8 tw-h-8 tw-rounded-full tw-bg-blue-500/20 tw-flex tw-items-center tw-justify-center tw-mt-1">
                      <Bot size={16} className="tw-text-blue-400" />
                    </div>
                    <div className="tw-bg-gray-800/60 tw-text-gray-400 tw-rounded-lg tw-px-4 tw-py-2 tw-border tw-border-gray-700/50">
                      <span className="tw-inline-flex tw-gap-1">
                        <span className="tw-w-2 tw-h-2 tw-bg-gray-400 tw-rounded-full tw-animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="tw-w-2 tw-h-2 tw-bg-gray-400 tw-rounded-full tw-animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="tw-w-2 tw-h-2 tw-bg-gray-400 tw-rounded-full tw-animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {showSuggestions && introDone && (
              <div className="tw-px-4 tw-py-3 tw-border-t tw-border-white/10 tw-bg-black/10">
                <p className="tw-text-gray-400 tw-text-xs tw-mb-2 tw-flex tw-items-center tw-gap-1">
                  <ChevronDown size={12} />
                  试试这些问题
                </p>
                <div className="tw-flex tw-flex-wrap tw-gap-2">
                  {suggestions.map((text) => (
                    <button
                      key={text}
                      onClick={() => handleSuggestion(text)}
                      className="tw-text-xs tw-px-3 tw-py-1.5 tw-rounded-full tw-border tw-border-white/20 tw-text-gray-300 hover:tw-bg-white/10 hover:tw-border-blue-400 tw-transition-all"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="tw-flex tw-gap-2 tw-p-4 tw-border-t tw-border-white/10 tw-bg-black/10"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="问问关于我的事情..."
                disabled={isLoading || !introDone}
                className="tw-flex-1 tw-border tw-border-white/20 tw-rounded-lg tw-px-4 tw-py-2.5 tw-bg-gray-900/50 tw-text-white placeholder:tw-text-gray-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-transparent disabled:tw-opacity-50 tw-transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || !introDone}
                className="tw-bg-blue-500 tw-text-white tw-rounded-lg tw-px-4 tw-py-2.5 hover:tw-bg-blue-600 disabled:tw-opacity-50 disabled:tw-cursor-not-allowed tw-transition-colors tw-flex tw-items-center tw-justify-center"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
