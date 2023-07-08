/**
 * Module contains validation helpers.
 * @module shared/utils/validation
 */
import type { AnyObject, Nullable } from '@sandbox/types';
import { inRange, isString } from 'ramda-adjunct';
import type { ValidateOptions, ValidationError } from 'yup';
import * as yup from 'yup';

import type { FieldValidationResult } from '#/common';

import { messages as commonMessages } from '../translations/common';

export { yup };

export type Validate<T> = (value?: T, options?: ValidateOptions<never>) => Nullable<FieldValidationResult>;

export type CurriedValidate<T> = (parameter: T, options?: ValidateOptions<never>) => Validate<T>;

export type ValidateFieldParams<Value = unknown, Context = AnyObject> = {
    options?: ValidateOptions<Context>;
    schema: yup.AnySchema,
    value: Value;
    values?: AnyObject;
};

/**
 * Validates single field with schema passed in parameters.
 *      Also accepts error handlers and loader in parameters.
 * @func validateField
 * @category Validation
 * @param {ValidateFieldParams} params - validation params.
 * @see {@link https://github.com/jquense/yup}
 * @returns {string | null} validation error string or null.
 */
export const validateField = (params: ValidateFieldParams) => {
    const { options, schema, value } = params;

    try {
        schema.validateSync(value, options as ValidateOptions);
    }
    catch (error: unknown) {
        const { message } = error as { message: FieldValidationResult };

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return message;
    }

    return null;
};

/**
 * Validates form data, throws validation error is case validation was not passed successfully.
 * @func validateForm
 * @template FormData
 * @category Validation
 * @param {yup.AnySchema} schema - validation schema.
 * @see {@link https://github.com/jquense/yup}
 * @param {FormData} formData - object represents data to validate.
 * @param {ValidateOptions} options - validation options.
 * @returns {string | null} validated data.
 */
export const validateForm = <FormData>(
    schema: yup.AnySchema,
    formData: FormData,
    options?: ValidateOptions<unknown>): {
    validatedData: FormData
} => ({
    validatedData: schema.validateSync(formData, options as ValidateOptions) as FormData,
});

/**
 * Verifies if error object represents validation error.
 * @func isValidationError
 * @param {unknown} error - error object.
 * @category Validation
 * @returns {boolean} if error is validation error.
 */
export const isValidationError = (error: unknown): error is ValidationError => {
    return error instanceof yup.ValidationError;
};

export const VALIDATION_ERRORS = {
    EMAIL: {
        messageDescriptor: commonMessages.validationEmail
    },
    EMPTY: {
        messageDescriptor: commonMessages.validationEmpty
    },
    STRING: {
        messageDescriptor: commonMessages.validationString
    },
} as const;

export const VALIDATION_SCHEMAS = {
    /**
     * Required email string.
     * @type {yup.StringSchema}
     */
    EMAIL_REQUIRED: yup
        .string()
        .trim()
        .required(VALIDATION_ERRORS.EMPTY)
        .email(VALIDATION_ERRORS.EMAIL),
    /**
     * Option string.
     * @type {yup.StringSchema}
     */
    STRING: yup
        .string()
        .trim(),
    /**
     * Creates string length validation schema with `min` and `max` length.
     * @function
     * @returns {yup.StringSchema} validation schema.
     */
    STRING_LENGTH_BETWEEN: (min: number, max: number) => {
        return yup
            .string()
            .trim()
            .test(
                'STRING_LENGTH_BETWEEN',
                {
                    messageDescriptor: commonMessages.validationBetweenLength,
                    values: {
                        max,
                        min,
                    }
                },
                (value?: string) => {
                    return isString(value) && inRange(min, max, value.length);
                }
            );
    },
    /**
     * Required string.
     * @type {yup.StringSchema}
     */
    STRING_REQUIRED: yup
        .string()
        .trim()
        .required(VALIDATION_ERRORS.EMPTY),
} as const;

