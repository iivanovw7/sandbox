import React, { type PropsWithChildren } from 'react';

import { ColorTags, Paragraph, Tags, TimeTag } from '@/shared';
import type { JobCollectionEntry } from '@/shared/types';


export type JobProps = PropsWithChildren<{
    job: JobCollectionEntry;
}>;

export const Job = (props: JobProps) => {
    const {
        children,
        job: {
            data: {
                company,
                endDate,
                icon,
                location: companyLocation,
                role,
                startDate
            }
        }
    } = props;

    return (
        <Paragraph
            content={
                <div className="post-content flex flex-col gap-1 text-lg">
                    <div className="mt-4 flex flex-row items-center gap-3 text-lg">
                        <span className="text-xl font-semibold">{role}</span>
                        <Tags className="h-fit" color={ColorTags.SKY}>
                            <TimeTag divider=" - " value={startDate} />
                            <TimeTag value={endDate} />
                        </Tags>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Responsibilities:</h3>
                    {children}
                </div>
            }
            description={companyLocation}
            image={`/assets/images/${icon}`}
            name={company}
        />
    );
};
