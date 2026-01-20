import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import path from 'path';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'tw-animate-css': path.resolve(__dirname, 'node_modules/tw-animate-css/dist/tw-animate.css'),
    };
    return config;
  },
};

export default withMDX(nextConfig);