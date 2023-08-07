/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
    env: {
        'vue/setup-compiler-macros': true,
        browser: true,
        node: true
    },
    parserOptions: {
        ecmaFeatures: '2022',
        sourceType: 'module'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
                tabWidth: 4,
                trailingComma: 'none',
                printWidth: 180,
                bracketSpacing: true,
                arrowParens: 'avoid'
            }
        ],
        'vue/multi-word-component-names': 0
    }
};
