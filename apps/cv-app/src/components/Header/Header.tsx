import { $, component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import type { Nullable } from '@sandbox/types';
import { capitalize } from '@sandbox/utils';
import { ContrastIcon, ExternalLinkIcon, TerminalIcon } from 'lucide-qwik';

import type { Theme } from '#/ui';
import { layoutCtx } from '@/routes/layout';
import { CONFIG, DATA, env, useLocalStorage } from '@/shared';

import styles from './Header.module.css';

type TState = {
    isScrollHandlingScheduled: boolean;
    isScrollUp: boolean;
    scrollPosition: number;
    theme: Theme;
};

const { isDarkTheme, setBrowserTheme } = env;
const { ui } = CONFIG;
const { description, navigation, resume, title } = DATA;

const SCROLL_UP_CLASS = 'scroll-up';
const SCROLL_DOWN_CLASS = 'scroll-down';

export const Header = component$(() => {
    const layoutState = useContext(layoutCtx);
    const state = useStore<TState>(() => ({
        isScrollHandlingScheduled: false,
        isScrollUp: true,
        scrollPosition: 0,
        theme: 'light'
    }));

    const { data: userTheme, set: setUserTheme } = useLocalStorage<Nullable<Theme>>(
        'color-theme',
        null
    );

    const headerRef = useSignal<HTMLHeadElement>();

    const isScrollingDown = $(() => {
        const scrolledPosition = document.documentElement.scrollTop;
        const isScrollDown = scrolledPosition > state.scrollPosition;

        state.scrollPosition = scrolledPosition;

        return isScrollDown;
    });

    const handleThemeButtonClick = $(async () => {
        const newTheme: Theme = state.theme === 'light'
            ? 'dark'
            : 'light';

        setBrowserTheme(newTheme);
        await setUserTheme(newTheme);
        state.theme = newTheme;
    });

    const handleNavScroll = $(async () => {
        const header = headerRef.value;
        const scrollingDown = await isScrollingDown();

        if (header) {
            state.isScrollUp = ! (scrollingDown && ! header.contains(document.activeElement));
        }
    });

    useVisibleTask$(() => {
        const hasUserTheme = 'color-theme' in localStorage;
        const isUserThemeDark = userTheme.value === 'dark';

        state.theme = isUserThemeDark || (! hasUserTheme && isDarkTheme())
            ? 'dark'
            : 'light';
    });

    useOnWindow(
        'scroll',
        $(() => {
            if (! state.isScrollHandlingScheduled) {
                state.isScrollHandlingScheduled = true;

                setTimeout(() => {
                    void handleNavScroll();
                    state.isScrollHandlingScheduled = false;
                }, ui.throttleDelay);
            }
        })
    );

    return (
        <header
            ref={headerRef}
            class={[
                'pt-6 pb-6 my-0 bg-stone-900',
                'flex flex-col',
                state.isScrollUp
                    ? SCROLL_UP_CLASS
                    : SCROLL_DOWN_CLASS]}
        >
            <div class={[
                'px-6 flex flex-col gap-2 mx-auto max-w-screen-lg w-full',
                'md:justify-between md:items-center md:flex-row']}>
                <div class="flex items-center gap-x-2">
                    <TerminalIcon class="w-5 h-5 sm:w-9 sm:h-9 text-gray-200" />
                    <div class="flex flex-row items-center">
                        <div class={[styles.title, 'flex items-center']}>
                            <h3 class="text-base sm:text-2xl text-gray-200">{title}</h3>
                            <h3 class="text-base sm:text-2xl text-gray-500">, {description}</h3>
                        </div>
                        <span class={[styles.cursor, 'text-sm sm:text-2xl']}> |</span>
                    </div>
                </div>
                <nav class="flex flex-row justify-between items-center">
                    <ul class="flex gap-x-2 sm:gap-x-8 font-medium text-base sm:text-xl">
                        {navigation.map((path) => (
                            <li
                                key={path}
                                class={[
                                    'text-gray-500 transition-colors hover:text-white'
                                ]}>
                                <button
                                    type="button"
                                    onClick$={() => {
                                        layoutState.onClickNav?.(path);
                                    }}
                                >
                                    {capitalize(path)}
                                </button>
                            </li>
                        ))}
                        <li class="text-gray-500 transition-colors hover:text-white">
                            <a class="flex flex-row gap-2" href={resume} target="_blank">
                                <span>Resume</span>
                                <ExternalLinkIcon class="w-4 h-4" />
                            </a>
                        </li>
                    </ul>
                    <div class="flex items-center text-gray-500 transition-colors hover:text-white">
                        <button class="flex flex-row items-center ml-4 hover:text-white"
                            type="button"
                            onclick$={handleThemeButtonClick}>
                            <ContrastIcon class="w-4 sm:w-6 h-4 sm:h-6" />
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
});
