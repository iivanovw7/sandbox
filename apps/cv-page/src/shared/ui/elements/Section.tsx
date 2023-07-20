import { clsx } from 'clsx';
import React, { type ReactNode } from 'react';

import { GradientText } from '@/shared';

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
                        <GradientText>{title}</GradientText>
                    </div>
                )
                : null}
            {children}
        </div>
    );
};
