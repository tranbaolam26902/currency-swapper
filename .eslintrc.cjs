module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'eslint-config-prettier',
        'prettier'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'prettier'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'prettier/prettier': [
            'warn',
            {
                arrowParents: 'always',
                bracketSpacing: true,
                jsxSingleQuote: true,
                singleQuote: true,
                printWidth: 120,
                semi: true,
                tabWidth: 4,
                trailingComma: 'none',
                endOfLine: 'auto'
            }
        ]
    }
};
