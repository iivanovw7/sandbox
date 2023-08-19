import { clsx } from 'clsx';
import { GithubIcon } from 'lucide-react';
import React from 'react';

import { APP_CONFIG, SocialTextLink, type TSocialLink } from '@/shared';

const { project, social } = APP_CONFIG;

export const Footer = () => (
    <div className="mt-8 bg-stone-900">
        <div className={clsx(
            'flex flex-col items-center gap-2',
            'mx-auto max-w-screen-lg pb-8'
        )}>
            <div className="mx-auto mt-8 w-full max-w-screen-lg px-6">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div className="mt-2 flex flex-col">
                        <h3 className={clsx(
                            'title-chip',
                            'col-start-1 col-end-2 mb-2 text-2xl text-stone-200'
                        )}>
                            Social
                        </h3>
                        <section className="grid grid-cols-2">
                            {Object.keys(social).map((link, index) => (
                                <SocialTextLink key={index} link={link as TSocialLink} />
                            ))}
                        </section>
                    </div>
                    <div className="mt-2 flex flex-col" />
                </div>
                <div className="mt-8 flex w-full flex-row items-center justify-center">
                    <p className="text-xl">
                        <span className="text-gray-500">Made by me</span>
                        <span className="text-white">{` ©${new Date().getFullYear()}`}</span>
                    </p>
                    <a
                        className={clsx(
                            'block rounded-full p-2 shadow-md',
                            'text-gray-500 hover:text-white',
                            'opacity-80 transition-colors'
                        )}
                        href={project}
                        rel="noreferrer"
                        target="_blank">
                        <GithubIcon className="h-6 w-6" />
                    </a>
                </div>
            </div>
        </div>
    </div>
);
