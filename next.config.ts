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

    const fileLoaderRule = rules.find(
      rule => rule?.test instanceof RegExp && rule.test.test('.svg'),
    ) as WebpackRule | undefined;

    if (!fileLoaderRule) return config;

    const existingNot =
      typeof fileLoaderRule.resourceQuery === 'object' &&
      fileLoaderRule.resourceQuery !== null &&
      'not' in fileLoaderRule.resourceQuery &&
      Array.isArray(fileLoaderRule.resourceQuery.not)
        ? (fileLoaderRule.resourceQuery.not as (RegExp | string)[])
        : [];

    rules.push({
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/,
    });

    rules.push({
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      resourceQuery: { not: [...existingNot, /url/] },
      use: ['@svgr/webpack'],
    });

    fileLoaderRule.exclude = /\.svg$/i;

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
