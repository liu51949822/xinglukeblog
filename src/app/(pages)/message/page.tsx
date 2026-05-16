'use client';

import type { FC, FormEvent } from 'react';
import type { MessageItem } from '@/server/message/type';

import { messageApi } from '@/api/message';
import { useAuth } from '@/app/_components/auth/hooks';
import { Button } from '@/app/_components/shadcn/ui/button';
import { Input } from '@/app/_components/shadcn/ui/input';
import { Textarea } from '@/app/_components/shadcn/ui/textarea';
import { cn } from '@/app/_components/shadcn/utils';
import { formatTime } from '@/libs/time';
import { isNil } from 'lodash';
import { MessageSquare, User } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const MessageForm: FC<{ onNewMessage: (msg: MessageItem) => void }> = ({ onNewMessage }) => {
    const auth = useAuth();
    const [name, setName] = useState(isNil(auth) ? '' : auth.username);
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isNil(auth)) setName(auth.username);
    }, [auth]);

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            if (!content.trim()) return;
            const displayName = name.trim() || '匿名';
            setSubmitting(true);
            setError(null);
            try {
                const res = await messageApi.create({ name: displayName, content: content.trim() });
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || '留言失败');
                }
                const newMsg = await res.json();
                onNewMessage(newMsg);
                setContent('');
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setSubmitting(false);
            }
        },
        [name, content, onNewMessage],
    );

    return (
        <form onSubmit={handleSubmit} className="tw-space-y-4">
            {!isNil(auth) ? (
                <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-muted-foreground">
                    <User className="tw-h-4 tw-w-4" />
                    <span>{auth.username}</span>
                </div>
            ) : (
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="你的名字（选填）"
                    maxLength={50}
                    disabled={submitting}
                />
            )}
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="说点什么吧..."
                rows={4}
                maxLength={1000}
                disabled={submitting}
                required
            />
            <div className="tw-flex tw-items-center tw-gap-3">
                <Button type="submit" disabled={submitting || !content.trim()}>
                    {submitting ? '提交中...' : '提交留言'}
                </Button>
                {error && <span className="tw-text-sm tw-text-red-500">{error}</span>}
            </div>
        </form>
    );
};

const MessageList: FC<{ messages: MessageItem[] }> = ({ messages }) => {
    if (messages.length === 0) {
        return (
            <div className="tw-py-12 tw-text-center tw-text-muted-foreground">
                <MessageSquare className="tw-mx-auto tw-mb-3 tw-h-8 tw-w-8 tw-opacity-30" />
                <p>还没有留言，快来留下第一条吧！</p>
            </div>
        );
    }

    return (
        <div className="tw-space-y-3">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={cn(
                        'tw-rounded-lg tw-border tw-border-border tw-bg-card tw-p-4',
                        'tw-transition-shadow hover:tw-shadow-sm',
                    )}
                >
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                        <span className="tw-font-medium tw-text-sm">{msg.name}</span>
                        <time className="tw-text-xs tw-text-muted-foreground">
                            {formatTime(msg.createdAt)}
                        </time>
                    </div>
                    <p className="tw-text-sm tw-leading-relaxed tw-whitespace-pre-wrap">
                        {msg.content}
                    </p>
                </div>
            ))}
        </div>
    );
};

const MessagePage: FC = () => {
    const [messages, setMessages] = useState<MessageItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await messageApi.list();
                if (!res.ok) throw new Error((await res.json()).message);
                const data = await res.json();
                setMessages(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleNewMessage = useCallback((msg: MessageItem) => {
        setMessages((prev) => [msg, ...prev]);
    }, []);

    return (
        <div className="tw-page-item">
            <div className="tw-page-container tw-space-y-6">
                <header className="tw-text-center">
                    <h1 className="tw-text-2xl tw-font-bold">留言板</h1>
                    <p className="tw-mt-1 tw-text-muted-foreground">欢迎留下你的想法和足迹</p>
                </header>

                <section className="tw-rounded-lg tw-border tw-border-border tw-bg-card tw-p-6">
                    <MessageForm onNewMessage={handleNewMessage} />
                </section>

                <section>
                    <h2 className="tw-mb-4 tw-text-lg tw-font-semibold">所有留言</h2>
                    {loading ? (
                        <div className="tw-py-12 tw-text-center tw-text-muted-foreground">
                            加载中...
                        </div>
                    ) : error ? (
                        <div className="tw-py-12 tw-text-center tw-text-red-500">
                            加载失败: {error}
                        </div>
                    ) : (
                        <MessageList messages={messages} />
                    )}
                </section>
            </div>
        </div>
    );
};

export default MessagePage;
