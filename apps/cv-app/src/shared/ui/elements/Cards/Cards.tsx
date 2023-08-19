import { clsx } from 'clsx';
import React, { type PropsWithChildren } from 'react';

export type CardProps = PropsWithChildren<{
    className?: string;
}>;

export const Cards = (props: CardProps) => (
    <div
        className={clsx(
            'flex grow flex-col  gap-6',
            'mt-8 md:grid md:grid-cols-[repeat(12,_1fr)]',
            props.className
        )}
    >
        {props.children}
    </div>
);
