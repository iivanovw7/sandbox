/**
 * Eslint configuration.
 * @module src/.eslintrc.js
 * @see module:internal/eslint-config/test
 */
module.exports = {
    'extends': [
        '@sandbox/eslint-config/test',
        './../.eslintrc-auto-import.json',
    ],
    rules: {
        '@typescript-eslint/no-redeclare': 'off',
        'arrow-body-style': 'off',
        'react/jsx-filename-extension': 'off',
        'import/no-absolute-path': 'off',
        'require-jsdoc': 'off',
    },
    'overrides': [
        {
            'extends': [
                'iivanovw7/typescript',
                'iivanovw7/solid',
            ],
            'files': [
                '**/*.ts',
                '**/*.tsx',
            ],
            'parserOptions': {
                'project': ['../tsconfig.json'],
                tsconfigRootDir: __dirname,
            },
            'rules': {
                '@typescript-eslint/no-magic-numbers': 'off',
                '@typescript-eslint/no-shadow': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',
                'arrow-body-style': 'off',
                'import/extensions': [
                    'error',
                    'ignorePackages', {
                        'js': 'never',
                        'jsx': 'never',
                        'mjs': 'never',
                        'ts': 'never',
                        'tsx': 'never',
                    },
                ],
                'import/no-extraneous-dependencies': 'off',
                'no-use-before-define': ['error', { 'variables': false }],
                'react/jsx-filename-extension': 'off',
            },
        },
    ],
    'parserOptions': {
        'project': ['./../tsconfig.json'],
        tsconfigRootDir: __dirname,
        babelOptions: {
            configFile: '../babelrc.js',
        },
    },
    ignorePatterns: ['.eslintrc.js'],
    root: true,
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
