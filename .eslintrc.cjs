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
        callees: ['cn', 'cva'],
      },
    ],
    'tailwindcss/enforces-negative-arbitrary-values': [
      'warn',
      {
        callees: ['cn', 'cva'],
      },
    ],
    'tailwindcss/enforces-shorthand': [
      'warn',
      {
        callees: ['cn', 'cva'],
      },
    ],
    'tailwindcss/no-contradicting-classname': [
      'warn',
      {
        callees: ['cn', 'cva'],
      },
    ],
    'tailwindcss/no-custom-classname': 'off',
  },
};
