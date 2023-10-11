module.exports = {
  root: true,
  extends: [
    './node_modules/@dwarvesf/react-eslint-config',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals',
    'prettier',
  ],
  plugins: ['prettier'],
  ignorePatterns: ['node_modules/'],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  globals: {
    io: true,
    chrome: true,
  },
  parserOptions: {
    ecmaVersion: 10,
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
    sourceType: 'module',
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        bracketSpacing: true,
        bracketSameLine: false,
        jsxSingleQuote: false,
        printWidth: 80,
        proseWrap: 'always',
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        htmlWhitespaceSensitivity: 'ignore',
      },
    ],
    'react/jsx-curly-brace-presence': 'off',
    'import/extensions': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'vars-on-top': 'off',
    'no-var': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'default-case': 'off',
    'object-shorthand': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    "@typescript-eslint/return-await": "off"
  },
  overrides: [
    {
      files: ['**/*.ts?(x)', '**/*.js?(x)'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-sort-props': 'off',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
      },
    },
  ],
}
