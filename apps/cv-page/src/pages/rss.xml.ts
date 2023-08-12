import rss from '@astrojs/rss';
import type { AnyObject } from '@sandbox/types';
import { getCollection } from 'astro:content';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

import { APP_CONFIG } from '@/shared';

const parser = new MarkdownIt();

export const get = async (context: AnyObject): Promise<{ body: string }> => {
    const blog = await getCollection('blog');

    return rss({
        customData: '<language>en-us</language>',
        description: APP_CONFIG.description,
        items: blog.map((post) => ({
            body: sanitizeHtml(parser.render(post.body)),
            description: post.data.description,
            link: `/blog/${post.slug as string}/`,
            pubDate: post.data.date,
            title: post.data.title,
        })),
        site: context.site,
        title: APP_CONFIG.title,
    });
};
