import React from 'react';

import { ColorTags, GradientText, Page, Paragraph, Section, Tags } from '@/shared';

export const Content = () => (
    <Page>
        <Section title={<GradientText>OBJECTIVE</GradientText>}>
            <div className="flex flex-col gap-6 text-lg">
                I have over 4 years of professional experience in web development, I am interested in using my
                expertise to build well-constructed, user-friendly web applications as a front-end developer.
                I`m interested in constant improvement of my technical skills in HTML, CSS, SASS, Typescript,
                and React to deliver top-notch products. I have a track-record of optimizing web application
                performance with a keen eye for detail. My strong collaboration skills and my experience
                allows me to contribute seamlessly to any project.
            </div>
        </Section>
        <Section title={<GradientText>SKILLS</GradientText>}>
            <div className="flex flex-col gap-6 text-lg">
                <ul className="list-disc pl-6">
                    <li>HTML, CSS, SASS, postcss</li>
                    <li>Javascript / Typescript</li>
                    <li>Single page applications, responsive web design</li>
                    <li>Git (GitHub, GitLab)</li>
                    <li>REST, GraphQL / Apollo</li>
                    <li>Webpack 3-5, vite, Gulp, Docker</li>
                    <li>Cross-Browser development</li>
                    <li>E2E testing, CodeceptJS / Playwright</li>
                    <li>Unit testing with Jest/Mocha.</li>
                    <li>ReactJS unit testing with Jest, React testing library, Chai/Mocha+Enzyme</li>
                    <li>Redux, Redux Toolkit, MobX</li>
                    <li>Jira / Wrike</li>
                </ul>
            </div>
        </Section>
        <Section title={<GradientText>WORK EXPERIENCE</GradientText>}>
            <div className="flex flex-col gap-6 text-lg">
                <Paragraph
                    category={<Tags color={ColorTags.SKY}>January 2021 - current time</Tags>}
                    content={(
                        <div className="mt-8 flex flex-col gap-1 text-lg">
                            <h3 className="text-lg font-semibold">Responsibilities:</h3>
                            <ul className="list-disc pl-6">
                                <li className="mt-3 text-gray-300">
                                    Development of internal corporate analytics/management CRM platform for
                                    managing company game projects. An internal corporate CRM strongly
                                    adapted
                                    for business needs, game projects administration, data analysis used by
                                    over 700 company employees Later converted by my team and myself
                                    personally into a separate product, independent CRM system.
                                </li>
                                <li className="mt-3 text-gray-300">
                                    My work involved developing an internal company portal that served as a
                                    social network for employees, featured an achievement system, and
                                    enabled
                                    the use of internal corporate currency to order merchandise and gifts;
                                    this portal also included a CRM system for administration and logistics
                                    management.
                                </li>
                                <li className="mt-3 text-gray-300">
                                    I utilized
                                    {' '}
                                    <GradientText>React </GradientText>
                                    {' '}
                                    (
                                    <GradientText>Typescript</GradientText>
                                    ) and
                                    {' '}
                                    <GradientText> MobX </GradientText>
                                    , as well as
                                    {' '}
                                    <GradientText> Webpack</GradientText>
                                    , in my development efforts.
                                </li>
                                <li className="mt-3 text-gray-300">
                                    I developed the frontend layout of sections and system components
                                    according to Figma designs.
                                </li>
                                <li className="mt-3 text-gray-300">
                                    I was responsible for implementing new functionality and business logic
                                    for the web application and BFF (backend for frontend) using NestJS.
                                </li>
                                <li>Scrum work.</li>
                            </ul>
                        </div>
                    )}
                    description="Singapore"
                    name="Frontend developer, MYTONA PTE. LTD"
                />
                <Paragraph
                    category={<Tags color={ColorTags.SKY}>February 2019 – February 2021</Tags>}
                    content={(
                        <div className="mt-8 flex flex-col gap-1 text-lg">
                            <h3 className="text-lg font-semibold">Responsibilities:</h3>
                            <ul className="list-disc pl-6">
                                <li className="mt-3 text-gray-300">
                                    Working on an online cinema project, a project using
                                    <GradientText> React </GradientText>
                                    and
                                    <GradientText> Redux</GradientText>
                                    , testing with
                                    <GradientText> Chai </GradientText>
                                    +
                                    <GradientText> Enzyme</GradientText>
                                    ,
                                    <GradientText> react-md@v1</GradientText>
                                    .
                                </li>
                                <li className="mt-3 text-gray-300">
                                    Developed layout of various site components, worked in
                                    <GradientText> zeplin </GradientText>
                                    and
                                    <GradientText> figma</GradientText>
                                    .
                                </li>
                                <li className="mt-3 text-gray-300">
                                    Development of SPA from scratch for one-time access and watching a movie
                                    using a booking code. App contains two main scenes: the login and the
                                    player / movie description page. The
                                    <GradientText> clappr.js </GradientText>
                                    player, unit tests on
                                    <GradientText> Chai </GradientText>
                                    +
                                    <GradientText> Enzyme</GradientText>
                                    ,
                                    used the
                                    <GradientText> Redux Toolkit </GradientText>
                                    for state management.
                                </li>
                            </ul>
                        </div>
                    )}
                    description="Saint-Petersburg, Russia"
                    name="Frontend developer, AB Technology"
                />
                <Paragraph
                    category={<Tags color={ColorTags.SKY}>January 2013 – February 2019</Tags>}
                    content={(
                        <div className="mt-8 flex flex-col gap-1 text-lg">
                            <h3 className="text-lg font-semibold">Responsibilities:</h3>
                            <ul className="list-disc pl-6">
                                <li className="mt-3 text-gray-300">
                                    Creation of algorithms for the PLC, according to the design
                                    documentation,
                                    with the subsequent launch of the systems into production operation.
                                </li>
                                <li>
                                    Maintained and developed new functionality for smart TV web application,
                                    which supported Samsung and LG platforms.
                                </li>
                                <li className="mt-3 text-gray-300">
                                    Development of a graphical interface for a dispatching system in Desigo
                                    Insight, WinCC, Citect.
                                </li>
                                <li className="mt-3 text-gray-300">
                                    Development of methods for integrating third party equipment into Desigo
                                    Insight. Selection of the required hardware and software complex.
                                </li>
                                <li className="mt-3 text-gray-300">
                                    Training of customer representatives to work with the supplied
                                    equipment,
                                    technical support for users.
                                </li>
                            </ul>
                        </div>
                    )}
                    description="Saint-Petersburg, Russia"
                    name="PLC & SCADA engineer, BCC Group"
                />
            </div>
        </Section>
        <Section title={<GradientText>CODE SAMPLES</GradientText>}>
            <div className="flex flex-col gap-6 text-lg">
                <ul className="list-disc pl-6">
                    <li className="mt-3 text-gray-300">
                        Pet project Typescript SPA in development.
                        <a
                            className="ml-2 no-underline hover:text-cyan-400 hover:underline"
                            href="https://github.com/iivanovw7/player-app"
                        >
                            <GradientText>Github link</GradientText>
                        </a>
                    </li>
                    <li className="mt-3 text-gray-300">
                        React Typescript (MobX) functional component example (also includes store).
                        <a
                            className="ml-2 no-underline hover:text-cyan-400 hover:underline"
                            href="https://gist.github.com/iivanovw7/e7710de9b183437d4b0e0628ca88c5b6"
                        >
                            <GradientText>Gist link</GradientText>
                        </a>
                    </li>
                    <li className="mt-3 text-gray-300">
                        React (Redux Toolkit) class component examples.
                        <a
                            className="ml-2 no-underline hover:text-cyan-400 hover:underline"
                            href="https://gist.github.com/iivanovw7/f46fc7539910e2d91debc281b88236bc"
                        >
                            <GradientText>Gist link #1</GradientText>
                        </a>
                        ,
                        <a
                            className="ml-2 no-underline hover:text-cyan-400 hover:underline"
                            href="https://gist.github.com/iivanovw7/ba3703b783d7d05a2c670e4a50d1c210"
                        >
                            <GradientText>Gist link #2</GradientText>
                        </a>
                    </li>
                    <li className="mt-3 text-gray-300">
                        Example of usage google maps to create map with custom markers.
                        <a
                            className="ml-2 no-underline hover:text-cyan-400 hover:underline"
                            href="https://github.com/iivanovw7/mobile-map-markers"
                        >
                            <GradientText>Github link</GradientText>
                        </a>
                    </li>
                    <li className="mt-3 text-gray-300">
                        Multiselect component could be used for filters. Works in codesandbox.
                        <a
                            className="ml-2 no-underline hover:text-cyan-400 hover:underline"
                            href="https://codesandbox.io/s/multiselect-ceke1"
                        >
                            <GradientText>Sandbox link</GradientText>
                        </a>
                    </li>
                </ul>
            </div>
        </Section>
        <Section title={<GradientText>ADDITIONAL SKILLS</GradientText>}>
            <div className="flex flex-col gap-6 text-lg">
                <ul className="list-disc pl-6">
                    <li>
                        I mostly work in a Linux environment, Debian or Arch. Prefer working with git via Cli,
                        but also use webstorm integration tools.
                    </li>
                    <li>
                        I have various experience in debugging web applications, not only in common web
                        browsers, but also in smart TVs, like Tizen or WebOS.
                    </li>
                    <li>
                        As an experienced frontend developer, I have knowledge of a range of technologies such
                        as GraphQL, BFF, Webpack 3-5, Gulp, Docker, and Vite and I use WebStorm and have
                        familiarity with graphic packages like Gimp and Krita.
                    </li>
                </ul>
            </div>
        </Section>
        <Section title={<GradientText>FOREIGN LANGUAGES</GradientText>}>
            <div className="flex flex-col gap-6 text-lg">
                <ul className="list-disc pl-6">
                    <li>English - Advanced</li>
                    <li>Russian - Native speaker</li>
                </ul>
            </div>
        </Section>
        <Section title={<GradientText>EDUCATION</GradientText>}>
            <div className="flex flex-col gap-6 text-lg">
                I hold an Engineering degree from the St. Petersburg University of Architecture and Civil
                Engineering (SPBGASU), Department of Expertise and Real Estate Management, with full-time
                studies.
            </div>
        </Section>
        <Section title={<GradientText>HOBBIES</GradientText>}>
            <div className="flex flex-col gap-6 text-lg">
                <ul className="list-disc pl-6">
                    <li>Bicycle</li>
                    <li>Snowboard</li>
                    <li>Travel</li>
                </ul>
            </div>
        </Section>
    </Page>
);
