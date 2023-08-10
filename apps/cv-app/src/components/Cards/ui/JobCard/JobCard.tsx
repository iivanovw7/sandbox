import { $, component$, useVisibleTask$ } from '@builder.io/qwik';
import type { Nullable, Percent } from '@sandbox/types';
import gsap from 'gsap';
import Draggable from 'gsap/dist/Draggable';
import { ArrowBigLeftIcon, ArrowBigRightIcon } from 'lucide-qwik';

import { CardButton, CardFrame, DATA, sortByDate } from '@/shared';

import styles from './JobCard.module.css';

type TState = {
    animation: Nullable<NoSerialize<gsap.core.Tween>>;
    draggable: Nullable<NoSerialize<Draggable[]>>;
    isLoading: boolean;
    proxy: Nullable<HTMLElement>;
    slideAnimation: Nullable<NoSerialize<gsap.core.Tween>>;
    slideWidth: number;
    wrapWidth: number;
};

export type TJobsCardProps = {
    ref?: Signal<Element | undefined>;
};

const { cards: { jobs } } = DATA;
const sortedJobs = sortByDate(jobs, 'start');
const SLIDE_CLASS = 'slide';
const SLIDE_DURATION = 0.3;
const SLIDE_WIDTH: Percent = 100;
const dateFormatter = new Intl.DateTimeFormat(
    'en-GB',
    {
        month: 'long',
        year: 'numeric',
    }
);

const formatJobDate = (value?: Nullable<string>) => {
    return value
        ? dateFormatter.format(new Date(String(value)))
        : 'Present';
};

