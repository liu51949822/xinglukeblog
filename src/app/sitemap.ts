import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.xingluke.cn';

/**
 * 自动生成 sitemap.xml
 * 覆盖所有公开页面，排除隐藏管理路由 resume-admin
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // 静态公开页面
    const staticPages = [
        '',          // 首页
        'myself',    // 关于我
        'deepseek',  // 知识问答
        'message',   // 留言板
        'webnav',    // 导航
        'blog',      // 博客
        'about',     // 关于
        'resume-export', // 简历导出
        'auth/login',    // 登录
    ];

    return [
        ...staticPages.map((p) => ({
            url: `${BASE_URL}/${p}`,
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: p === '' ? 1 : 0.8,
        })),
    ];
}
