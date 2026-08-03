'use client';

import type { FC, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

/**
 * 全页面二次元浮动机器人
 * 
 * 功能：
 *  - 全页面右下角悬浮，可拖拽移动
 *  - 二次元卡通形象（SVG）
 *  - 随机主动对话（带文字气泡）：问候/关心/求抱抱
 *  - 点击互动
 */

interface ChatBubble {
  id: number;
  text: string;
  /** 机器人或用户 */
  from: 'bot' | 'user';
}

const BOT_MESSAGES = [
  '嘿，忙不忙？我在这儿陪着你 👋',
  '要不要问问我关于技能或经历的问题？',
  '记得多喝水，别太累了 😊',
  '抱抱你 🤗 有什么想聊的？',
  '我又更新了知识库，有新问题问我呀！',
  '今天心情怎么样？跟我说说？',
  '你的全栈技能很全面呢，继续保持！',
  '我最近在学新东西，你呢？',
  '累了就休息下，我陪着你 ☕',
  '想找人聊天？我随时都在！',
];

const BOT_REPLIES = [
  '哈哈，被你说的不好意思了 😊',
  '是呀是呀！',
  '真的吗？太好了！',
  '嗯嗯，我懂你！',
  '加油加油，你可以的！',
  '这个想法不错哦！',
  '嘿嘿，被你发现啦 ~',
  '谢谢你这么说！',
  '我也是这么觉得的！',
  '好问题！要不要去知识库问问？',
];

const USER_PRESET = [
  '你好呀',
  '抱抱',
  '你好可爱',
  '在吗？',
  '无聊了',
  '加油',
  '谢谢',
  '今天累吗',
];

/** 二次元卡通机器人 SVG */
const AnimeBot: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* 光环 */}
    <circle cx="50" cy="45" r="38" fill="#fff7e6" />
    {/* 身体 */}
    <rect x="25" y="50" width="50" height="42" rx="18" fill="#6c8cff" />
    {/* 肚子 */}
    <rect x="35" y="58" width="30" height="28" rx="12" fill="#ffd9a0" />
    {/* 头 */}
    <circle cx="50" cy="32" r="22" fill="#ffd9a0" />
    {/* 头发 */}
    <path d="M28 30 Q30 10 50 8 Q70 10 72 30 L68 24 Q66 14 50 12 Q34 14 32 24 Z" fill="#4a4a5a" />
    {/* 呆毛 */}
    <path d="M50 8 Q55 0 60 2 Q56 6 52 8 Z" fill="#ff8fab" />
    {/* 眼睛 */}
    <circle cx="42" cy="30" r="5" fill="#333" />
    <circle cx="58" cy="30" r="5" fill="#333" />
    <circle cx="44" cy="28" r="1.8" fill="#fff" />
    <circle cx="60" cy="28" r="1.8" fill="#fff" />
    {/* 腮红 */}
    <circle cx="37" cy="37" r="3" fill="#ffb3c1" opacity="0.7" />
    <circle cx="63" cy="37" r="3" fill="#ffb3c1" opacity="0.7" />
    {/* 嘴 */}
    <path d="M45 40 Q50 45 55 40" stroke="#e07a5f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

