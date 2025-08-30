import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: '**.kakaocdn.net',
      },
      {
        protocol: 'https',
        hostname: 'devseedstorage.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_DEVSEED_BASE_URL}/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
