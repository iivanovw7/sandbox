/**
 * Eslint configuration.
 * @module src/.eslintrc.js
 * @see module:internal/eslint-config/solid
 */
module.exports = {
    'extends': [
        '@sandbox/eslint-config/qwik',
        './../.eslintrc-auto-import.json',
    ],
    rules: {
        '@typescript-eslint/no-redeclare': 'off',
        'arrow-body-style': 'off',
        'import/no-absolute-path': 'off',
    },
    'parserOptions': {
        'project': ['../tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ['.eslintrc.js'],
    root: true,
    overrides: [
        {
            files: ["entry.*", "root.tsx", "./routes/**/*.tsx"],
            rules: {
                'import/no-default-export': 'off',
                'import/no-unresolved': 'off',
            },
        },
    ],
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
