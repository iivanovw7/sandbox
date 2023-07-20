import { clsx } from 'clsx';
import React from 'react';

import type { BlogCollectionEntry } from '@/shared';

import { BlogCard } from './BlogCard';

type RecentPostsProps = {
    className?: string;
    postList: BlogCollectionEntry[];
};

export const BlogGallery = (props: RecentPostsProps) => {
    const { className, postList } = props;

    return (
        <div className={clsx('grid grid-cols-1 gap-6 md:grid-cols-3', className)}>
            {postList.map((elt) => (
                <BlogCard key={elt.id} instance={elt} />
            ))}
        </div>
    );
};
