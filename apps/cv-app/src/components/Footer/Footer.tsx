import { component$, useContext } from '@builder.io/qwik';
import { capitalize } from '@sandbox/utils';
import { ExternalLinkIcon, GithubIcon } from 'lucide-qwik';

import { layoutCtx } from '@/routes/layout';
import { DATA, SocialTextLink, type TSocialLink } from '@/shared';

import styles from './Footer.module.css';

const { navigation, project, resume, social } = DATA;

export const Footer = component$(() => {
    const layoutState = useContext(layoutCtx);

    return (
        <div class={[
            styles.footer,
            'pb-8 mt-8 bg-stone-900-80',
            'flex flex-row justify-center items-center gap-2']}>
            <div class="mt-8 px-6 mx-auto w-full max-w-screen-lg">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div class="flex flex-col mt-2">
                        <h3 class={[
                            'title-chip',
                            'mb-2 text-2xl col-start-1 col-end-2 text-white']}>
                                Social
                        </h3>
                        <section class="block grid grid-cols-2">
                            {Object.keys(social).map((link) => (
                                <SocialTextLink link={link as TSocialLink} />
                            ))}
                        </section>
                    </div>
                    <div class="flex flex-col mt-2">
                        <h3 class={[
                            'title-chip',
                            'mb-2 text-2xl col-start-1 col-end-2 text-stone-200']}>
                                Navigation
                        </h3>
                        <nav class="block grid grid-cols-2 text-xl mt-2">
                            {navigation.map((link) => (
                                <button
                                    class={[
                                        'flex flex-row',
                                        'mt-2',
                                        'text-gray-500 transition-colors hover:text-white'
                                    ]}
                                    type="button"
                                    onClick$={() => {
                                        layoutState.onClickNav?.(link);
                                    }}
                                >
                                    {capitalize(link)}
                                </button>
                            ))}
                            <a
                                class="flex flex-row gap-2 mt-2 sm:mt-3 text-xl text-gray-500"
                                href={resume}
                                target="_blank">
                                <span>Resume</span>
                                <ExternalLinkIcon class="w-4 h-4" />
                            </a>
                        </nav>
                    </div>
                </div>
                <div class="flex flex-row items-center justify-center w-full mt-8">
                    <p class="text-xl">
                        <span class="text-gray-500">Made by me</span>
                        <span class="text-white">{` ©${new Date().getFullYear()}`}</span>
                    </p>
                    <a
                        class={[
                            'block p-2 shadow-md rounded-full',
                            'text-gray-500 hover:text-white',
                            'opacity-80 transition-colors'
                        ]}
                        href={project}
                        target="_blank">
                        <GithubIcon class="w-6 h-6" />
                    </a>
                </div>
            </div>
        </div>
    );
});
