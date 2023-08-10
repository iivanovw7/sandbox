import { component$ } from '@builder.io/qwik';

import { Cards } from '@/components';
import { DATA } from '@/shared';

export default component$(() => <Cards />);

const { description, title } = DATA;

/**
 *  Page head export.
 *  @see {@link https://qwik.builder.io/docs/pages/#head-export}
 */
export const head: DocumentHead = {
    title: `${title} - ${description}`
};
