/* eslint-env node */

module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'react',
    ],
    settings: {
        react: {
          version: '18.2.0'
        }
      },
    rules: {
      // Настройки правил
    },
  };
  
  
