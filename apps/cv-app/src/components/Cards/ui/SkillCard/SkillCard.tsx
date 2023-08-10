import { component$ } from '@builder.io/qwik';

import { CardFrame, DATA } from '@/shared';

const { cards: { skills } } = DATA;

export type TSkillsCardProps = {
    ref?: Signal<Element | undefined>;
};

export const SkillCard = component$((props: TSkillsCardProps) => {
    const canvasRef = useSignal<HTMLCanvasElement>();

    return (
        <CardFrame
            ref={props.ref}
            withBorders
            class={[
                'drop-shadow-md',
                'bg-stone-100 dark:bg-stone-950',
                'order-1 p-4 md:p-10 col-start-1 col-end-9',
                'border border-gray-300 dark:border-gray-900']}>
            <div class="w-full h-full flex flex-col justify-center absolute">
                <canvas ref={canvasRef} />
            </div>
            <div class="flex flex-col justify-between">
                <h2 class="text-3xl md:text-3xl mt-3 text-gray-900 dark:text-gray-300">
                    {skills.title}
                </h2>
                <p class="text-xl mt-4 text-gray-600 dark:text-gray-500">
                    {skills.subtitle}
                </p>
            </div>
        </CardFrame>
    );
});
