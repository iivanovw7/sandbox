import { type HTMLAttributes, component$ } from '@builder.io/qwik';

export type TCardButtonProps = {
    class?: string | string[];
} & HTMLAttributes<HTMLButtonElement>;


export const CardButton = component$((props: TCardButtonProps) => (
    <button
        {...props}
        class={[
            props.class,
            'block max-w-sm p-2 shadow-md',
            'border bg-stone-200 border-gray-400 hover:bg-stone-300',
            'dark:bg-stone-900 dark:border-gray-600 dark:hover:bg-stone-800',
            'opacity-80 transition-colors transition-transform hover:-translate-y-2'
        ]}>
        <Slot />
    </button>
));
