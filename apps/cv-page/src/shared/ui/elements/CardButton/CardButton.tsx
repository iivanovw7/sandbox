import { clsx } from 'clsx';
import React, { type HTMLAttributes, type PropsWithChildren } from 'react';

export type TCardButtonProps = PropsWithChildren<{
    className?: string
} & HTMLAttributes<HTMLButtonElement>>;

export const CardButton = (props: TCardButtonProps) => (
    <button
        {...props}
        className={clsx(
            'block max-w-sm p-2 shadow-md',
            'border border-gray-400 bg-stone-200 hover:bg-stone-300',
            'dark:border-gray-600 dark:bg-stone-900 dark:hover:bg-stone-800',
            'opacity-80 transition-transform hover:-translate-y-2',
            props.className
        )}
        type="button"
    >
        {props.children}
    </button>
);
