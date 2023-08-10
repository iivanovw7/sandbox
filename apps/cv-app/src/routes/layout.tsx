import { $, component$, createContextId, useContextProvider, useVisibleTask$ } from '@builder.io/qwik';
import type { AnyFunction, Nullable } from '@sandbox/types';

import { Footer, Header } from '@/components';
import type { DATA } from '@/shared';

type TNavKey = typeof DATA.navigation[number];

type TLayoutContext = {
    navRefs: Record<TNavKey, Nullable<HTMLElement>>;
    onClickNav: Nullable<(navKey: TNavKey) => void>;
};

const SCROLL_SHIFT = 200;
export const layoutCtx = createContextId<TLayoutContext>('layout');

export default component$(() => {
    const layoutState = useStore<TLayoutContext>({
        navRefs: {},
        onClickNav: null,
    });

    const handleScroll = $((navKey: string) => {
        const target = layoutState.navRefs[navKey];

        if (target) {
            window.scrollTo({
                top: (() => {
                    switch (navKey) {
                        case 'home': {
                            return 0;
                        }
                        case 'contacts': {
                            return document.body.scrollHeight;
                        }
                        default: {
                            return target.offsetTop - SCROLL_SHIFT;
                        }
                    }
                })()
            });
        }
    });

    useContextProvider(layoutCtx, layoutState);

    useVisibleTask$(() => {
        layoutState.onClickNav = handleScroll as AnyFunction;
    });

    return (
        <>
            <Header />
            <div class="px-6 mx-auto max-w-screen-lg">
                <Slot />
            </div>
            <Footer />
        </>
    );
});
