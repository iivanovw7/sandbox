// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export type BlogCollectionEntry = import('astro:content').CollectionEntry<'blog'>;

// Workaround to import Astro type. Otherwise, it'll have some compilation errors
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export type BlogPage<T> = import('astro').Page<T>;

export type BlogCollectionPage = BlogPage<BlogCollectionEntry>;

