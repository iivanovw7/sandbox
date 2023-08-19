import React, { type PropsWithChildren } from 'react';

import type { BlogCollectionEntry } from '@/shared';

type PostContentProps = PropsWithChildren<{
    content: BlogCollectionEntry['data'];
}>;

export const PostContent = (props: PostContentProps) => {
    const { children, content: { cover, title } } = props;

    return (
        <div className="mx-auto mt-5 max-w-screen-lg">
            {cover
                ? (
                    <div className="aspect-h-2 aspect-w-3">
                        <img
                            alt={title}
                            className="h-full w-full rounded-lg object-cover object-center"
                            loading="lazy"
                            src={cover}
                        />
                    </div>
                )
                : null}
            <div className="post-content prose-invert mt-8 p-3 prose-img:rounded-lg">
                {children}
            </div>
        </div>
    );
};
