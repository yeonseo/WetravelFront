module.exports = {
    extends: ['plugin:vue/vue3-essential', 'prettier'],
    rules: {
        'vue/no-unused-vars': 'error',
        // yachoi 개발 시 삭제
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: [
                    'List',
                    'Index',
                    'Info',
                    'Detail',
                    'Notify',
                    'Deposit',
                    'Withdrawal',
                    'Splash',
                    'View',
                    'Calender',
                    'Common',
                ],
            },
        ],
    },
};
