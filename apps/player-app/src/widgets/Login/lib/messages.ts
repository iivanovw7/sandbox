/**
 * Module contains  localization messages.
 * @module src/features/Login/lib/messages
 */

import { defineMessages } from '@cookbook/solid-intl';

export const messages = defineMessages({
    footerCall: {
        defaultMessage: 'Questions? Call 800 855 855',
        id: 'features.login.footer.call',
    },
    footerShowMore: {
        defaultMessage: 'Learn more.',
        id: 'features.login.footer.show.more',
    },
    formPasswordPlaceholder: {
        defaultMessage: 'Password',
        id: 'features.login.form.password.placeholder',
    },
    formSignIn: {
        defaultMessage: 'Sign In',
        id: 'features.login.form.password.sign.in',
    },
    formSignUp: {
        defaultMessage: 'New to Netflix?',
        id: 'features.login.form.password.sign.up',
    },
    formSignUpButton: {
        defaultMessage: 'Sign up now.',
        id: 'features.login.form.password.sign.up.button',
    },
    formTermsOfUse: {
        defaultMessage: 'This page is protected by Google reCAPTCHA to ensure you`re not a bot.',
        id: 'features.login.form.terms.of.use',
    },
    formTermsOsUseMore: {
        // eslint-disable-next-line max-len
        defaultMessage: 'The information collected by Google reCAPTCHA is subject to the Google Privacy Policy and Terms of Service, and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalized advertising by Google).',
        id: 'features.login.form.terms.of.use.more',
    },
    formUsernamePlaceholder: {
        defaultMessage: 'Email',
        id: 'features.login.form.username.placeholder',
    },
    formWarningPassword: {
        defaultMessage: 'Incorrect password. Please try again or you can reset your password.',
        id: 'features.login.form.warning.password',
    },
    formWarningUsername: {
        // eslint-disable-next-line max-len
        defaultMessage: 'Sorry, we can\'t find an account with this email address. Please try again or create a new account.',
        id: 'features.login.form.warning.username',
    },
});
