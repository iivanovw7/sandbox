import { component$ } from '@builder.io/qwik';
import { capitalize } from '@sandbox/utils';
import { AtSignIcon, GithubIcon, LinkedinIcon, SendIcon, TwitterIcon } from 'lucide-qwik';

import { DATA } from '@/shared';

import styles from './SocialTextLink.module.css';

export type TSocialLink = keyof typeof DATA['social'];

export type SocialTextLinkProps = {
    link: TSocialLink;
};

export const socialIconsMap: Record<TSocialLink, JSXNode> = {
    email: <AtSignIcon class="w-6 h-6 text-inherit" />,
    github: <GithubIcon class="w-6 h-6 text-inherit" />,
    linkedin: <LinkedinIcon class="w-6 h-6 text-inherit" />,
    telegram: <SendIcon class="w-6 h-6 text-inherit" />,
    twitter: <TwitterIcon class="w-6 h-6 text-inherit" />
};

export const SocialTextLink = component$((props: SocialTextLinkProps) => (
    <a aria-label={capitalize(props.link)}
        class={[
            styles.link,
            'flex flex-row items-center',
            'transition-colors flex gap-2 mt-2 sm:mt-3',
            'text-gray-500 text-xl hover:text-gray-200'
        ]}
        href={DATA.social[props.link]}
        rel="me">
        {socialIconsMap[props.link]}
    </a>
));
