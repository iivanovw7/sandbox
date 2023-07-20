import React from 'react';

import { Logo, NavMenu, NavMenuItem, NavbarTwoColumns, Section } from '@/shared';

export const Navbar = () => (
    <Section className="h-[theme(spacing.20)]">
        <NavbarTwoColumns>
            <a id="header-logo" href="/">
                <Logo
                    icon={(
                        <img
                            alt="Logo"
                            className="mr-4 h-8 w-8"
                            loading="lazy"
                            src="/assets/images/header-logo.png" />
                    )}
                    name="Igor Ivanov" />
            </a>
            <NavMenu>
                <NavMenuItem href="https://github.com/iivanovw7">
                    GitHub
                </NavMenuItem>
                <NavMenuItem href="https://twitter.com/_IvanovIgor">
                    Twitter
                </NavMenuItem>
                <NavMenuItem href="https://www.linkedin.com/in/iivanovw7">
                    Linkedin
                </NavMenuItem>
                <NavMenuItem href="/assets/pdf/resume_2023_1_eng-5.pdf">
                    Resume
                </NavMenuItem>
            </NavMenu>
        </NavbarTwoColumns>
    </Section>
);
