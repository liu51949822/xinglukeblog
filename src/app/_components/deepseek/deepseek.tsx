'use client';

import type { FC, FormEvent } from 'react';

import { chatApi } from '@/api/chat';
import { Button } from '@/app/_components/shadcn/ui/button';
import { Textarea } from '@/app/_components/shadcn/ui/textarea';
import { cn } from '@/app/_components/shadcn/utils';
import { Bot, Send, User } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export const DeepseekChat: FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            if (!input.trim() || loading) return;

            const userMessage: ChatMessage = { role: 'user', content: input.trim() };
            setMessages((prev) => [...prev, userMessage]);
            setInput('');
            setLoading(true);
            setError(null);

            try {
                const res = await chatApi.sendMessage([
                    ...messages.map((m) => ({ role: m.role, content: m.content })),
                    { role: 'user', content: userMessage.content },
                ]);

                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || '请求失败');
                }

                const text = await res.text();
                setMessages((prev) => [
                    ...prev,
                    { role: 'assistant', content: text },
                ]);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
                setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        },
        [input, messages, loading],
    );

    return (
        <div className="tw-flex tw-flex-col tw-h-full">
            <div className="tw-flex-1 tw-space-y-4 tw-overflow-y-auto tw-p-1">
                {messages.length === 0 && !loading && (
                    <div className="tw-py-16 tw-text-center tw-text-muted-foreground">
                        <Bot className="tw-mx-auto tw-mb-3 tw-h-12 tw-w-12 tw-opacity-30" />
                        <p className="tw-text-lg tw-font-medium">你好，我是 DeepSeek AI 助手</p>
                        <p className="tw-mt-1 tw-text-sm">有什么我可以帮助你的吗？</p>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={cn(
                            'tw-flex tw-gap-3',
                            msg.role === 'user' ? 'tw-justify-end' : 'tw-justify-start',
                        )}
                    >
                        {msg.role === 'assistant' && (
                            <div className="tw-flex tw-h-8 tw-w-8 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-full tw-bg-primary/10">
                                <Bot className="tw-h-4 tw-w-4" />
                            </div>
                        )}
                        <div
                            className={cn(
                                'tw-max-w-[80%] tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm',
                                msg.role === 'user'
                                    ? 'tw-bg-primary tw-text-primary-foreground'
                                    : 'tw-bg-muted',
                            )}
                        >
                            <p className="tw-whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        {msg.role === 'user' && (
                            <div className="tw-flex tw-h-8 tw-w-8 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-full tw-bg-muted">
                                <User className="tw-h-4 tw-w-4" />
                            </div>
                        )}
                    </div>
                ))}

                {loading && (
                    <div className="tw-flex tw-gap-3 tw-justify-start">
                        <div className="tw-flex tw-h-8 tw-w-8 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-full tw-bg-primary/10">
                            <Bot className="tw-h-4 tw-w-4" />
                        </div>
                        <div className="tw-rounded-lg tw-bg-muted tw-px-4 tw-py-2">
                            <span className="tw-flex tw-gap-1">
                                <span className="tw-h-1.5 tw-w-1.5 tw-animate-bounce tw-rounded-full tw-bg-foreground/60" />
                                <span className="tw-h-1.5 tw-w-1.5 tw-animate-bounce tw-rounded-full tw-bg-foreground/60 tw-delay-75" />
                                <span className="tw-h-1.5 tw-w-1.5 tw-animate-bounce tw-rounded-full tw-bg-foreground/60 tw-delay-150" />
                            </span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="tw-rounded-lg tw-border tw-border-red-200 tw-bg-red-50 tw-p-3 tw-text-sm tw-text-red-600">
                        {error}
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSubmit} className="tw-mt-4 tw-flex tw-gap-2">
                <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="输入你的问题..."
                    rows={2}
                    disabled={loading}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                    className="tw-flex-1 tw-resize-none"
                />
                <Button type="submit" disabled={loading || !input.trim()} size="icon">
                    <Send className="tw-h-4 tw-w-4" />
                </Button>
            </form>
        </div>
    );
};
