import React from 'react';

import { GradientText, type Nullable, getValues, uuid } from '@/shared';

import { EnergyLabel } from './EnergyLabel';
import { Measuring } from './Measuring';
import type { ReportVariables } from './model/types';
import { getChannelUnits, getMeasuring, sortChannelsByCode } from './model/utils';

type AreaProps = {
    report?: Nullable<Record<string, string>>;
};

export const Area = (props: AreaProps) => {
    const { report } = props;

    if (report) {
        const [
            areaName = '-',
            inn = '-',
            measuringpoint
        ] = getValues(
            report,
            'message.area.name',
            'message.area.inn',
            'message.area.measuringpoint'
        ) as ReportVariables;

        const {
            points,
            total
        } = getMeasuring(measuringpoint.sort(sortChannelsByCode));

        return (
            <div className="mt-6 flex flex-col rounded-sm bg-gray-800 p-6">
                <h3 className="text-xl font-semibold">
                    Область
                    <span className="ml-2 text-gray-400">[area]</span>
                </h3>
                <div className="mt-3">
                    <span className="mt-3 text-gray-400">{'<name>  '}</span>
                    <span>{areaName}</span>
                </div>
                <div className="mb-3 mt-1">
                    <span className="mt-3 text-gray-400">{'<inn>  '}</span>
                    <span>{inn}</span>
                </div>
                <div className="mb-3 mt-1 flex flex-row">
                    <GradientText className="float-right mr-4 flex flex-col justify-end text-lg font-semibold">
                        {`${total.AP} ${getChannelUnits('AP')}`}
                        <span className="mt-2 flex justify-end">
                            <EnergyLabel desc="AP" />
                        </span>
                    </GradientText>
                    <GradientText className="float-right flex flex-col justify-end text-lg font-semibold">
                        {`${total.RP} ${getChannelUnits('RP')}`}
                        <span className="mt-2 flex justify-end">
                            <EnergyLabel desc="RP" />
                        </span>
                    </GradientText>
                </div>
                <div className="border-l-2 border-gray-700">
                    {points.map((point) => <Measuring key={uuid()} {...point} />)}
                </div>
            </div>
        );
    }

    return null;
};

