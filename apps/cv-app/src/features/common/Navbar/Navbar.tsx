import { useStore } from '@nanostores/react';
import type { Nullable } from '@sandbox/types';
import { clsx } from 'clsx';
import { ContrastIcon, ExternalLinkIcon, TerminalIcon } from 'lucide-react';
import React, { useCallback, useEffect, useRef } from 'react';

import { APP_CONFIG, type Theme, env, useLocalStorage } from '@/shared';

import { isScrollHandlingScheduled, isScrollUp, scrollPosition, theme } from './model';
import styles from './Navbar.module.css';

const { isDarkTheme, setBrowserTheme } = env;
const { description, resume, title, ui } = APP_CONFIG;

const SCROLL_UP_CLASS = 'scroll-up';
const SCROLL_DOWN_CLASS = 'scroll-down';

export const Navbar = () => {
    const headerRef = useRef<Nullable<HTMLHeadElement>>(null);

    const $isScrollUp = useStore(isScrollUp);
    const $isScrollHandlingScheduled = useStore(isScrollHandlingScheduled);
    const $scrollPosition = useStore(scrollPosition);
    const $theme = useStore(theme);

    const [userTheme, setUserTheme] = useLocalStorage<Nullable<Theme>>(
        'color-theme',
        null,
        {
            raw: true
        }
    );

    const handleThemeButtonClick = useCallback(() => {
        const newTheme: Theme = $theme === 'light'
            ? 'dark'
            : 'light';

        setBrowserTheme(newTheme);
        setUserTheme(newTheme);
        theme.set(newTheme);
    }, [$theme, setUserTheme]);

    const isScrollingDown = useCallback(() => {
        const scrolledPosition = document.documentElement.scrollTop;
        const isScrollDown = scrolledPosition > $scrollPosition;

        scrollPosition.set(scrolledPosition);

        return isScrollDown;
    }, [$scrollPosition]);

    const handleNavScroll = useCallback(() => {
        const header = headerRef.current;
        const scrollingDown = isScrollingDown();

        if (header) {
            isScrollUp.set(
                ! (scrollingDown && ! header.contains(document.activeElement))
            );
        }
    }, [isScrollingDown]);

    const handleScroll = useCallback(() => {
        if (! $isScrollHandlingScheduled) {
            isScrollHandlingScheduled.set(true);

            setTimeout(() => {
                void handleNavScroll();
                isScrollHandlingScheduled.set(false);
            }, ui.throttleDelay);
        }
    }, [$isScrollHandlingScheduled, handleNavScroll]);

    useEffect(() => {
        const hasUserTheme = 'color-theme' in localStorage;
        const isUserThemeDark = String(userTheme) === 'dark';

        theme.set(isUserThemeDark || (! hasUserTheme && isDarkTheme())
            ? 'dark'
            : 'light');
    }, [userTheme]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <header
            ref={headerRef}
            className={clsx(
                'my-0 bg-stone-900 py-6',
                'flex flex-col',
                $isScrollUp
                    ? SCROLL_UP_CLASS
                    : SCROLL_DOWN_CLASS
            )}>
            <div
                className={clsx(
                    'mx-auto flex w-full max-w-screen-lg flex-col gap-2 px-6',
                    'md:flex-row md:items-center md:justify-between'
                )}>
                <div className="flex items-center gap-x-2">
                    <TerminalIcon className="h-5 w-5 text-gray-200 sm:h-9 sm:w-9" />
                    <div className="flex flex-row items-center">
                        <div className={clsx(styles.title, 'flex items-center')}>
                            <h3 className="text-base text-gray-200 sm:text-2xl">
                                {title}
                            </h3>
                            <h3 className="text-base text-gray-500 sm:text-2xl">
                                {', '}
                                {description}
                            </h3>
                        </div>
                        <span
                            className={clsx(
                                styles.cursor,
                                'text-sm sm:text-2xl'
                            )}>
                            {' |'}
                        </span>
                    </div>
                </div>
                <nav className="flex flex-row items-center justify-between">
                    <ul className="flex gap-x-2 text-base font-medium sm:gap-x-8 sm:text-xl">
                        <li className="text-gray-500 transition-colors hover:text-white">
                            <a
                                className="flex flex-row gap-2"
                                href={resume}
                                rel="noreferrer"
                                target="_blank"
                            >
                                <span>Resume</span>
                                <ExternalLinkIcon className="h-4 w-4" />
                            </a>
                        </li>
                    </ul>
                    <div className="flex items-center text-gray-500 transition-colors hover:text-white">
                        <button className="ml-4 flex flex-row items-center hover:text-white"
                            type="button"
                            onClick={handleThemeButtonClick}>
                            <ContrastIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};
