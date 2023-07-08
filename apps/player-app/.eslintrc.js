/**
 * Eslint configuration.
 * @module .eslintrc.js
 * @see module:internal/eslint-config
 */

module.exports = {
    'extends': ['@sandbox/eslint-config'],
    ignorePatterns: [
        '.eslintrc.js',
        '/build/**',
        '/dist/**',
        '/node_modules/**',
        '.turbo',
    ],
    'parserOptions': {
        'project': ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
    plugins: ['@babel'],
    root: true,
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            extends: ['./.eslintrc-auto-import.json'],
        },
        {
            files: ["*.config.ts"],
            rules: {
                'import/no-default-export': 'off',
            },
        },
    ],
};
