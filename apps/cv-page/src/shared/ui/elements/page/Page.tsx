import { clsx } from 'clsx';
import React, { type PropsWithChildren } from 'react';

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
