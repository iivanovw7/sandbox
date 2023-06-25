import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import React from 'react';

type SectionProps = {
    children: ReactNode;
    className?: string;
    title?: ReactNode;
};

export const Section = (props: SectionProps) => {
    const {
        children,
        className,
        title
    } = props;

    return (
        <div className={clsx('mx-auto max-w-screen-lg px-3 py-6', className)}>
            {title
                ? (
                    <div className="mb-6 text-2xl font-bold">
                        {title}
                    </div>
                )
                : null}
            {children}
        </div>
    );
};
