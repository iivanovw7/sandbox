import { component$ } from '@builder.io/qwik';

export type TCardFrameProps = {
    class?: string | string[];
    ref?: Signal<Element | undefined>;
    withBorders?: boolean;
};

export const CardFrame = component$((props: TCardFrameProps) => (
    <div
        ref={props.ref}
        class={[
            props.class,
            props.withBorders && 'card-frame card-frame-light dark:card-frame-dark',
            'relative']}>
        <Slot />
    </div>
));
