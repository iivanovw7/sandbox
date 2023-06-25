import React, { type ReactNode } from 'react';

type HeroAvatarProps = {
    avatar: ReactNode;
    description: ReactNode;
    socialButtons: ReactNode;
    title: ReactNode;
};

export const HeroAvatar = (props: HeroAvatarProps) => {
    const { avatar, description, socialButtons, title } = props;

    return (
        <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-x-24">
            <div>
                <h1 className="text-3xl font-bold">
                    {title}
                </h1>
                <p className="mt-6 text-xl leading-9">
                    {description}
                </p>
                <div className="mt-3 flex gap-1">
                    {socialButtons}
                </div>
            </div>
            <div className="shrink-0">
                {avatar}
            </div>
        </div>
    );
};
