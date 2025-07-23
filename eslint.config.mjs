import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { plugin } from 'postcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'prettier',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ),
  {
    rules: {
      eqeqeq: 'error',
      'dot-notation': 'warn',
      'no-var': 'error',
      'no-duplicate-imports': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_|^args$' },
      ],
      'prefer-const': 'error',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'prefer-arrow-callback': 'warn',
    },
  },
];

export default eslintConfig;
