/**
 * Eslint configuration.
 * @module .eslintrc.js
 * @see module:internal/eslint-config
 */

module.exports = {
    'extends': ['@sandbox/eslint-config'],
    ignorePatterns: [
        '.turbo',
        '.eslintrc.js',
        'postcss.config.js',
        'tailwind.config.js',
        '/build/**',
        '/dist/**',
        '/node_modules/**',
        '/public/**',
    ],
    'parserOptions': {
        'project': ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
    root: true,
    rules: {
        '@typescript-eslint/no-redeclare': 'off',
    },
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            extends: ['./.eslintrc-auto-import.json'],
        },
        {
            files: ["**/*.config.ts", "**/*"],
            rules: {
                'import/no-default-export': 'off',
            },
        },
    ],
};
