import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.js'], // Removed jsx from file pattern
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module', // Removed ecmaFeatures.jsx
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  eslintConfigPrettier,
  // eslintPluginPrettierRecommended,
];