export const JobCard = component$((props: TJobsCardProps) => {
    const sliderRef = useSignal<HTMLDivElement>();
    const state = useStore<TState>(() => ({
        animation: null,
        draggable: null,
        isLoading: true,
        proxy: null,
        slideAnimation: null,
        slideWidth: 0,
        slides: [],
        wrapWidth: 0
    }));
    const snapX = $((x: number) => {
        return Math.round(x / state.slideWidth) * state.slideWidth;
    });

    const updateDraggable = $(() => {
        state.slideAnimation?.kill();
        state.draggable?.[0]?.update();
    }) as unknown as gsap.Callback;

    const updateProgress = $(() => {
        const { animation, proxy, wrapWidth } = state;

        if (animation && proxy) {
            const x = Number(gsap.getProperty(
                proxy as GSAPTweenTarget,
                'x'
            ));

            animation.progress(gsap.utils.wrap(0, 1, x / wrapWidth));
        }
    }) as unknown as gsap.Callback;

    const animateSlides = $(async (direction: number) => {
        const { proxy, slideAnimation, slideWidth } = state;

        if (slideAnimation && proxy) {
            slideAnimation.kill();

            const xProp = gsap.getProperty(
                proxy as GSAPTweenTarget,
                'x'
            ) as number;

            const x = await snapX(xProp + (direction * slideWidth));

            state.slideAnimation = noSerialize(gsap.to(proxy as GSAPTweenTarget, {
                duration: SLIDE_DURATION,
                onUpdate: updateProgress,
                x
            }));
        }
    });

    useVisibleTask$(async () => {
        gsap.registerPlugin(Draggable);

        const card = sliderRef.value;
        const slides = card?.querySelectorAll(`.${SLIDE_CLASS}`);

        if (card && slides?.length) {
            const proxy = document.createElement('div');
            const proxyX = gsap.getProperty(proxy, 'x') as number;
            const parentHeight = gsap.getProperty(card, 'height') as number;
            const slideWidth = card.offsetWidth;
            const slideAnimation = noSerialize(gsap.to({}, {
                duration: 0.1
            }));
            const wrapWidth = slideWidth * slides.length;

            state.proxy = proxy;
            state.slideWidth = slideWidth;
            state.wrapWidth = wrapWidth;
            state.slideAnimation = slideAnimation;
            state.isLoading = false;

            gsap.set(card, { height: parentHeight });
            gsap.set(slides, { xPercent: (value) => value * 100 });
            gsap.set(proxy, { x: (proxyX / wrapWidth) * wrapWidth });

            state.animation = noSerialize(gsap.to(slides, {
                duration: 1,
                ease: 'none',
                modifiers: {
                    xPercent: gsap.utils.wrap(-SLIDE_WIDTH, (slides.length - 1) * SLIDE_WIDTH)
                },
                paused: true,
                repeat: -1,
                xPercent: `+= ${slides.length * 100}`
            }));

            state.draggable = noSerialize(Draggable.create(proxy, {
                onDrag: updateProgress,
                onPress: updateDraggable,
                onThrowUpdate: updateProgress,
                snap: {
                    x: gsap.utils.snap(slideWidth)
                },
                throwProps: true,
                trigger: card,
                type: 'x'
            }));

            await animateSlides(0);
            slideAnimation?.progress(1);
        }
    });

    return (
        <CardFrame
            ref={props.ref}
            withBorders
            class={[
                'h-96 drop-shadow-md',
                'bg-stone-100 dark:bg-stone-950',
                'order-1 p-0 col-start-1 col-end-13',
                'border border-gray-300 dark:border-gray-900'
            ]}>
            <div
                class={[
                    'relative flex justify-center items-center',
                    'h-full w-full overflow-hidden'
                ]}>
                <div
                    ref={sliderRef}
                    class={[
                        'flex flex-1 flex-col relative',
                        'h-full w-full',
                    ]}>
                    {sortedJobs.map((job, index) => (
                        <div
                            key={job.start}
                            class={[
                                SLIDE_CLASS,
                                index !== 0 && state.isLoading && 'hidden',
                                'absolute p-4 sm:p-10 overflow-hidden',
                                'h-full w-full justify-start items-start',
                                'flex flex-col h-full z-10'
                            ]}>
                            <div class="flex flex-row items-center gap-2">
                                <h2 class="text-xl md:text-2xl md:text-3xl">
                                    {! job.end && (
                                        <span class="text-gray-900 dark:text-gray-300">
                                            Currently I`m working at
                                        </span>
                                    )}
                                    <span class="ml-2">{job.company}</span>
                                </h2>
                                <img
                                    alt="Avatar"
                                    class={[
                                        'h-12 justify-center',
                                        'ml-3 bg-stone-200 dark:bg-stone-900',
                                        'p-2 md:justify-start'
                                    ]}
                                    loading="lazy"
                                    src={job.companyLogo}
                                />
                            </div>
                            <div class="flex flex-col md:flex-row gap-2 mt-2">
                                <p class="text-lg md:text-xl text-gray-600 dark:text-gray-500">
                                    {job.position}
                                </p>
                                <div class="text-lg md:text-xl title-chip mb-2 text-stone-200">
                                    <span class={['text-lg col-start-1 col-end-2']}>
                                        {formatJobDate(job.start)}
                                    </span>
                                    {' - '}
                                    <span class={['text-lg col-start-1 col-end-2']}>
                                        {formatJobDate(job.end)}
                                    </span>
                                </div>
                            </div>
                            <p class="text-xl md:text-2xl mt-3 text-gray-600 dark:text-gray-500">
                                {job.subtitle}
                            </p>
                        </div>
                    ))}
                    <div
                        class={[
                            'p-4 md:p-10',
                            'z-10 absolute bottom-0 right-0 flex',
                            'flex-row justify-end items-end gap-2 p-0'
                        ]}>
                        <CardButton onClick$={() => animateSlides(1)}>
                            <ArrowBigLeftIcon
                                class="w-7 h-7 text-gray-900 dark:text-gray-200" />
                        </CardButton>
                        <CardButton onClick$={() => animateSlides(-1)}>
                            <ArrowBigRightIcon
                                class="w-7 h-7 text-gray-900 dark:text-gray-200" />
                        </CardButton>
                    </div>
                </div>
                <ul
                    class={[
                        styles.squares,
                        'm-1 transition card-frame card-frame-light dark:card-frame-dark',
                    ]}>
                    <li class="bg-stone-300 dark:bg-stone-900" />
                    <li class="bg-stone-300 dark:bg-stone-900" />
                    <li class="bg-stone-300 dark:bg-stone-900" />
                    <li class="bg-stone-300 dark:bg-stone-900" />
                    <li class="bg-stone-300 dark:bg-stone-900" />
                    <li class="bg-stone-300 dark:bg-stone-900" />
                    <li class="bg-stone-300 dark:bg-stone-900" />
                    <li class="bg-stone-300 dark:bg-stone-900" />
                    <li class="bg-stone-300 dark:bg-stone-900" />
                    <li class="bg-stone-300 dark:bg-stone-900" />
                    <li class="bg-stone-300 dark:bg-stone-900" />
                </ul>
            </div>
        </CardFrame>
    );
});
