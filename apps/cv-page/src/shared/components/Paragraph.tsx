import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import React from 'react';

type ParagraphProps = {
    category: ReactNode;
    content: ReactNode;
    description: string;
    name: string;
};

export const Paragraph = (props: ParagraphProps) => {
    const { category, content, description, name: title } = props;

    return (
        <div
            className={clsx(
                'flex flex-col gap-x-8 rounded-md',
                'bg-slate-800 p-3 sm:items-center md:flex-row'
            )}>
            <div>
                <div className="flex flex-col gap-y-2 sm:items-center md:flex-row">
                    <div className="text-2xl font-semibold">{title}</div>
                    <div className="ml-0 flex flex-wrap gap-1 md:ml-3">{category}</div>
                </div>
                <p className="mt-3 text-gray-400">{description}</p>
                <div>{content}</div>
            </div>
        </div>
    );
};
