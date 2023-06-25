import React from 'react';


import { GradientText } from '@/shared/components';
import type { Nullable } from '@/shared/types';
import { pluck, uuid } from '@/shared/utils';
import { getValues } from '@/shared/utils/object';

import { EnergyLabel } from './EnergyLabel';
import type { ChannelVariables, Measurement, MeasuringChannel } from './model/types';
import { formatHours, getChannelName, getChannelUnits } from './model/utils';

export type ChannelProps = {
    channel?: Nullable<MeasuringChannel>;
    pointName?: string;
};

export const Channel = (props: ChannelProps) => {
    const { channel, pointName } = props;

    if (channel) {
        const [
            code = '-',
            desc = '-',
            period = []
        ] = getValues(
            channel,
            '@_code',
            '@_desc',
            'period'
        ) as ChannelVariables;

        const total = pluck(period, 'value').reduce((prev, curr) => {
            return Number(prev) + Number(curr);
        }, 0);

        return (
            <div className="mt-3 flex flex-col pl-6">
                <h3 className="w-full text-xl font-semibold">
                    <span className="mr-2">
                        {getChannelName(pointName)}
                    </span>
                    <span className="text-lg text-gray-400">{`[${code} - ${desc}]`}</span>
                    <GradientText className="float-right text-lg">
                        {`${total} ${getChannelUnits(desc)}`}
                    </GradientText>
                </h3>
                <div className="flex flex-row justify-end">
                    <span><EnergyLabel desc={desc} /></span>
                </div>
                <div className="relative mt-3 max-h-80 overflow-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead
                            className="bg-gray-700 text-xs uppercase text-gray-400"
                        >
                            <tr>
                                <th className="px-4 py-3" scope="col">
                                    #
                                </th>
                                <th className="px-4 py-3" scope="col">
                                    Начало
                                </th>
                                <th className="px-4 py-3" scope="col">
                                    Окончание
                                </th>
                                <th className="px-4 py-3" scope="col">
                                    Значение
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {period.map((measurement: Measurement, index: number) => (
                                <tr key={uuid()} className="border-gray-700 bg-gray-900">
                                    <td className="px-4 py-1">{index}</td>
                                    <td className="px-4 py-1">{formatHours(measurement['@_start'])}</td>
                                    <td className="px-4 py-1">{formatHours(measurement['@_end'])}</td>
                                    <td className="px-4 py-1">{measurement.value}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="text-xs font-semibold text-white">
                                <th className="px-4 py-1 text-base" scope="row">Итог</th>
                                <td className="px-4 py-1">{' '}</td>
                                <td className="px-4 py-1">{' '}</td>
                                <td className="px-4 py-1">{`${total} ${getChannelUnits(desc)}`}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }

    return null;
};
