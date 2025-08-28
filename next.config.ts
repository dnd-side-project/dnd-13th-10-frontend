// next.config.ts
import type { NextConfig } from 'next';

type WebpackRule = {
  test?: RegExp;
  issuer?: unknown;
  resourceQuery?: { not?: (RegExp | string)[] } | RegExp | string;
  exclude?: RegExp | RegExp[];
  use?: unknown;
  [k: string]: unknown;
};

type WebpackConfig = {
  module?: { rules?: WebpackRule[] };
  [k: string]: unknown;
};

const nextConfig: NextConfig = {
  webpack(config: WebpackConfig) {
    const rules = (config.module?.rules ?? []) as WebpackRule[];

    // 기존 svg를 처리하던 파일 로더 규칙 찾기
    const fileLoaderRule = rules.find(
      rule => rule?.test instanceof RegExp && rule.test.test('.svg'),
    ) as WebpackRule | undefined;

    if (!fileLoaderRule) return config;

    // 기존 resourceQuery.not 보존
    const existingNot =
      typeof fileLoaderRule.resourceQuery === 'object' &&
      fileLoaderRule.resourceQuery !== null &&
      'not' in fileLoaderRule.resourceQuery &&
      Array.isArray(fileLoaderRule.resourceQuery.not)
        ? (fileLoaderRule.resourceQuery.not as (RegExp | string)[])
        : [];

    // 1) ?url 이 붙은 svg는 기존 파일 로더로 처리
    rules.push({
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/,
    });

    // 2) 나머지 svg는 SVGR로 처리
    rules.push({
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      resourceQuery: { not: [...existingNot, /url/] },
      use: ['@svgr/webpack'],
    });

    // 3) 원래 파일 로더에서 svg 제외
    fileLoaderRule.exclude = /\.svg$/i;

    // 변경된 rules 반영
    if (!config.module) config.module = {};
    config.module.rules = rules;

    return config;
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'k.kakaocdn.net', pathname: '/**' },
    ],
  },
};

export default nextConfig;
