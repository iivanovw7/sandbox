import type { BlogCollectionEntry } from '@/shared/types';

export const sortByDate = (posts: BlogCollectionEntry[]): BlogCollectionEntry[] => {
    return posts.sort((a, b) => {
        return new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf();
    });
};
