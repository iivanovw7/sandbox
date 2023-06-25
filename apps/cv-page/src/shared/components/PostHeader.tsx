import { format } from 'date-fns';
import React from 'react';

import type { BlogCollectionEntry } from '@/shared/types';

type PostHeaderProps = {
    author: string;
    content: BlogCollectionEntry['data'];
};

export const PostHeader = (props: PostHeaderProps) => {
    const { content } = props;

    return (
        <div>
            <h1 className="text-center text-3xl font-bold">{content.title}</h1>
            <div className="mt-2 text-center text-sm text-gray-400">
                <span>By </span>
                <span>{`${content.author} `}</span>
                <span>on </span>
                {format(new Date(content.date), 'LLL d, yyyy')}
            </div>
        </div>
    );
};
