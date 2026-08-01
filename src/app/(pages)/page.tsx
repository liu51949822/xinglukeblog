import type { Metadata, ResolvingMetadata } from 'next';
import type { FC } from 'react';

import { ResumeHome } from '../_components/home/ResumeHome';
export const generateMetadata = async (
    _metadata: Record<string, any>,
    parent: ResolvingMetadata,
): Promise<Metadata> => ({
    title: `首页 | ${(await parent).title?.absolute}`,
});
const HomePage: FC = async () => <ResumeHome />;

export default HomePage;
