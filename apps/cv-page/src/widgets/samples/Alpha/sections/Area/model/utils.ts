import { type Nullable, getValues, pluck, toArray } from '@/shared';

import { channelMap, unitsMap } from './constants';
import type {
    ChannelTotal,
    ChannelTotalVariables,
    MeasuringChannel,
    MeasuringPoint,
    MeasuringTotal,
    PointsList,
    SortPoint
} from './types';


export const sortChannelsByCode = (pointA: SortPoint, pointB: SortPoint): number => {
    const descA = pointA['@_code'];
    const descB = pointB['@_code'];

    if (descA && descB) {
        return descA < descB
            ? -1
            : 1;
    }

    return 0;
};

export const formatHours = (hours: string): string | undefined => {
    return hours.match(/.{1,2}/g)?.join(':');
};

export const getChannelUnits = (desc: string): string => {
    return unitsMap[desc as keyof typeof unitsMap] || '';
};

export const getChannelName = (pointName = ''): string => {
    for (const [key, value] of Object.entries(channelMap)) {
        if (pointName.includes(key)) {
            return value;
        }
    }

    return '';
};

export const getChannelTotal = (channel: MeasuringChannel): Nullable<ChannelTotal> => {
    const [
        desc,
        period = []
    ] = getValues(
        channel,
        '@_desc',
        'period'
    ) as ChannelTotalVariables;

    if (desc) {
        return {
            desc,
            total: pluck(period, 'value').reduce((prev, curr) => {
                return Number(prev) + Number(curr);
            }, 0)
        };
    }

    return null;
};

export const getMeasuringTotal = (measuringchannel: MeasuringChannel[]): MeasuringTotal => {
    const result: MeasuringTotal = {
        AP: 0,
        RP: 0
    };

    for (const measuringChannel of toArray(measuringchannel)) {
        const calculation = getChannelTotal(measuringChannel);

        if (calculation) {
            const { desc, total } = calculation;

            switch (desc) {
                case 'AP': {
                    result.AP += total;
                    break;
                }
                case 'RP': {
                    result.RP += total;
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

    return result;
};

export const getMeasuring = (measuringpoint: MeasuringPoint[]): PointsList => {
    const result: PointsList = {
        points: [],
        total: {
            AP: 0,
            RP: 0
        }
    };

    for (const measuring of toArray(measuringpoint)) {
        const {
            '@_code': measuringCode,
            '@_name': measuringName,
            measuringchannel
        } = measuring;

        if (measuringCode && measuringName && measuringchannel) {
            const { AP, RP } = getMeasuringTotal(measuringchannel);

            result.points.push({
                '@_code': measuringCode,
                '@_name': measuringName,
                measuringchannel
            });

            result.total.AP += AP;
            result.total.RP += RP;
        }
    }

    return result;
};
