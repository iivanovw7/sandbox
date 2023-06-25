import React from 'react';

import { APP_CONFIG, GradientText, Section } from '@/shared';

export const Footer = () => (
    <Section className="h-[theme(spacing.20)]">
        <a
            className="font-medium hover:underline dark:text-cyan-600"
            href="/blog">
            Blog
        </a>
        <span>&nbsp;&nbsp;</span>
        <span>© Copyright&nbsp;</span>
        <span>{new Date().getFullYear()}</span>
        <span>&nbsp;by&nbsp;</span>
        <GradientText>{APP_CONFIG.siteName}</GradientText>
    </Section>
);
