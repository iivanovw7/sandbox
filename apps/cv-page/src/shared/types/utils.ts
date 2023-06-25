/*  eslint-disable @typescript-eslint/no-explicit-any  */

export type Pixels = number;

export type Bytes = number;

/** Represents type of optional object. */
export type Maybe<T> = T | null | undefined;

/** Represents type of `nullable` object. */
export type Nullable<T> = T | null;

export type ErrorMessage = string;

export type Voidable<T> = T | undefined | void;

/** Represents any function. */
// eslint-disable-next-line no-unused-vars
export type AnyFunction = (...args: unknown[]) => unknown;

/** Represents any object object. */
export interface AnyObject<T = any> {
    [field: string]: T;
}

export type ObjectOrNull<T = unknown> = Nullable<AnyObject<T>>;

export type OptionalObject<T = unknown> = Maybe<ObjectOrNull<T>>;

export type ValueOf<T> = T[keyof T];

/*  eslint-enable @typescript-eslint/no-explicit-any   */

