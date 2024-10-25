module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb',
    'next/core-web-vitals',
    'next',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 0,
    'react/function-component-definition': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'jsx-quotes': ['error', 'prefer-single'],
    '@typescript-eslint/no-explicit-any': 0,
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-props-no-spreading': 0,
    'import/extensions': 0,
    'react/prop-types': 0,
    'object-curly-newline': 0,
    'comma-dangle': 0,
    'operator-linebreak': 'off',
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'no-empty-function': 'off',

    /**
     * Enforce a convention in module import order
     * @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
     */
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [['external', 'builtin'], ['internal'], ['parent', 'sibling', 'index']],
      },
    ],

    /**
     * Disallow unused variables and arguments
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars-experimental.md
     */
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    /**
     * Disallow use before define
     * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
     */
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
  overrides: [
    {
      files: ['setupTests.js', '*.test.ts', '*.test.tsx'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
    {
      files: ['*.spec.js'],
      globals: {
        Cypress: true,
        context: true,
        cy: true,
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