export const FloatingAnimeBot: FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [chats, setChats] = useState<ChatBubble[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const [inputText, setInputText] = useState('');
  const [moving, setMoving] = useState(false);
  const [moveAnim, setMoveAnim] = useState('');
  const dragRef = useRef<{ dragging: boolean; startX: number; startY: number; origX: number; origY: number }>({
    dragging: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });
  const idRef = useRef(0);
  const showPanelRef = useRef(false);
  showPanelRef.current = showPanel;
  // 移动动作序列（每次随机挑一个，短时间不重复）
  const MOVE_ANIMS = ['bot-move-hop', 'bot-move-spin', 'bot-move-wobble', 'bot-move-dash', 'bot-move-jump'];
  const lastAnimRef = useRef('');

  // 自动在全页面随机游走（拖拽/对话时暂停）
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let raf: number;

    const moveToRandom = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // 避开右上角（可能有登录等 UI）和面板区域
      const x = 20 + Math.random() * (w - 120);
      const y = 20 + Math.random() * (h - 160);
      setPosition({ x, y });

      // 随机选一个动作（不重复上一次）
      const candidates = MOVE_ANIMS.filter((a) => a !== lastAnimRef.current);
      const anim = candidates[Math.floor(Math.random() * candidates.length)];
      lastAnimRef.current = anim;
      setMoveAnim(anim);
    };

    // 每 6~12 秒移动一次（更频繁）
    const scheduleMove = () => {
      interval = setTimeout(() => {
        // 拖拽中或面板打开时不移动
        if (!dragRef.current.dragging && !showPanelRef.current) {
          setMoving(true);
          moveToRandom();
          // 移动结束后清状态
          setTimeout(() => setMoving(false), 900);
        }
        scheduleMove();
      }, 6000 + Math.random() * 6000);
    };
    scheduleMove();
    return () => clearTimeout(interval);
  }, []);

  // 随机主动对话（带文字气泡）
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        const msg = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
        addChat('bot', msg);
        // 有概率用户会回应一句
        if (Math.random() > 0.5) {
          const reply = USER_PRESET[Math.floor(Math.random() * USER_PRESET.length)];
          setTimeout(() => {
            addChat('user', reply);
            setTimeout(() => {
              const botReply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
              addChat('bot', botReply);
            }, 1500);
          }, 1200);
        }
        schedule();
      }, 20000 + Math.random() * 15000); // 20~35 秒随机触发
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  const addChat = (from: 'bot' | 'user', text: string) => {
    const id = ++idRef.current;
    setChats((prev) => [...prev.slice(-6), { id, text, from }]);
    setShowPanel(true);
    // 5 秒后收起面板
    setTimeout(() => setShowPanel(false), 5000);
  };

  // 拖拽（pointer 事件，区分点击）
  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current.dragging = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    dragRef.current.origX = position?.x ?? window.innerWidth - 80;
    dragRef.current.origY = position?.y ?? window.innerHeight - 80;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPosition({
      x: dragRef.current.origX + dx,
      y: dragRef.current.origY + dy,
    });
  };
  const onPointerUp = () => {
    dragRef.current.dragging = false;
  };

  const style: React.CSSProperties = position
    ? {
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 9999,
        transition: moving ? 'left 0.9s ease-in-out, top 0.9s ease-in-out' : 'none',
      }
    : { position: 'fixed', right: 24, bottom: 24, zIndex: 9999 };

  // 发送用户消息
  const sendMessage = () => {
    const text = inputText.trim();
    if (!text) return;
    addChat('user', text);
    setInputText('');
    setTimeout(() => {
      const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
      addChat('bot', reply);
    }, 1000);
  };

  return (
    <>
      {/* 对话面板 */}
      {showPanel && (
        <div
          style={{
            position: 'fixed',
            zIndex: 9998,
            ...(position ? { left: position.x - 240, top: position.y - 10 } : { right: 100, bottom: 110 }),
          }}
          className="tw-w-64 tw-bg-white dark:tw-bg-gray-800 tw-rounded-2xl tw-shadow-2xl tw-border tw-border-pink-200 dark:tw-border-gray-600 tw-overflow-hidden"
        >
          {/* 头部 */}
          <div className="tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-2 tw-bg-gradient-to-r tw-from-pink-400 tw-to-purple-400 tw-text-white">
            <span className="tw-text-lg">🧸</span>
            <span className="tw-text-sm tw-font-semibold">小行 · 求职机器人</span>
            <button onClick={() => setShowPanel(false)} className="tw-ml-auto tw-text-white/80 hover:tw-text-white">
              <X className="tw-w-4 tw-h-4" />
            </button>
          </div>
          {/* 对话列表 */}
          <div className="tw-h-40 tw-overflow-y-auto tw-p-3 tw-space-y-2">
            {chats.map((c) => (
              <div key={c.id} className={`tw-flex ${c.from === 'user' ? 'tw-justify-end' : 'tw-justify-start'}`}>
                <div
                  className={`tw-max-w-[85%] tw-rounded-xl tw-px-2.5 tw-py-1.5 tw-text-xs ${
                    c.from === 'bot'
                      ? 'tw-bg-pink-50 dark:tw-bg-gray-700 tw-text-gray-700 dark:tw-text-gray-200'
                      : 'tw-bg-blue-500 tw-text-white'
                  }`}
                >
                  {c.text}
                </div>
              </div>
            ))}
          </div>
          {/* 输入框 */}
          <div className="tw-flex tw-gap-1 tw-p-2 tw-border-t tw-border-gray-200 dark:tw-border-gray-600">
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="说点什么..."
              className="tw-flex-1 tw-text-xs tw-border tw-border-gray-200 dark:tw-border-gray-600 tw-rounded-lg tw-px-2 tw-py-1.5 tw-bg-transparent tw-outline-none"
            />
            <button onClick={sendMessage} className="tw-text-xs tw-bg-pink-500 tw-text-white tw-rounded-lg tw-px-2.5 tw-py-1.5 hover:tw-bg-pink-600">
              发送
            </button>
          </div>
        </div>
      )}

      {/* 机器人本体（可拖拽） */}
      <div
        style={style}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="tw-select-none tw-cursor-grab tw-touch-none"
        title="拖拽移动"
      >
        {collapsed ? (
          <button
            onClick={() => setCollapsed(false)}
            className="tw-w-14 tw-h-14 tw-rounded-full tw-bg-gradient-to-br tw-from-pink-400 tw-to-purple-500 tw-text-white tw-shadow-xl tw-flex tw-items-center tw-justify-center tw-border-2 tw-border-white tw-animate-bounce"
          >
            <span className="tw-text-2xl">🧸</span>
          </button>
        ) : (
          <div className="tw-relative">
            {/* 阴影光晕 */}
            <div className="tw-absolute tw-inset-0 tw-rounded-full tw-bg-pink-400/30 tw-blur-lg tw-scale-110 tw-animate-pulse" />
            {/* 二次元形象 */}
            <div
              className={`tw-relative tw-w-16 tw-h-16 tw-rounded-full tw-bg-gradient-to-br tw-from-pink-300 tw-to-purple-400 tw-shadow-xl tw-flex tw-items-center tw-justify-center tw-border-2 tw-border-white ${
                moving && moveAnim ? moveAnim : ''
              }`}
              onClick={() => setShowPanel((v) => !v)}
            >
              <AnimeBot className="tw-w-12 tw-h-12" />
              {/* 未读提示 */}
              {chats.length > 0 && !showPanel && (
                <span className="tw-absolute tw-top-0 tw-right-0 tw-w-5 tw-h-5 tw-rounded-full tw-bg-red-500 tw-text-white tw-text-[10px] tw-flex tw-items-center tw-justify-center tw-animate-pulse">
                  {chats.length}
                </span>
              )}
            </div>
            {/* 收起按钮 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCollapsed(true);
              }}
              className="tw-absolute -tw-top-1 -tw-left-1 tw-w-5 tw-h-5 tw-rounded-full tw-bg-gray-500 tw-text-white tw-flex tw-items-center tw-justify-center tw-shadow"
              title="收起"
            >
              <X className="tw-w-3 tw-h-3" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
