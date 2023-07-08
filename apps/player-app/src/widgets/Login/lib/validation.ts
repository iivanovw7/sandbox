/**
 * Module contains `Login` validation helpers.
 * @module src/features/Login/lib/validation
 */
import type { CurriedValidate } from '@/shared';
import { VALIDATION_SCHEMAS, validateField, validateForm, yup } from '@/shared';

import type { LoginForm } from '../model';

type FormSchema = Record<keyof LoginForm, yup.AnySchema>;

export const formSchema = yup.object<FormSchema>({
    // eslint-disable-next-line new-cap
    password: VALIDATION_SCHEMAS.STRING_LENGTH_BETWEEN(4, 60),
    username: VALIDATION_SCHEMAS.EMAIL_REQUIRED,
});

/**
 * Validate the login form.
 * @param {LoginForm} data - form data.
 * @returns {{validatedData: LoginForm}} validated form data.
 */
export const validateFormData = (data: LoginForm) => {
    return validateForm(formSchema, data);
};

/**
 * Validate the login form field.
 * @param {'password' | 'username'} field - form field.
 * @returns {Validate<'password' | 'username'>} validation function.
 */
export const validateFormField: CurriedValidate<keyof FormSchema> = (field) => (value) => {
    return validateField({
        schema: yup.reach(formSchema, field) as yup.AnySchema,
        value,
    });
};
