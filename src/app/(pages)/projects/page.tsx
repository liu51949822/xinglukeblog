import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '我的项目 | XinglukeBlog',
  description: '项目展示',
};

const ProjectsPage = () => (
  <div className="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center">
    <h1 className="tw-text-2xl tw-font-bold">项目正在建设中...</h1>
  </div>
);
export default ProjectsPage;
