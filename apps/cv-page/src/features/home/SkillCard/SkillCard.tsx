import { clsx } from 'clsx';
import React from 'react';

import { CardFrame } from '@/shared';

export const SkillCard = () => (
    <CardFrame
        withBorders
        className={clsx(
            'drop-shadow-md',
            'bg-stone-100 dark:bg-stone-950',
            'order-1 col-start-1 col-end-9 p-4 md:p-10',
            'border border-gray-300 dark:border-gray-900'
        )}
    >
        <div className="flex flex-col justify-between">
            <h2 className="mt-3 text-3xl text-gray-900 dark:text-gray-300 md:text-3xl">
                I constantly try to improve my skills.
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-500">
                I have a track-record of optimizing web application performance with a keen eye for detail. My
                strong collaboration skills and my experience allows me to contribute seamlessly to any project.
            </p>
        </div>
    </CardFrame>
);
