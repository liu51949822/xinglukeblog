'use client';

import { FC, useState, useRef, useEffect } from 'react';

interface Message {
    id: number;
    name: string;
    content: string;
    timestamp: string;
}

export const MessagePage: FC = () => {
    const [userName] = useState('游客');
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            name: '王大锤',
            content: '第一个留言！',
            timestamp: '2025-11-12 00:30',
        },
    ]);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            name: userName,
            content: inputValue.trim(),
            timestamp: new Date().toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }),
        };

        setMessages([newMessage, ...messages]);
        setInputValue('');
    };

    // 自动滚动到最新留言
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="tw-flex tw-justify-center min-h-screen tw-pt-20 tw-bg-transparent">
            <div className="tw-w-full tw-max-w-4xl tw-px-4 tw-py-8">
                {/* 页面标题 */}
                <header className="tw-text-center tw-mb-12">
                    <h1 className="tw-text-5xl tw-font-bold tw-text-gray-800 tw-dark:tw-text-white tw-mb-3">
                        留言板
                    </h1>
                    <p className="tw-text-gray-600 tw-dark:tw-text-gray-400">
                        欢迎留下你的想法 💬
                    </p>
                </header>

                {/* 留言表单 */}
                <section className="tw-bg-white/90 tw-dark:tw-bg-gray-800/90 tw-backdrop-blur-sm tw-p-8 tw-rounded-2xl tw-shadow-xl tw-border tw-border-gray-200 tw-dark:tw-border-gray-700 tw-mb-10">
                    <form onSubmit={handleSubmit} className="tw-space-y-6">
                        <div>
                            <label 
                                htmlFor="message-input" 
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-dark:tw-text-gray-300 tw-mb-3"
                            >
                                你的名字
                            </label>
                            <input
                                type="text"
                                value={userName}
                                readOnly
                                className="tw-w-full tw-px-5 tw-py-4 tw-border tw-border-gray-300 tw-dark:tw-border-gray-600 tw-rounded-xl tw-bg-gray-50 tw-dark:tw-bg-gray-700 tw-text-gray-900 tw-dark:tw-text-white tw-cursor-not-allowed focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 tw-transition-colors"
                            />
                        </div>

                        <div>
                            <label 
                                htmlFor="message-input" 
                                className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-dark:tw-text-gray-300 tw-mb-3"
                            >
                                留言内容
                            </label>
                            <textarea
                                id="message-input"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="说点什么吧..."
                                rows={5}
                                className="tw-w-full tw-px-5 tw-py-4 tw-border tw-border-gray-300 tw-dark:tw-border-gray-600 tw-rounded-xl tw-bg-white tw-dark:tw-bg-gray-700 tw-text-gray-900 tw-dark:tw-text-white focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-outline-none tw-resize-none tw-transition-colors"
                                required
                            />
                        </div>

<button
    type="submit"
    className="tw-w-full tw-px-6 tw-py-4 tw-bg-gradient-to-r tw-from-blue-600 tw-via-indigo-600 tw-to-purple-600 tw-text-white tw-font-bold tw-text-lg tw-rounded-xl hover:tw-from-blue-700 hover:tw-via-indigo-700 hover:tw-to-purple-700 focus:tw-outline-none focus:tw-ring-4 focus:tw-ring-blue-400/50 focus:tw-ring-offset-2 tw-shadow-2xl hover:tw-shadow-2xl tw-transition-all tw-duration-300 tw-transform hover:tw-scale-105 active:tw-scale-95 tw-relative tw-overflow-hidden before:tw-absolute before:tw-inset-0 before:tw-bg-white/20 before:tw-opacity-0 hover:before:tw-opacity-100 before:tw-transition-opacity before:tw-duration-300"
>
    <span className="tw-relative tw-z-10">提交留言</span>
</button>
                    </form>
                </section>

                {/* 留言列表 */}
                <section className="tw-bg-white/90 tw-dark:tw-bg-gray-800/90 tw-backdrop-blur-sm tw-p-8 tw-rounded-2xl tw-shadow-xl tw-border tw-border-gray-200 tw-dark:tw-border-gray-700">
                    <h2 className="tw-text-3xl tw-font-semibold tw-text-gray-800 tw-dark:tw-text-white tw-mb-8 tw-pb-4 tw-border-b tw-border-gray-200 tw-dark:tw-border-gray-700">
                        所有留言 ({messages.length})
                    </h2>
                    
                    <div className="tw-space-y-6 tw-max-h-[500px] tw-overflow-y-auto tw-pr-3 tw-scrollbar-thin tw-scrollbar-thumb-gray-300 tw-scrollbar-track-transparent tw-scrollbar-thumb-rounded-full">
                        {messages.length === 0 ? (
                            <div className="tw-text-center tw-py-16">
                                <div className="tw-text-gray-400 tw-dark:tw-text-gray-500 tw-text-6xl tw-mb-6">📝</div>
                                <p className="tw-text-gray-500 tw-dark:tw-text-gray-400 tw-italic tw-text-lg">
                                    还没有留言，快来第一条吧！
                                </p>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className="tw-bg-gradient-to-r tw-from-gray-50/80 tw-to-white/80 tw-dark:tw-from-gray-700/80 tw-dark:tw-to-gray-800/80 tw-p-6 tw-rounded-2xl tw-shadow-md tw-border tw-border-gray-100 tw-dark:tw-border-gray-600 hover:tw-shadow-lg tw-transition-all tw-duration-300 tw-group tw-backdrop-blur-sm"
                                    >
                                        <div className="tw-flex tw-justify-between tw-items-start tw-mb-4">
                                            <div className="tw-flex tw-items-center tw-space-x-3">
                                                <span className="tw-text-gray-800 tw-dark:tw-text-white tw-font-semibold tw-group-hover:tw-text-blue-600 tw-dark:tw-group-hover:tw-text-blue-400 tw-transition-colors">
                                                    {msg.name}
                                                </span>
                                                <span className="tw-inline-block tw-w-3 tw-h-3 tw-bg-green-500 tw-rounded-full tw-shadow-sm"></span>
                                            </div>
                                            <span className="tw-text-xs tw-text-gray-500 tw-dark:tw-text-gray-400 tw-font-mono tw-whitespace-nowrap">
                                                {msg.timestamp}
                                            </span>
                                        </div>
                                        <p className="tw-text-gray-700 tw-dark:tw-text-gray-300 tw-leading-relaxed tw-pl-5 tw-border-l-4 tw-border-blue-300 tw-dark:tw-border-blue-500 tw-text-lg">
                                            {msg.content}
                                        </p>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MessagePage;