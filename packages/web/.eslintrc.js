module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['prettier', 'vue', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/prettier',
    '@vue/typescript',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? ['error', { allow: ['warn', 'error'] }] : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2018
  }
}
