import { clsx } from 'clsx';
import { BoxIcon, GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import React from 'react';

import { APP_CONFIG, CardFrame, CardLink } from '@/shared';

const { description, social, title } = APP_CONFIG;

export const HelloCard = () => (
    <CardFrame
        withBorders
        className={clsx(
            'drop-shadow-md',
            'card-background-light dark:card-background-dark',
            'order-1 col-start-1 col-end-13 p-4 md:p-10',
            'border border-gray-300 dark:border-gray-900'
        )}>
        <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div className="flex flex-row items-center gap-2">
                <BoxIcon className="hidden h-10 w-10 text-violet-800 md:block" />
                <div className="flex flex-col">
                    <p className="text-xl font-bold md:text-2xl">
                        {`Hi there, I'm ${title}`}
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-500">
                        {description}
                    </p>
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <CardLink href={social.twitter}>
                    <TwitterIcon className="h-7 w-7 text-gray-900 dark:text-gray-200" />
                </CardLink>
                <CardLink href={social.linkedin}>
                    <LinkedinIcon className="h-7 w-7 text-gray-900 dark:text-gray-200" />
                </CardLink>
                <CardLink href={social.github}>
                    <GithubIcon className="h-7 w-7 text-gray-900 dark:text-gray-200" />
                </CardLink>
            </div>
        </div>
        <div className="mt-4 flex flex-col justify-between md:mt-10">
            <h1 className="text-xl md:text-3xl">
                I am a Frontend developer with industry experience building websites and web applications.
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-500 md:mt-10 md:text-2xl">
                I enjoy learning new things and overcome new challenges analyzing how I improved through them.
            </p>
        </div>
    </CardFrame>
);
