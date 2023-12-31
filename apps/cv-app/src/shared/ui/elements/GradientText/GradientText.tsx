import { clsx } from 'clsx';
import React, { type ReactNode } from 'react';

type GradientTextProps = {
    children: ReactNode;
    className?: string;
    text?: string;
};

export const GradientText = (props: GradientTextProps) => {
    const { children, className, text } = props;

    return (
        <span
            className={clsx(
                'bg-gradient-to-br from-sky-500 to-cyan-400',
                'bg-clip-text text-transparent',
                className
            )}>
            {text}
            {children}
        </span>
    );
};
