import { clsx } from 'clsx';
import React, { type PropsWithChildren, type ReactNode } from 'react';

type ParagraphProps = PropsWithChildren<{
    content?: ReactNode;
    description: string;
    image?: string;
    name: string;
}>;

export const Paragraph = (props: ParagraphProps) => {
    const { children, content, description, image, name: title } = props;

    return (
        <div
            className={clsx(
                'flex flex-col gap-x-8 rounded-md',
                'bg-slate-800 p-3 sm:items-center md:flex-row'
            )}>
            <div>
                <div className="flex flex-row items-center gap-y-2 ">
                    <h4 className="mr-4 text-2xl font-semibold">{title}</h4>
                    {!! image && (
                        <img
                            alt="Avatar"
                            className="h-10 justify-center rounded-md bg-slate-900 p-2 md:justify-start"
                            loading="lazy"
                            src={image} />
                    )}
                </div>
                <p className="mt-1 text-gray-400">{description}</p>
                <div>{content}</div>
                <div>{children}</div>
            </div>
        </div>
    );
};
