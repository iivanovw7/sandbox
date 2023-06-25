import { clsx } from 'clsx';
import type { ReactElement } from 'react';
import React from 'react';

import { GradientText } from './GradientText';

type LinkProps = {
    className?: string;
    download?: boolean;
    href: string;
    text: string;
};

export const Link = (props: LinkProps): ReactElement => {
    const { className, download, href, text } = props;

    return (
        <a
            className={clsx(
                'font-medium hover:underline',
                'dark:text-cyan-600',
                className
            )}
            download={download}
            href={href}
            type="button">
            <GradientText>{text}</GradientText>
        </a>
    );
};
