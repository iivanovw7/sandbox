import { component$ } from '@builder.io/qwik';
import { LuBox, LuGithub, LuLinkedin, LuTwitter } from '@qwikest/icons/lucide';

import { CardFrame, CardLink, DATA } from '@/shared';

const { cards: { hello }, description, fullName, social } = DATA;

export type THelloCardProps = {
    ref?: Signal<Element | undefined>;
};

export const HelloCard = component$((props: THelloCardProps) => (
    <CardFrame
        ref={props.ref}
        withBorders
        class={[
            'drop-shadow-md',
            'card-background-light dark:card-background-dark',
            'order-1 p-4 md:p-10 col-start-1 col-end-13',
            'border border-gray-300 dark:border-gray-900'
        ]}>
        <div class="flex flex-col md:flex-row gap-4 justify-between">
            <div class="flex flex-row items-center gap-2">
                <LuBox class="w-10 h-10 text-violet-800 hidden md:block" />
                <div class="flex flex-col">
                    <p class="font-bold text-xl md:text-2xl">
                        {`Hi there, I'm ${fullName} 👋`}
                    </p>
                    <p class="text-lg text-gray-600 dark:text-gray-500">
                        {description}
                    </p>
                </div>
            </div>
            <div class="flex row items-center gap-4">
                <CardLink href={social.twitter}>
                    <LuTwitter class="w-7 h-7 text-gray-900 dark:text-gray-200" />
                </CardLink>
                <CardLink href={social.linkedin}>
                    <LuLinkedin class="w-7 h-7 text-gray-900 dark:text-gray-200" />
                </CardLink>
                <CardLink href={social.github}>
                    <LuGithub class="w-7 h-7 text-gray-900 dark:text-gray-200" />
                </CardLink>
            </div>
        </div>
        <div class="flex flex-col justify-between mt-4 md:mt-10">
            <h1 class="text-xl md:text-2xl md:text-3xl">
                {hello.title}
            </h1>
            <p class="text-lg md:text-2xl mt-4 md:mt-10 text-gray-600 dark:text-gray-500">
                {hello.subtitle}
            </p>
        </div>
    </CardFrame>
));
