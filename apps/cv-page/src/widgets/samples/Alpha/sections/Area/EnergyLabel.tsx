import { clsx } from 'clsx';
import React from 'react';

export type EnergyLabelProps = {
    className?: string;
    desc: string;
};

export const EnergyLabel = (props: EnergyLabelProps) => {
    const { className, desc } = props;

    switch (desc) {
        case 'AP': {
            return (
                <span
                    className={clsx(
                        'rounded bg-blue-200 px-2.5 py-0.5',
                        'text-xs font-semibold text-blue-800',
                        className
                    )}
                >
                    Активная
                </span>
            );
        }
        case 'RP': {
            return (
                <span
                    className={clsx(
                        'rounded bg-red-200 px-2.5 py-0.5',
                        'text-xs font-semibold text-red-900',
                        className
                    )}
                >
                    Реактивная
                </span>
            );
        }
        default: {
            return null;
        }
    }
};
