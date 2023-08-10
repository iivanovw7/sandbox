export const sortByDate = <Entry>(posts: Entry[], key: keyof Entry): Entry[] => {
    return posts.sort((a, b) => {
        return new Date(b[key] as string).valueOf() - new Date(a[key] as string).valueOf();
    });
};

