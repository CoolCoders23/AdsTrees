module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'node_modules',
    'package-lock.json',
    'build',
    'dist',
    'README.md',
    'workFlow.md',
    '.hintrc'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-undef-init": "error",
    "no-duplicate-case": "error",
    "no-irregular-whitespace": "error",
    "no-multi-spaces": "error",
    "no-empty": "error",
    "no-extra-semi": "error",
    "no-func-assign": "error",
    "no-unreachable": "error",
    "curly": "error",
    "dot-notation": "error",
    "eqeqeq": "error",
    "no-empty-function": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-trailing-spaces": "error",
    "default-case": "error",
    "no-fallthrough": "error",
    "no-unused-vars": "warn",
    "no-use-before-define": "error",
    "no-redeclare": "error",
    "brace-style": "error",
    "indent": [
        "error",
        4
    ],
    "quotes": [
        "error",
        "single"
    ],
    "semi": [
        "error",
        "always"
    ],
    "radix": "off",
  },
}
