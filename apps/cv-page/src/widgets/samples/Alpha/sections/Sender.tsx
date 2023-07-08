import React from 'react';

import { type Nullable, getValues } from '@/shared';

type SenderProps = {
    report?: Nullable<Record<string, string>>;
};

type ReportVariables = Nullable<string>[];

export const Sender = (props: SenderProps) => {
    const { report } = props;

    if (report) {
        const [
            senderName = '-',
            inn = '-',
        ] = getValues(
            report,
            'message.sender.name',
            'message.sender.inn'
        ) as ReportVariables;

        return (
            <div className="mt-6 flex flex-col rounded-sm bg-gray-800 p-6">
                <h3 className="text-xl font-semibold">
                    Отправитель
                    <span className="ml-2 text-gray-400">[sender]</span>
                </h3>
                <div className="mt-3">
                    <span className="mt-3 text-gray-400">{'<name>  '}</span>
                    <span>{senderName}</span>
                </div>
                <div className="mt-1">
                    <span className="mt-3 text-gray-400">{'<inn>  '}</span>
                    <span>{inn}</span>
                </div>
            </div>
        );
    }

    return null;
};
