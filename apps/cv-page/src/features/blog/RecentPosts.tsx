import React from 'react';

import { type BlogCollectionEntry, GradientText, Section } from '@/shared';

import { BlogGallery } from './BlogGallery';

type IRecentPostsProps = {
    className?: string;
    postList: BlogCollectionEntry[];
};

export const RecentPosts = (props: IRecentPostsProps) => {
    const { className, postList } = props;

    return (
        <Section
            className={className}
            title={(
                <div className="flex items-baseline justify-between">
                    <div>
                        <span>Recent </span>
                        <GradientText>Posts</GradientText>
                    </div>
                    <div className="text-sm">
                        <a href="/posts">View all Posts →</a>
                    </div>
                </div>
            )}
        >
            <BlogGallery postList={postList} />
        </Section>
    );
};

