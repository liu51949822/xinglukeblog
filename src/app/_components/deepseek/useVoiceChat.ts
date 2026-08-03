'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 语音对话 Hook（浏览器原生 STT + TTS）
 * 
 * 功能：
 *  - STT：语音识别（Web Speech API），把语音转成文字
 *  - TTS：语音合成（speechSynthesis），把回答文字读出来
 * 
 * 纯浏览器实现，无需服务器资源。Chrome/Edge 支持中文语音。
 */

interface UseVoiceChat {
  /** 是否支持语音 */
  supported: boolean;
  /** 是否正在录音 */
  listening: boolean;
  /** 是否正在朗读 */
  speaking: boolean;
  /** 语音识别中间结果 */
  interimText: string;
  /** 开始录音 */
  startListening: () => void;
  /** 停止录音并返回识别文字 */
  stopListening: () => Promise<string>;
  /** 朗读文本 */
  speak: (text: string, lang?: string) => Promise<void>;
  /** 停止朗读 */
  stopSpeaking: () => void;
}

export function useVoiceChat(): UseVoiceChat {
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef<any>(null);
  const finalResultRef = useRef('');

  // 是否支持
  const supported =
    typeof window !== 'undefined' &&
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) &&
    'speechSynthesis' in window;

  // 初始化语音识别
  useEffect(() => {
    if (!supported) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'zh-CN';

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }
      if (final) {
        finalResultRef.current += final;
        setInterimText(finalResultRef.current + interim);
      } else {
        setInterimText(finalResultRef.current + interim);
      }
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    return () => {
      recognition?.stop?.();
    };
  }, [supported]);

  // 开始录音
  const startListening = useCallback(() => {
    if (!supported || !recognitionRef.current) return;
    finalResultRef.current = '';
    setInterimText('');
    setListening(true);
    try {
      recognitionRef.current.start();
    } catch {
      // 已启动则忽略
    }
  }, [supported]);

  // 停止录音，返回识别文字
  const stopListening = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      if (!supported || !recognitionRef.current) {
        resolve('');
        return;
      }
      const result = finalResultRef.current.trim();
      recognitionRef.current.stop();
      setListening(false);
      setInterimText('');
      resolve(result);
    });
  }, [supported]);

  // 朗读文本
  const speak = useCallback((text: string, lang?: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!supported || !('speechSynthesis' in window)) {
        resolve();
        return;
      }
      // 取消当前朗读
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang || 'zh-CN';
      // 选择中文语音（优先）
      const voices = window.speechSynthesis.getVoices();
      const zhVoice = voices.find((v) => v.lang.startsWith('zh'));
      if (zhVoice) utterance.voice = zhVoice;
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
        resolve();
      };
      utterance.onerror = () => {
        setSpeaking(false);
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }, [supported]);

  // 停止朗读
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  return {
    supported,
    listening,
    speaking,
    interimText,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  };
}
