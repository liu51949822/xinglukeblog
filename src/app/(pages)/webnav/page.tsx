import type { Metadata, ResolvingMetadata } from 'next';
import type { FC } from 'react';
import DaohangView from '../../_components/web_nav'; // 
/** ✅ 页面 SEO 信息生成 */
export const generateMetadata = async (
  _metadata: Record<string, any>,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const parentTitle = (await parent).title?.absolute ?? 'DanChao';
  return {
    title: `导航 | ${parentTitle}`,
    description: '精选开发者常用导航与资源合集，快速直达前端、AI、工具与社区站点。',
  };
};

/** ✅ 页面主体 */
const DaohangPage: FC = async () => {
  return <DaohangView />;
};

export default DaohangPage;
