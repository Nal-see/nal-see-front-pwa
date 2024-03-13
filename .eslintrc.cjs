module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'tailwindcss/classnames-order': [
      'warn',
      {
        callees: ['cn'],
      },
    ],
    'tailwindcss/enforces-negative-arbitrary-values': [
      'warn',
      {
        callees: ['cn'],
      },
    ],
    'tailwindcss/enforces-shorthand': [
      'warn',
      {
        callees: ['cn'],
      },
    ],
    'tailwindcss/no-contradicting-classname': [
      'warn',
      {
        callees: ['cn'],
      },
    ],
    'tailwindcss/no-custom-classname': [
      'warn',
      {
        callees: ['cn'],
      },
    ],
  },
};
