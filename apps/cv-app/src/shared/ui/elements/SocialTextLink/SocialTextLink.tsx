import { capitalize } from '@sandbox/utils';
import { clsx } from 'clsx';
import { AtSignIcon, GithubIcon, LinkedinIcon, SendIcon, TwitterIcon } from 'lucide-react';
import React, { type ReactElement } from 'react';

import { APP_CONFIG } from '@/shared';

import styles from './SocialTextLink.module.css';

export type TSocialLink = keyof typeof APP_CONFIG['social'];

export type TSocialTextLinkProps = {
    link: TSocialLink;
};

export const socialIconsMap: Record<TSocialLink, ReactElement> = {
    email: <AtSignIcon className="h-6 w-6 text-inherit" />,
    github: <GithubIcon className="h-6 w-6 text-inherit" />,
    linkedin: <LinkedinIcon className="h-6 w-6 text-inherit" />,
    telegram: <SendIcon className="h-6 w-6 text-inherit" />,
    twitter: <TwitterIcon className="h-6 w-6 text-inherit" />
};

export const SocialTextLink = (props: TSocialTextLinkProps) => (
    <a
        aria-label={capitalize(props.link)}
        className={clsx(
            styles.link,
            'flex flex-row items-center',
            'mt-2 gap-2 transition-colors sm:mt-3',
            'text-xl text-gray-500 hover:text-gray-200'
        )}
        href={APP_CONFIG.social[props.link]}
    >
        {socialIconsMap[props.link]}
    </a>
);
