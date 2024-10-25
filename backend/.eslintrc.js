module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/indent': 'off',
    'no-restricted-imports': ["error", { paths: [{
      name: "@nestjs/common",
      importNames: ["Logger"],
      message: "Please use the Logger from utils instead."
    },{
      name: "class-validator",
      importNames: ["IsEnum"],
      message: "Use our custom IsValidEnum instead."
    }]}],
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
    'arrow-body-style': 'off',
    'function-paren-newline': 'off',
    'no-useless-constructor': 'off',
    'camelcase': 'off',
    'arrow-parens': 'off',
    'max-statements-per-line': ['warn', { 'max': 1 }],
    'max-depth': ['warn', { 'max': 2 }],
    'max-params': ['warn', 5],
    'max-len': ['warn', 120, { 'ignoreUrls': true, 'ignorePattern': '^import\\s.+\\sfrom\\s.+;$' }],
    'no-restricted-syntax': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [ 'warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    }],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "default",
        "format": null,
        "filter": {
          "regex": "^_",
          "match": true,
        }
      }
    ]
  },
};
