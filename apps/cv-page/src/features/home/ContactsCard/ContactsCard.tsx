import { clsx } from 'clsx';
import { AtSignIcon, SendIcon } from 'lucide-react';
import React from 'react';

import { APP_CONFIG, CardFrame, CardLink } from '@/shared';

const { social } = APP_CONFIG;

export const ContactsCard = () => (
    <CardFrame
        className={clsx(
            'h-80 bg-transparent',
            'relative order-6 col-start-9 col-end-13 p-0')}>
        <div className="flex flex-col justify-between p-0">
            <div className="flex flex-col items-start gap-2">
                <h3 className={clsx(
                    'title-chip',
                    'text-2xl',
                    'mt-3 text-stone-200')}>
                    Contact me
                </h3>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-500">
                    Make a contact via email or telegram.
                </p>
            </div>
            <div className="mt-4 flex flex-row items-start gap-2">
                <CardLink href={social.email}>
                    <AtSignIcon className="h-7 w-7 text-gray-900 dark:text-gray-200" />
                </CardLink>
                <CardLink href={social.telegram}>
                    <SendIcon className="h-7 w-7 text-gray-900 dark:text-gray-200" />
                </CardLink>
            </div>
        </div>
    </CardFrame>
);
