import { clsx } from 'clsx';
import type { PropsWithChildren } from 'react';
import React from 'react';

import './Page.css';

export type PageProps = PropsWithChildren<{
    className?: string;
}>;

export const Page = (props: PageProps) => {
    const { children, className } = props;

    return (
        <div className={clsx('cv-page', className)}>
            {children}
        </div>
    );
};
