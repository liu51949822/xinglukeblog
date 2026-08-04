'use client';

import type { FC, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { CuteBot } from './CuteBot';

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

/** 二次元卡通机器人（纯 CSS 动画版） */

export const FloatingAnimeBot: FC<{ listening?: boolean; speaking?: boolean }> = ({
  listening = false,
  speaking = false,
}) => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [hidden, setHidden] = useState(false);
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
  const hiddenRef = useRef(false);
  showPanelRef.current = showPanel;
  hiddenRef.current = hidden;
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
        // 拖拽中、面板打开或完全隐藏时不移动
        if (!dragRef.current.dragging && !showPanelRef.current && !hiddenRef.current) {
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
        // 完全隐藏时不主动对话
        if (hiddenRef.current) {
          schedule();
          return;
        }
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
    // 完全隐藏后：不添加任何聊天、不弹面板、不触发后续事件
    if (hiddenRef.current) return;
    const id = ++idRef.current;
    setChats((prev) => [...prev.slice(-6), { id, text, from }]);
    setShowPanel(true);
    // 5 秒后收起面板（若期间被隐藏则无操作）
    setTimeout(() => {
      if (!hiddenRef.current) setShowPanel(false);
    }, 5000);
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
      {showPanel && !hidden && (
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

      {/* 机器人本体（可拖拽），隐藏时不渲染 */}
      {!hidden && (
      <div
        style={style}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="tw-select-none tw-cursor-grab tw-touch-none tw-w-16 tw-h-16"
        title="拖拽移动"
      >
        {/* 二次元形象（点击弹面板） */}
        <div
          className={`tw-relative tw-w-16 tw-h-16 tw-rounded-full tw-bg-gradient-to-br tw-from-pink-300 tw-to-purple-400 tw-shadow-xl tw-flex tw-items-center tw-justify-center tw-border-2 tw-border-white ${
            moving && moveAnim ? moveAnim : ''
          }`}
          onClick={() => setShowPanel((v) => !v)}
        >
          <CuteBot size={56} listening={listening} speaking={speaking} />
          {/* 未读提示 */}
          {chats.length > 0 && !showPanel && (
            <span className="tw-absolute tw-top-0 tw-right-0 tw-w-5 tw-h-5 tw-rounded-full tw-bg-red-500 tw-text-white tw-text-[10px] tw-flex tw-items-center tw-justify-center tw-animate-pulse">
              {chats.length}
            </span>
          )}
        </div>
        {/* 关闭按钮 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            // 彻底关闭：隐藏 + 立即关面板 + 清空对话与游走状态
            setHidden(true);
            setShowPanel(false);
            setChats([]);
            setPosition(null);
            setMoving(false);
          }}
          className="tw-absolute tw-top-0 tw-right-0 tw-w-5 tw-h-5 tw-rounded-full tw-bg-gray-500 tw-text-white tw-flex tw-items-center tw-justify-center tw-shadow hover:tw-bg-gray-600"
          title="完全关闭"
        >
          <X className="tw-w-3 tw-h-3" />
        </button>
      </div>
      )}

      {/* 完全关闭后：页面右下角唤回按钮 */}
      {hidden && (
        <button
          onClick={() => {
            setHidden(false);
            setShowPanel(false);
            setChats([]);
          }}
          className="tw-fixed tw-bottom-4 tw-right-4 tw-w-10 tw-h-10 tw-rounded-full tw-bg-pink-400/80 tw-backdrop-blur tw-text-white tw-shadow-lg tw-flex tw-items-center tw-justify-center tw-border tw-border-white/50 hover:tw-bg-pink-500 tw-transition-colors"
          title="唤回机器人"
        >
          <span className="tw-text-lg">🧸</span>
        </button>
      )}
    </>
  );
};
