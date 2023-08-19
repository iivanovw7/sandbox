module.exports = {
    'extends': ['@sandbox/eslint-config/astro'],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: [
        'tailwind.config.js',
        '.eslintrc.js',
        '.turbo',
        '/build/**',
        '/dist/**',
        '/node_modules/**',
        '/public/**',
    ],
    root: true,
    rules: {
        'react/jsx-sort-props': 'off',
        'react/no-array-index-key': 'off',
        'react/display-name': 'off',
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};

