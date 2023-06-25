import type { AnyObject } from '@/shared/types';

/*
    eslint-disable
    @typescript-eslint/no-unnecessary-condition,
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-explicit-any
*/

/**
 * Get a set of properties with indication by given selectors from any object.
 *
 * @param {Object} from - object to be searched.
 * @param {Array.<string>} select - rest parameters should be string selectors.
 * @return {Array.<any|undefined>} lists of values.
 *
 * @example
 * const OBJ = {
 *     anyObject: { field: { value: 'some value' } },
 *     list: [1, 2, { value: 'test' }],
 * };
 * getValues(OBJ, 'anyObject.field.value', 'list[0]', 'list[2].value');
 * // => ['some value', 1, 'test']
 *
 */
export const getValues = (from: AnyObject, ...select: string[]): any[] => {
    return [...select].map((selector: string) => {
        return selector
            .replace(/\[([^[\]]*)/g, '.$1.')
            .split('.')
            .filter((t: string) => t !== '')
            .reduce((prev: AnyObject, cur: number | string) => {
                return prev?.[cur];
            }, from);
    });
};

/*
    eslint-enable
    @typescript-eslint/no-unnecessary-condition,
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-explicit-any
*/
