import { clsx } from 'clsx';
import { format } from 'date-fns';
import React from 'react';

import { Tag } from '@/shared/components/Tags';
import type { BlogCollectionEntry } from '@/shared/types';

type BlogCardProps = {
    className?: string;
    instance: BlogCollectionEntry;
};

export const BlogCard = (props: BlogCardProps) => {
    const {
        className,
        instance: {
            data: {
                cover,
                date,
                description,
                tags,
                title
            },
            slug
        }
    } = props;

    return (
        <a className={clsx('hover:translate-y-1', className)} href={`/blog/${slug}`}>
            <div className="max-h-64 overflow-hidden rounded-md bg-slate-800">
                {cover
                    ? (
                        <div className="aspect-h-2 aspect-w-3">
                            <img
                                alt={slug}
                                className="h-full w-full object-cover object-center"
                                loading="lazy"
                                src={cover}
                            />
                        </div>
                    )
                    : null}
                <div className="px-3 pb-6 pt-4 text-center">
                    <h2 className="text-xl font-semibold">
                        {title}
                    </h2>
                    <div className="mt-1 text-xs text-gray-400">
                        {format(new Date(String(date)), 'LLL d, yyyy')}
                    </div>
                    <div className="mt-2 truncate text-sm">
                        {description}
                    </div>
                    <div className="mt-2 flex-wrap text-sm text-black">
                        {tags.map((tag: string, index: number) => {
                            // eslint-disable-next-line react/no-array-index-key
                            return <Tag key={index} text={tag} />;
                        })}
                    </div>
                </div>
            </div>
        </a>
    );
};

