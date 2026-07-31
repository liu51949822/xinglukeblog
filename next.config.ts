import type { NextConfig } from 'next';

const externals: string[] = ['next-mdx-remote-client'];
if (process.env.TURBOPACK) {
    externals.push('rehype-prism-plus');
}

const nextConfig: NextConfig = {
    reactStrictMode: false, // 开启react严格模式
    serverExternalPackages: externals,
    transpilePackages: ['@uiw/react-md-editor'],
    output: 'standalone',
    eslint: {
    ignoreDuringBuilds: true, // 构建时忽略 ESLint 错误
  },
    typescript: {
    ignoreBuildErrors: true, // 如果还有 TypeScript 错误，也可忽略
  },
};

export default nextConfig;
