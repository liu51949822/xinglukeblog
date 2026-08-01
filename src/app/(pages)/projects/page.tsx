import { redirect } from 'next/navigation';

/**
 * /projects 已关闭
 * 项目信息已完整展示在首页「项目经历」区块，含链接。
 * 直接重定向到首页，避免空页面。
 */
export default function ProjectsPage() {
    redirect('/');
}
