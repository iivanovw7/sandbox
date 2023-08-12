import { clsx } from 'clsx';
import React from 'react';

import { GradientText } from '../GradientText';

type LinkProps = {
    className?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    text: string;
} & Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'download' | 'href' | 'title'>;

export const Link = (props: LinkProps) => {
    const { className, download, href, target, text } = props;

    return (
        <a
            className={clsx(
                'font-medium hover:underline',
                'dark:text-cyan-600',
                className
            )}
            download={download}
            href={href}
            target={target}
            type="button">
            <GradientText>{text}</GradientText>
        </a>
    );
};
