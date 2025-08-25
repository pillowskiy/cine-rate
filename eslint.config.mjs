import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import unusedImports from 'eslint-plugin-unused-imports';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const configs = [
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('plugin:tailwindcss/recommended'),
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'error',
      'unused-imports/no-unused-imports': 'error',
    },
    settings: {
      tailwindcss: {
        callees: ['cn', 'cva'],
        config: 'tailwind.config.js',
      },
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
    },
  },
];

export default configs;
