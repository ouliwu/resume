// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    indent: 0,
    'import/extensions': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-shadow': 0,
    'max-len': 0,
    quotes: 'off',
    'no-unused-vars': 'error', // 开启没有用过的变量检测,
  },
}
