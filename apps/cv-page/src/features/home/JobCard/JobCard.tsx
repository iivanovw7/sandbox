import { useStore } from '@nanostores/react';
import type { Nullable, Percent } from '@sandbox/types';
import { clsx } from 'clsx';
import gsap from 'gsap';
import { ArrowBigLeftIcon, ArrowBigRightIcon } from 'lucide-react';
import React, { useCallback, useEffect, useRef } from 'react';

import { CardButton, CardFrame } from '@/shared';

import { JOBS } from './constants';
import styles from './JobCard.module.css';
import { animation, isLoading, proxy, slideAnimation, slideWidth, wrapWidth } from './model';

const sortedJobs = JOBS.sort((a, b) => {
    return new Date(String(b)).valueOf() - new Date(String(a)).valueOf();
});

const SLIDE_CLASS = 'slide';
const SLIDE_DURATION = 0.3;
const SLIDE_WIDTH: Percent = 100;
const dateFormatter = new Intl.DateTimeFormat(
    'en-US',
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

export const JobCard = () => {
    const sliderRef = useRef<HTMLDivElement>(null);

    const $animation = useStore(animation);
    const $isLoading = useStore(isLoading);
    const $proxy = useStore(proxy);
    const $slideAnimation = useStore(slideAnimation);
    const $slideWidth = useStore(slideWidth);
    const $wrapWidth = useStore(wrapWidth);

    const snapX = useCallback(
        (x: number) => {
            return Math.round(x / $slideWidth) * $slideWidth;
        }, [$slideWidth]);

    const updateProgress = useCallback(() => {
        if ($animation && $proxy) {
            const x = Number(gsap.getProperty($proxy, 'x'));

            $animation.progress(gsap.utils.wrap(0, 1, x / $wrapWidth));
        }
    }, [$animation, $proxy, $wrapWidth]);

    const animateSlides = useCallback((direction: number) => {
        if ($slideAnimation && $proxy) {
            $slideAnimation.kill();

            const xProp = gsap.getProperty($proxy, 'x') as number;
            const x = snapX(xProp + (direction * $slideWidth));

            slideAnimation.set(gsap.to($proxy, {
                duration: SLIDE_DURATION,
                onUpdate: updateProgress,
                x
            }));
        }
    }, [$proxy, $slideAnimation, $slideWidth, snapX, updateProgress]);

    const handleControlClick = useCallback((direction: number) => () => {
        animateSlides(direction);
    }, [animateSlides]);

    useEffect(() => {
        const card = sliderRef.current;
        const slideElements = card?.querySelectorAll(`.${SLIDE_CLASS}`);

        if (card && slideElements?.length) {
            const proxyEl = document.createElement('div');
            const proxyX = gsap.getProperty(proxy, 'x') as number;
            const parentHeight = gsap.getProperty(card, 'height') as number;
            const cardSlideAnimation = gsap.to({}, { duration: 0.1 });
            const cardWrapWidth = card.offsetWidth * slideElements.length;

            proxy.set(proxyEl);
            slideWidth.set(card.offsetWidth);
            wrapWidth.set(cardWrapWidth);
            slideAnimation.set(cardSlideAnimation);
            isLoading.set(false);

            gsap.set(card, { height: parentHeight });
            gsap.set(slideElements, { xPercent: (value) => value * 100 });
            gsap.set(proxyEl, { x: (proxyX / cardWrapWidth) * cardWrapWidth });

            animation.set(gsap.to(slideElements, {
                duration: 1,
                ease: 'none',
                modifiers: {
                    xPercent: gsap.utils.wrap(
                        -SLIDE_WIDTH,
                        (slideElements.length - 1) * SLIDE_WIDTH
                    )
                },
                paused: true,
                repeat: -1,
                xPercent: `+= ${slideElements.length * 100}`
            }));

            animateSlides(0);
            cardSlideAnimation?.progress(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CardFrame
            withBorders
            className={clsx(
                'h-96 drop-shadow-md',
                'bg-stone-100 dark:bg-stone-950',
                'order-1 col-start-1 col-end-13 p-0',
                'border border-gray-300 dark:border-gray-900'
            )}>
            <div
                className={clsx(
                    'relative flex items-center justify-center',
                    'h-full w-full overflow-hidden'
                )}>
                <div
                    ref={sliderRef}
                    className={clsx(
                        'relative flex flex-1 flex-col',
                        'h-full w-full'
                    )}>
                    {sortedJobs.map((job, index) => (
                        <div
                            key={job.start}
                            className={clsx(
                                SLIDE_CLASS,
                                'absolute overflow-hidden p-4 sm:p-10',
                                'h-full w-full items-start justify-start',
                                'z-10 flex flex-col',
                                {
                                    hidden: index !== 0 && $isLoading
                                }
                            )}>
                            <div className="flex w-full flex-row items-start gap-2">
                                <div className="flex flex-col">
                                    <h2 className="text-xl md:text-3xl">
                                        {job.company}
                                    </h2>
                                    <span className="text-gray-400 dark:text-gray-500">
                                        {job.location}
                                    </span>
                                </div>
                                <img
                                    alt="Avatar"
                                    className={clsx(
                                        'h-12 justify-center',
                                        'bg-stone-200 dark:bg-stone-900',
                                        'ml-auto p-2 md:justify-start'
                                    )}
                                    loading="lazy"
                                    src={job.companyLogo} />
                            </div>
                            <div className="mt-2 flex flex-col gap-2 md:flex-row">
                                <p className="text-lg md:text-xl">
                                    {job.position}
                                </p>
                                <div className="title-chip mb-2 text-lg text-stone-200 md:text-xl">
                                    <span className="col-start-1 col-end-2 text-lg">
                                        {formatJobDate(job.start)}
                                    </span>
                                    {' - '}
                                    <span className="col-start-1 col-end-2 text-lg">
                                        {formatJobDate(job.end)}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-3 text-xl text-gray-600 dark:text-gray-500 md:text-2xl">
                                {job.subtitle}
                            </p>
                        </div>
                    ))}
                    <div
                        className={clsx(
                            'p-4 md:p-10',
                            'absolute bottom-0 right-0 z-10 flex',
                            'flex-row items-end justify-end gap-2'
                        )}
                    >
                        <CardButton onClick={handleControlClick(1)}>
                            <ArrowBigLeftIcon className="h-7 w-7 text-gray-900 dark:text-gray-200" />
                        </CardButton>
                        <CardButton onClick={handleControlClick(-1)}>
                            <ArrowBigRightIcon className="h-7 w-7 text-gray-900 dark:text-gray-200" />
                        </CardButton>
                    </div>
                </div>
                <ul
                    className={clsx(
                        styles.squares,
                        'card-frame card-frame-light dark:card-frame-dark m-1 transition'
                    )}>
                    <li className="bg-stone-300 dark:bg-stone-900" />
                    <li className="bg-stone-300 dark:bg-stone-900" />
                    <li className="bg-stone-300 dark:bg-stone-900" />
                    <li className="bg-stone-300 dark:bg-stone-900" />
                    <li className="bg-stone-300 dark:bg-stone-900" />
                    <li className="bg-stone-300 dark:bg-stone-900" />
                    <li className="bg-stone-300 dark:bg-stone-900" />
                    <li className="bg-stone-300 dark:bg-stone-900" />
                    <li className="bg-stone-300 dark:bg-stone-900" />
                    <li className="bg-stone-300 dark:bg-stone-900" />
                    <li className="bg-stone-300 dark:bg-stone-900" />
                </ul>
            </div>
        </CardFrame>
    );
};
