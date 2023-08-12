/*  eslint-disable @typescript-eslint/no-explicit-any  */

export type Pixels = number;

export type Bytes = number;

/** Represents type of optional object. */

/** Represents type of `nullable` object. */
export type Nullable<T> = T | null;

export type ErrorMessage = string;

export type Voidable<T> = T | undefined | void;

/** Represents any function. */
// eslint-disable-next-line no-unused-vars


export type ValueOf<T> = T[keyof T];

/*  eslint-enable @typescript-eslint/no-explicit-any   */

