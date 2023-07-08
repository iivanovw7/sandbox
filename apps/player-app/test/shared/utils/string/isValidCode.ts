/**
 * Module contains isValidCode tests
 */

import { isValidCode } from '../../../../src/shared/utils';

describe('shared/utils/string', () => {
    describe('isValidCode', () => {
        const check = (val: string, assert: boolean) => {
            expect(isValidCode(val)).toEqual(assert);
        };

        it('Should pass validation', () => {
            check('1234', true);
            check('0000', true);
            check('9999', true);
            check('0020', true);
            check('2944', true);
        });

        it('Should NOT pass validation', () => {
            check('123888', false);
            check('123', false);
            check('00.00', false);
            check('F999', false);
            check('null', false);
            check('29', false);
        });
    });
});
