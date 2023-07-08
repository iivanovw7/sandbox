/**
 * Module contains breakpoints.
 * @module src/shared/ui/styles/breakpoints.css
 */

/**
 * List of valid breakpoints used as hook parameters.
 * @readonly
 * @type {Array.<string>}
 */
export const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;

/**
 * Contains map of screen size.
 * @readonly
 * @name screenSizes
 * @enum {Record.<string, string>}
 */
export const screenSizes = {
    'height-lg': '736px',
    'height-md': '667px',
    'height-sm': '640px',
    'height-xl': '812px',
    'height-xs': '568px',
    'height-xxl': '896px',
    'width-lg': '961px',
    'width-md': '641px',
    'width-sm': '481px',
    'width-xl': '1025px',
    'width-xs': '320px',
    'width-xxl': '1281px',
} as const;

export type ScreenSize = typeof screenSizes[keyof typeof screenSizes];

/**
 * Contains map of breakpoints.
 * @readonly
 * @name breakpoints
 * @enum {Record.<string, string>}
 */
export const breakpoints = {
    landscape: '(orientation: landscape)',
    'lg-down': `(max-width: ${screenSizes['width-lg']})`,
    'lg-up': `(min-width: ${screenSizes['width-lg']})`,
    'md-down': `(max-width: ${screenSizes['width-md']})`,
    'md-up': `(min-width: ${screenSizes['width-md']})`,
    'sm-down': `(max-width: ${screenSizes['width-sm']})`,
    'sm-up': `(min-width: ${screenSizes['width-sm']})`,
    vertical: '(max-aspect-ratio: 4/3)',
    'xl-down': `(max-width: ${screenSizes['width-xl']})`,
    'xl-up': `(min-width: ${screenSizes['width-xl']})`,
    'xs-down': `(max-width: ${screenSizes['width-xs']})`,
    'xs-up': `(min-width: ${screenSizes['width-xs']})`,
    'xxl-down': `(max-width: ${screenSizes['width-xxl']})`,
    'xxl-up': `(min-width: ${screenSizes['width-xxl']})`,
} as const;

export type BreakpointKey = keyof typeof breakpoints;
export type Breakpoint = typeof breakpoints[BreakpointKey];
