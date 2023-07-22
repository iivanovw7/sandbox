/**
 * Eslint configuration.
 * @module src/.eslintrc.js
 * @see module:internal/eslint-config/solid
 */
module.exports = {
    'extends': [
        '@sandbox/eslint-config/solid',
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
        babelOptions: {
            configFile: '../babelrc.js',
        },
    },
    ignorePatterns: ['.eslintrc.js'],
    root: true,
    overrides: [
        {
            files: ["main.tsx"],
            rules: {
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
