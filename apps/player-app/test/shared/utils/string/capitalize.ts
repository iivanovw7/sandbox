/**
 * Module contains capitalize tests
 */

import { capitalize } from '../../../../src/shared/utils';

describe('shared/utils/string', () => {
    describe('capitalize', () => {
        const check = (val: string, assert: string = val) => {
            expect(capitalize(val)).toEqual(assert);
        };

        it('Should return value', () => {
            check('test', 'Test');
            check('capitalizeFirstLetter', 'CapitalizeFirstLetter');
            check('capitalize FirstLetter', 'Capitalize FirstLetter');
            check('123');
            check('_test');
            check('TEST');
        });
    });
});
