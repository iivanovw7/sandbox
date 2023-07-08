/**
 * Module contains common localization messages.
 * @module src/shared/translations/common
 */

import { defineMessages } from '@cookbook/solid-intl';

export const messages = defineMessages({
    validationBetweenLength: {
        // eslint-disable-next-line max-len
        defaultMessage: 'Must contain between { min } and { max, plural, one {# symbol} other {# symbols}}',
        id: 'common.validation.between.length',
    },
    validationEmail: {
        defaultMessage: 'Please enter a valid email.',
        id: 'common.validation.email',
    },
    validationEmpty: {
        defaultMessage: 'Field is required',
        id: 'common.validation.empty',
    },
    validationMaxLength: {
        defaultMessage: 'Maximum { length, plural, one {# symbol} other {# symbols} }',
        id: 'common.validation.max.length',
    },
    validationMinLength: {
        defaultMessage: 'Minimum { length, plural, one {# symbol} other {# symbols} }',
        id: 'common.validation.min.length',
    },
    validationString: {
        defaultMessage: 'Field has to be a string',
        id: 'common.validation.string',
    },
});
