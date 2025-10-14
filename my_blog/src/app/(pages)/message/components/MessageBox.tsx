"use client"

import { useState } from 'react';
import styles from './MessageBox.module.css';

export default function MessageBox() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="写下您的留言..."
        />
        <button type="submit" className={styles.button}>提交</button>
      </form>
      
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.messageItem}>{msg}</div>
        ))}
      </div>
    </div>
  );
}