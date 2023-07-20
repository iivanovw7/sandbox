import React from 'react';

type HeroSocialProps = {
    alt: string;
    src: string;
};

export const HeroSocial = (props: HeroSocialProps) => {
    const { alt, src } = props;

    return (
        <img
            alt={alt}
            className="h-12 w-12 hover:translate-y-1"
            loading="lazy"
            src={src}
        />
    );
};

