/**
 * 求职知识库 - 统一入口
 * 
 * 提供：
 *  - 全部知识块列表
 *  - 关键词检索函数（简单 BM25 风格打分）
 * 
 * 供 RAG 智能问答服务端使用。
 */

import type { KnowledgeChunk } from './profile';
import { profileKnowledge } from './profile';
import { experienceKnowledge } from './experience';

/** 全部知识块 */
export const allKnowledge: KnowledgeChunk[] = [
  ...profileKnowledge,
  ...experienceKnowledge,
];

/** 英文单词分词 */
function tokenizeEn(text: string): string[] {
  const lower = text.toLowerCase();
  return lower.match(/[a-z][a-z0-9.]{1,}/g) || [];
}

/**
 * 中文 n-gram 分词（2~4 字窗口）
 * 解决中文整句无法精确匹配的问题
 */
function tokenizeCn(text: string): string[] {
  const cns = text.match(/[\u4e00-\u9fff]+/g) || [];
  const grams = new Set<string>();
  for (const cn of cns) {
    for (let n = 2; n <= Math.min(4, cn.length); n++) {
      for (let i = 0; i + n <= cn.length; i++) {
        grams.add(cn.slice(i, i + n));
      }
    }
  }
  return [...grams];
}

/**
 * 关键词检索知识库
 * 打分策略：
 *  - 中文 n-gram 与标签/内容做子串匹配
 *  - 英文单词精确匹配
 * @param query 用户问题
 * @param topK 返回条数
 */
export function searchKnowledge(query: string, topK = 4): KnowledgeChunk[] {
  const enTokens = tokenizeEn(query);
  const cnTokens = tokenizeCn(query);

  const scored = allKnowledge.map((chunk) => {
    const tagText = chunk.tags.join(' ').toLowerCase();
    const contentText = chunk.content;

    let score = 0;
    // 英文匹配
    for (const q of enTokens) {
      if (tagText.includes(q)) score += 3;
      if (contentText.toLowerCase().includes(q)) score += 1.5;
    }
    // 中文 n-gram 匹配
    for (const g of cnTokens) {
      if (tagText.includes(g)) score += 2;
      if (contentText.includes(g)) score += 1;
    }
    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.chunk);
}

/**
 * 判断问题是否与知识库相关（有检索结果）
 */
export function isKnowledgeQuery(query: string): boolean {
  return searchKnowledge(query, 1).length > 0;
}
