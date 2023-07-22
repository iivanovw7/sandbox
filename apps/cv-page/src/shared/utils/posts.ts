import type { BlogCollectionEntry, JobCollectionEntry } from '@/shared/types';

type TEntry = BlogCollectionEntry | JobCollectionEntry;

export const sortByDate = <Entry extends TEntry>(posts: Entry[]): Entry[] => {
    return posts.sort((a, b) => {
        return new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf();
    });
};
