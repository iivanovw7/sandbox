import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import React from 'react';

type LogoProps = {
    icon: ReactNode;
    name: string;
};

export const Logo = (props: LogoProps) => {
    const { icon, name: userName } = props;

    return (
        <div
            className={clsx(
                'flex',
                'items-center',
                'bg-gradient-to-br',
                'from-sky-500',
                'to-cyan-400',
                'bg-clip-text text-xl',
                'font-bold',
                'text-transparent'
            )}>
            {icon}
            {userName}
        </div>
    );
};
