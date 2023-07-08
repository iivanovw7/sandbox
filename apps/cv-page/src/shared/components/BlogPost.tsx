import React, { type ReactNode } from 'react';

import { PostContent, PostHeader, Section } from '@/shared/components';
import { APP_CONFIG } from '@/shared/config';
import type { BlogCollectionEntry } from '@/shared/types';

type BlogPostProps = {
    children: ReactNode;
    content: BlogCollectionEntry['data'];
};

export const BlogPost = (props: BlogPostProps) => {
    const { children, content } = props;

    return (
        <Section>
            <PostHeader author={APP_CONFIG.author} content={content} />
            <PostContent content={content}>
                {children}
            </PostContent>
        </Section>
    );
};
