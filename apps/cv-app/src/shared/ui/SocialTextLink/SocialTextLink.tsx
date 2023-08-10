import { component$ } from '@builder.io/qwik';
import { LuAtSign, LuGithub, LuLinkedin, LuSend, LuTwitter } from '@qwikest/icons/lucide';
import { capitalize } from '@sandbox/utils';

import { DATA } from '@/shared';

import styles from './SocialTextLink.module.css';

export type TSocialLink = keyof typeof DATA['social'];

export type SocialTextLinkProps = {
    link: TSocialLink;
};

export const socialIconsMap: Record<TSocialLink, JSXNode> = {
    email: <LuAtSign class="w-6 h-6 text-inherit" />,
    github: <LuGithub class="w-6 h-6 text-inherit" />,
    linkedin: <LuLinkedin class="w-6 h-6 text-inherit" />,
    telegram: <LuSend class="w-6 h-6 text-inherit" />,
    twitter: <LuTwitter class="w-6 h-6 text-inherit" />
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
