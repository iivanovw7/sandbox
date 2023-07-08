import type { ErrorMessage } from '@sandbox/types';

export type AnyStore = { actions: object, state: object };

export type PrimitiveType = Date | boolean | null | number | string | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type MessageValues = Record<string, FormatXMLElementFn<string, string> | PrimitiveType>;

export type FormatXMLElementFn<T, R = Array<T | string> | T | string> = (parts: Array<T | string>) => R;

export type FieldValidationResult = {
    messageDescriptor: ErrorMessage;
    values?: MessageValues;
};
