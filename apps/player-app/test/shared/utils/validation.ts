/**
 * Module contains validation tests
 */

import {
    VALIDATION_ERRORS,
    VALIDATION_SCHEMAS,
    validateField,
    validateForm,
    yup
} from '../../../src/shared/utils';

type TestForm = {
    name?: string;
    pin: string;
};

type TestValidationSchema = Record<keyof TestForm, yup.AnySchema>;

const { STRING, STRING_REQUIRED } = VALIDATION_SCHEMAS;

const TEST_VALIDATION_ERROR = 'Test validation error.';

const testValidationSchema = yup.object<TestValidationSchema>({
    name: STRING,
    pin: STRING_REQUIRED.length(3, TEST_VALIDATION_ERROR),
});

describe('shared/utils', () => {
    describe('validateField', () => {
        const check = (key: keyof TestForm, value: unknown, assert: unknown) => {
            expect(validateField({
                schema: yup.reach(testValidationSchema, key) as yup.AnySchema,
                value,
            })).toEqual(assert);
        };

        it('Should pass validation', () => {
            check('pin', 'xxx', null);
            check('name', 'test', null);
        });

        it('Should NOT pass validation', () => {
            check('pin', 'xxxx', TEST_VALIDATION_ERROR);
            check('pin', '', VALIDATION_ERRORS.EMPTY);
        });
    });

    describe('validateForm', () => {
        const check = (form: unknown, assert: unknown = form) => {
            try {
                expect(validateForm(testValidationSchema, form)).toEqual({
                    validatedData: assert
                });
            }
            catch (err) {
                expect(err.errors.includes(assert)).toBeTruthy();
            }
        };

        it('Should pass validation', () => {
            check({ pin: 'xxx' });
            check({ name: 'test', pin: 'xxx' });
        });

        it('Should NOT pass validation', () => {
            check({ name: 'test', pin: 'xxxx' }, TEST_VALIDATION_ERROR);
            check({ name: 'test' }, VALIDATION_ERRORS.EMPTY);
            check({ name: null }, VALIDATION_ERRORS.EMPTY);
            check({ name: 999 }, VALIDATION_ERRORS.EMPTY);
        });
    });
});
