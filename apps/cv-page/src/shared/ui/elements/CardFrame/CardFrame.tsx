import { clsx } from 'clsx';
import React, { type PropsWithChildren, forwardRef } from 'react';

export type TCardFrameProps = PropsWithChildren<{
    className?: string;
    withBorders?: boolean;
}>;

export const CardFrame = forwardRef<HTMLDivElement, TCardFrameProps>((props, ref) => (
    <div
        ref={ref}
        className={clsx(
            props.withBorders && 'card-frame card-frame-light dark:card-frame-dark',
            'relative',
            props.className
        )}
    >
        {props.children}
    </div>
));
