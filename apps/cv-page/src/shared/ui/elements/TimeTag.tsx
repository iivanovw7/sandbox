import { format } from 'date-fns';
import React from 'react';

export type TimeTagProps = {
    divider?: string;
    value?: Date | null;
};

export const TimeTag = ({ divider, value }: TimeTagProps) => (
    <span>
        {value
            ? format(new Date(String(value)), 'LLLL d, yyyy')
            : 'current time'}
        {divider}
    </span>
);
