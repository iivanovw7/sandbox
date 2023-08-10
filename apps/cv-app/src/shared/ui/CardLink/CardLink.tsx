import { component$ } from '@builder.io/qwik';

export type TCardLinkProps = {
    href: string;
};

export const CardLink = component$((props: TCardLinkProps) => (
    <a
        class={[
            'block max-w-sm p-2 shadow-md',
            'border bg-stone-200 border-gray-400 hover:bg-stone-300',
            'dark:bg-stone-900 dark:border-gray-600 dark:hover:bg-stone-800',
            'opacity-80 transition-colors transition-transform hover:-translate-y-2'
        ]}
        href={props.href}
        target="_blank">
        <Slot />
    </a>
));
