import { clsx } from 'clsx';
import React, { type PropsWithChildren } from 'react';

export type PageProps = PropsWithChildren<{
    className?: string;
}>;

export const Page = (props: PageProps) => {
    const { children, className } = props;

    return (
        <div
            className={clsx(
                'mx-auto flex max-w-screen-lg grow flex-col px-6',
                className
            )}>
            {children}
        </div>
    );
};
