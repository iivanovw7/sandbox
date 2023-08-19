import type { BlogCollectionEntry } from '@/shared/types';

type TEntry = BlogCollectionEntry;

export const sortByDate = <Entry extends TEntry>(posts: Entry[]): Entry[] => {
    return posts.sort((a, b) => {
        return new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf();
    });
};
