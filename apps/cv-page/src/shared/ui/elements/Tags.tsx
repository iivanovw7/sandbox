import { clsx } from 'clsx';
import React, { type ReactNode } from 'react';

import type { ValueOf } from '../../types';

export const ColorTags = {
    AMBER: 'AMBER',
    BLUE: 'BLUE',
    CYAN: 'CYAN',
    EMERALD: 'EMERALD',
    FUCHSIA: 'FUCHSIA',
    GRAY: 'GRAY',
    GREEN: 'GREEN',
    INDIGO: 'INDIGO',
    LIME: 'LIME',
    NEUTRAL: 'NEUTRAL',
    ORANGE: 'ORANGE',
    PINK: 'PINK',
    PURPLE: 'PURPLE',
    RED: 'RED',
    ROSE: 'ROSE',
    SKY: 'SKY',
    SLATE: 'SLATE',
    STONE: 'STONE',
    TEAL: 'TEAL',
    VIOLET: 'VIOLET',
    YELLOW: 'YELLOW',
    ZINC: 'ZINC',
} as const;

type ITagsProps = {
    children: ReactNode;
    className?: string;
    color: ValueOf<typeof ColorTags>;
};

const colorToClassMap = {
    [ColorTags.AMBER]: 'bg-amber-400 text-amber-1200',
    [ColorTags.BLUE]: 'bg-blue-400 text-blue-1200',
    [ColorTags.CYAN]: 'bg-cyan-400 text-cyan-1200',
    [ColorTags.EMERALD]: 'bg-emerald-400 text-emerald-1200',
    [ColorTags.FUCHSIA]: 'bg-fuchsia-400 text-fuchsia-1200',
    [ColorTags.GRAY]: 'bg-gray-400 text-gray-1200',
    [ColorTags.GREEN]: 'bg-green-400 text-green-1200',
    [ColorTags.INDIGO]: 'bg-indigo-400 text-indigo-1200',
    [ColorTags.LIME]: 'bg-lime-400 text-lime-1200',
    [ColorTags.NEUTRAL]: 'bg-neutral-400 text-neutral-1200',
    [ColorTags.ORANGE]: 'bg-orange-400 text-orange-1200',
    [ColorTags.PINK]: 'bg-pink-400 text-pink-1200',
    [ColorTags.PURPLE]: 'bg-purple-400 text-purple-1200',
    [ColorTags.RED]: 'bg-red-400 text-red-1200',
    [ColorTags.ROSE]: 'bg-rose-400 text-rose-1200',
    [ColorTags.SKY]: 'bg-sky-400 text-black',
    [ColorTags.SLATE]: 'bg-slate-400 text-slate-1200',
    [ColorTags.STONE]: 'bg-stone-400 text-stone-1200',
    [ColorTags.TEAL]: 'bg-teal-400 text-teal-1200',
    [ColorTags.VIOLET]: 'bg-violet-400 text-violet-1200',
    [ColorTags.YELLOW]: 'bg-yellow-400 text-yellow-1200',
    [ColorTags.ZINC]: 'bg-zinc-400 text-zinc-1200',
};

const blogTagsMap: Record<string, string> = {
    'async': colorToClassMap[ColorTags.GREEN],
    'css': colorToClassMap[ColorTags.EMERALD],
    'gif': colorToClassMap[ColorTags.INDIGO],
    'js': colorToClassMap[ColorTags.ORANGE],
    'linux': colorToClassMap[ColorTags.RED],
    'npm': colorToClassMap[ColorTags.SLATE],
};

export const Tags = ({ children, className, color }: ITagsProps) => (
    <div className={clsx(`rounded-md px-2 py-1 text-xs font-semibold ${colorToClassMap[color]}`, className)}>
        {children}
    </div>
);

/**
 * Defines tag button color depending on word length.
 * @param {string} [key = ''] - string represents tag name.
 * @returns {*|number} returns color index from colors pallet.
 */
const getColor = (key = ''): string => {
    const { length: keyLength } = key;
    const colors = Object.values(colorToClassMap);

    return blogTagsMap[key] || colors?.[keyLength] || colorToClassMap.EMERALD;
};

export const Tag = ({ text }: { text: string }) => (
    <span className={`m-1 rounded-md px-2 py-1 text-xs font-semibold ${getColor(text)}`}>
        {text}
    </span>
);
