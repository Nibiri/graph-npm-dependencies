module.exports = {
    root: true,
    env: {
        es6: true
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'prettier/@typescript-eslint',
        'prettier/react',
        'prettier',
    ],
    plugins: [
        '@typescript-eslint',
        'babel',
        'prettier',
        'react'
    ],
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': [
            "warn",
            {
                'allowExpressions': true,
                'allowTypedFunctionExpressions': true,
                'allowHigherOrderFunctions': true,
            }
        ]
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: '2018',
        ecmaFeatures: {
            jsx: true
        }
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};
