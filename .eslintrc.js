module.exports = {
  root: true,
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['@arthurgeron/eslint-config/native'],
  rules: {
    'comma-dangle': 'off',
  },
};
