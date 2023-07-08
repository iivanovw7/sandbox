/**
 * Module contains math tests
 */

import { round } from '../../../../src/shared/utils';

let undef;

describe('shared/math/round', () => {
    describe('toArray', () => {
        const check = (value: unknown, assert = value) => {
            expect(round(value as number)).toEqual(assert);
        };

        it('Should return value', () => {
            check(undef, NaN);
            check(null, 0);
            check(0.9, 1);
            check(5.95, 6);
            check(5.5, 6);
            check(5.05, 5);
            check(-5.05, -5);
            check(-5.5, -5);
            check(-5.95, -6);
            check(-5.999999, -6);
            check(-5.00000001, -5);
        });
    });
});
