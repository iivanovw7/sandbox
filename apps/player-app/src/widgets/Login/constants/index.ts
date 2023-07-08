/**
 * Module contains `Login` constants.
 * @module src/features/Login/constants
 */

type FooterLink = {
    href: string;
    label: string;
};

/**
 * Footer links.
 * @type {number}
 */
export const FOOTER_LINKS: Array<FooterLink> = [
    {
        href: '/',
        label: 'FAQ',
    },
    {
        href: '/',
        label: 'Help Center',
    },
    {
        href: '/',
        label: 'Terms of Use',
    },
    {
        href: '/',
        label: 'Privacy',
    },
    {
        href: '/',
        label: 'Cookie Preferences',
    },
    {
        href: '/',
        label: 'Corporate Information',
    }
];
