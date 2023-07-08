/**
 * Module contains mixins.
 * @module src/shared/ui/styles/mixins
 */

import type { StyleRule } from '@vanilla-extract/css';
import { join, pick, values } from 'ramda';

import type { BreakpointKey } from './breakpoint';
import { breakpoints } from './breakpoint';

/**
 * Wraps received style rules in media query.
 * @param {Array.<BreakpointKey>} keys - breakpoints.
 * @param {StyleRule} content - mixin content.
 * @returns {StyleRule} mixin - returns mixin content.
 */
const media = (keys: Array<BreakpointKey>, content: StyleRule): { [Key: string]: StyleRule } => ({
    [join(' and ', ['screen', ...values(pick(keys, breakpoints))])]: content
});

/**
 * Centers both horizontally and vertically or in one direction,
 *      assuming parent element has `position: relative;` property.
 * @param {"X" | "Y"} [axis] - string represents `axis`, if nothing passed - centers in both directions.
 * @returns {StyleRule} mixin - returns mixin content.
 */
const centerAbsolute = (axis?: 'X' | 'Y'): StyleRule => ({
    position: 'absolute',
    ...(() => {
        switch (axis) {
            case 'X': {
                return {
                    left: '50%',
                    transform: 'translateX(-50%)',
                };
            }
            case 'Y': {
                return {
                    top: '50%',
                    transform: 'translateY(-50%)',
                };
            }
            default: {
                return {
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                };
            }
        }
    })(),
});

export const mixins = {
    centerAbsolute,
    media,
};
