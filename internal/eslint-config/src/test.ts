/**
 * Project eslint config for `test`.
 * @module internal/eslint-config/test
 */

export default {
    'extends': [
        '@sandbox/eslint-config',
        'iivanovw7/typedoc',
        'iivanovw7/test-vitest',
    ],
    rules: {
        'import/extensions': [
            'error',
            'ignorePackages', {
                'js': 'never',
                'jsx': 'never',
                'mjs': 'never',
                'ts': 'never',
                'tsx': 'never',
            }
        ],
        'import/no-unresolved': 'error',
        'no-param-reassign': 'off',
        'react/jsx-filename-extension': 'off',
        'solid/jsx-no-undef': [
            'error',
            {
                allowGlobals: true,
                autoImport: true,
                typescriptEnabled: false,
            }
        ],
    },
};
