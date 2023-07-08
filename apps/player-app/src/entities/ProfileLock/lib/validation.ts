/**
 * Module contains `ProfileLock` validation helpers.
 * @module src/entities/ProfileLock/lib/validation
 */

import { VALIDATION_SCHEMAS, validateForm, yup } from '@/shared';

type UnlockModalData = { pin: string };
type UnlockModalSchema = Record<keyof UnlockModalData, yup.AnySchema>;

const { STRING_REQUIRED } = VALIDATION_SCHEMAS;

export const PIN_VALIDATION_ERROR = 'Your PIN must be 4 numbers.';

const PIN_SCHEMA = STRING_REQUIRED.length(4, PIN_VALIDATION_ERROR);

/**
 * Profile lock validation schema.
 */
export const unlockModalSchema = yup.object<UnlockModalSchema>({
    pin: PIN_SCHEMA,
});

/**
 * Validate modal data.
 * @param {UnlockModalData} data - modal data.
 * @returns {Object.<{validatedData: UnlockModalData}>} validation result.
 */
export const validateUnlockModalData = (data: UnlockModalData): { validatedData: UnlockModalData } => {
    return validateForm(unlockModalSchema, data);
};
