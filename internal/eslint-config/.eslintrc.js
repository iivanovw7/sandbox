/**
 * Eslint configuration.
 * @module packages/eslint-config/.eslintrc.js
 * @see module:packages/eslint-config
 */

module.exports = {
    'extends': ['@sandbox/eslint-config'],
    ignorePatterns: [
        '.eslintrc.js',
        '/dist/**',
        '/node_modules/**',
        '.turbo',
    ],
    'parserOptions': {
        'project': ['tsconfig.json'],
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
    root: true,
    overrides: [
        {
            "files": ["src/*.ts", "*.config.ts"],
            rules: {
                '@typescript-eslint/indent': 'off',
                'react/jsx-filename-extension': 'off',
                'import/no-default-export': 'off',
            },
        },
    ],
};
