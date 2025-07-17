module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb-base', 'prettier', 'react-app', 'react-app/jest'],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-unused-vars': 'warn',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    'no-await-in-loop': 'off',
    'no-console': 'warn', //
    'no-use-before-define': 'off',
    'no-lonely-if': 'off',
    'no-promise-executor-return': 'off',
    'no-dupe-keys': 'warn',
    'no-unused-vars': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-param-reassign': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-multi-spaces': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-one-expression-per-line': 'off',
  },
  overrides: [
    {
      files: ['**/*.slice.js'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
