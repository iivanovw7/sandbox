/**
 * Project eslint config for `astro`.
 * @module packages/eslint-config/astro
 */

export default {
    'extends': [
        '@sandbox/eslint-config',
    ],
    globals: { defineOptions: 'readonly' },
    overrides: [
        {
            'extends': [
                'iivanovw7/typescript'
            ],
            'files': ['**/*.ts'],
        },
        {
            'extends': [
                'iivanovw7/react',
                'iivanovw7/typescript',
                'iivanovw7/typedoc',
                'iivanovw7/tailwind',
            ],
            'files': [
                '**/*.tsx'
            ],
        },
        {
            'extends': [
                'iivanovw7/react',
                'iivanovw7/typescript',
                'iivanovw7/astro',
                'iivanovw7/tailwind',
            ],
            'files': [
                '*.astro'
            ],
        },
    ],
    settings: {
        react: {
            version: 'detect'
        }
    }
};
