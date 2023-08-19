import React, { type ReactNode } from 'react';

import { APP_CONFIG, type BlogCollectionEntry, Section } from '@/shared';

import { PostContent } from './PostContent';
import { PostHeader } from './PostHeader';

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
