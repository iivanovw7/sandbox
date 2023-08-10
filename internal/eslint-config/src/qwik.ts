/**
 * Project eslint config for `qwik` project.
 * @module internal/eslint-config/qwik
 */

export default {
    'extends': [
        '@sandbox/eslint-config',
        'iivanovw7/typedoc',
    ],
    rules: {
        'import/no-unresolved': 'error',
        'no-param-reassign': 'off',
    },
};
