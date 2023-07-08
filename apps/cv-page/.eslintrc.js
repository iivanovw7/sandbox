module.exports = {
    'extends': ['@sandbox/eslint-config/astro'],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: [
        '.eslintrc.js',
        'tailwind.config.js',
        '/build/**',
        '/dist/**',
        '/node_modules/**',
        '.turbo',
    ],
    root: true,
    rules: {
        'react/jsx-sort-props': 'off',
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};

