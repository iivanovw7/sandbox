import { toArray } from '@sandbox/utils';
import React from 'react';

import { Channel } from './Channel';
import { type MeasuringPoint, sortChannelsByCode } from './lib';

export type MeasuringProps = MeasuringPoint;

export const Measuring = (props: MeasuringProps) => {
    const {
        '@_code': measuringCode = '-',
        '@_name': measuringName = '-',
        measuringchannel
    } = props;

    if (measuringchannel) {
        return (
            <div className="mt-2 flex flex-col pl-6 pt-3">
                <h3 className="text-xl font-semibold">
                    Измерения
                    <span className="ml-2 text-gray-400">[measuring]</span>
                </h3>
                <div className="mt-3">
                    <span className="mt-3 text-gray-400">{'<code>  '}</span>
                    <span>{measuringCode}</span>
                </div>
                <div className="mb-3 mt-1">
                    <span className="mt-3 text-gray-400">{'<name>  '}</span>
                    <span>{measuringName}</span>
                </div>
                <div className="flex flex-col border-l-2 border-gray-700 md:flex-row">
                    {toArray(measuringchannel)
                        .sort(sortChannelsByCode)
                        .map((channel, index) => (
                            <div key={index} className="w-full flex-1 md:w-64">
                                <Channel channel={channel} pointName={measuringName} />
                            </div>
                        ))}
                </div>
            </div>
        );
    }

    return null;
};
