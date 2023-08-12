import type { Nullable } from '@sandbox/types';
import { parse } from 'date-fns';
import React from 'react';

import { getDateString, getValues } from '@/shared';

type DatetimeProps = {
    report?: Nullable<Record<string, string>>;
};

type ReportVariables = Nullable<string>[];

export const Datetime = (props: DatetimeProps) => {
    const { report = null } = props;

    if (report) {
        const [
            day = null,
            daylightsavingtime = '-',
            timestamp = null,
        ] = getValues(
            report,
            'message.datetime.day',
            'message.datetime.daylightsavingtime',
            'message.datetime.timestamp'
        ) as ReportVariables;

        return (
            <div className="mt-6 flex flex-col rounded-sm bg-gray-800 p-6">
                <h3 className="text-xl font-semibold">
                    Дата
                    <span className="ml-2 text-gray-400">[datetime]</span>
                </h3>
                <div className="mt-3">
                    <span className="text-gray-400">{'<timestamp>  '}</span>
                    <span>
                        {timestamp
                            ? getDateString(parse(timestamp, 'yyyyMMddhhmmss', new Date()))
                            : '-'}
                    </span>
                </div>
                <div className="mt-1">
                    <span className="text-gray-400">{'<day>  '}</span>
                    <span>
                        {day
                            ? getDateString(parse(day, 'yyyyMMdd', new Date()))
                            : '-'}
                    </span>
                </div>
                <div className="mt-1">
                    <span className="text-gray-400">{'<daylightsavingtime>  '}</span>
                    <span>
                        {daylightsavingtime}
                    </span>
                </div>
            </div>
        );
    }

    return null;
};
