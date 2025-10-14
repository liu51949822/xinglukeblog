'use client';

import { FC, useState } from 'react';

interface Message {
    id: number;
    name: string;
    content: string;
    timestamp: string;
}

export const MessagePage: FC = () => {
    // 模拟用户默认名字（实际项目可改为登录系统）
    const [userName] = useState('游客');
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        // 初始留言（可选）
        {
            id: 1,
            name: '小明',
            content: '第一个留言！',
            timestamp: '2025-04-05',
        },
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now(), // 简单用时间戳做 ID
            name: userName,
            content: inputValue.trim(),
            timestamp: new Date().toLocaleDateString('zh-CN'),
        };

        setMessages([newMessage, ...messages]); // 新留言在最上面
        setInputValue('');
    };

    return (
        <div className="py-8 px-4 max-w-3xl mx-auto font-sans">
            {/* 页面标题 */}
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">留言板</h1>
                <p className="text-gray-600 mt-2">欢迎留下你的想法 💬</p>
            </header>

            {/* 留言表单 */}
            <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="message-input" className="block text-sm font-medium text-gray-700 mb-1">
                            你的名字
                        </label>
                        <input
                            type="text"
                            value={userName}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    <div>
                        <label htmlFor="message-input" className="block text-sm font-medium text-gray-700 mb-1">
                            留言内容
                        </label>
                        <textarea
                            id="message-input"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="说点什么吧..."
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        提交留言
                    </button>
                </form>
            </section>

            {/* 留言列表 */}
            <section>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">所有留言</h2>
                <div className="space-y-4">
                    {messages.length === 0 ? (
                        <p className="text-gray-500 italic text-center py-4 bg-gray-50 rounded-lg">
                            还没有留言，快来第一条吧！
                        </p>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <strong className="text-gray-800">{msg.name}</strong>
                                    <span className="text-xs text-gray-500">{msg.timestamp}</span>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{msg.content}</p>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default function Page() {
    return <MessagePage />;
}