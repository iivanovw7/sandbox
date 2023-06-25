import React from 'react';

import { GradientText, HeroAvatar, HeroSocial, Section } from '@/shared';

export const Hero = () => (
    <Section>
        <HeroAvatar
            avatar={(
                <img
                    alt="Avatar"
                    className="h-72 w-96 justify-center md:justify-start"
                    loading="lazy"
                    src="/assets/images/hero.png" />
            )}
            description={(
                <div className="text-lg">
                    <div>
                        I am a Front End developer with industry experience building websites and web
                        applications.
                    </div>
                    <br />
                    <div>
                        <span>I specialize in&nbsp;</span>
                        <GradientText>JavaScript</GradientText>
                        <span> / </span>
                        <GradientText>TypeScript&nbsp;</GradientText>
                        <span>and have professional experience working with React.</span>
                    </div>
                    <br />
                </div>
            )}
            socialButtons={(
                <div className="flex w-full flex-row justify-center gap-1 md:justify-start">
                    <a className="mr-1" href="https://t.me/iivanovw7">
                        <HeroSocial alt="Telegram" src="/assets/images/telegram-icon.png" />
                    </a>
                    <a className="mr-1" href="https://twitter.com/_IvanovIgor">
                        <HeroSocial alt="Twitter" src="/assets/images/twitter-icon.png" />
                    </a>
                    <a className="mr-1" href="https://www.facebook.com/iivanovw7">
                        <HeroSocial alt="Facebook" src="/assets/images/facebook-icon.png" />
                    </a>
                    <a className="mr-1" href="https://www.linkedin.com/in/iivanovw7">
                        <HeroSocial alt="Linkedin" src="/assets/images/linkedin-icon.png" />
                    </a>
                    <a className="mr-1" href="https://github.com/iivanovw7">
                        <HeroSocial alt="GitHub" src="/assets/images/github-icon.png" />
                    </a>
                    <a href="mailto:iivanovw7@gmail.com">
                        <HeroSocial alt="Email" src="/assets/images/email-icon.png" />
                    </a>
                </div>
            )}
            title={(
                <span>
                    <span>Hi there, I&apos;m&nbsp;</span>
                    <GradientText>Igor Ivanov</GradientText>
                    <span>👋</span>
                </span>
            )}
        />
    </Section>
);
