import React from 'react';

import { BlogGallery } from '@/shared/components/BlogGallery';
import { GradientText } from '@/shared/components/GradientText';
import { Section } from '@/shared/components/Section';
import type { BlogCollectionEntry } from '@/shared/types';

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

