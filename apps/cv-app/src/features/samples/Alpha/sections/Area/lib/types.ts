import type { Maybe, Nullable } from '@sandbox/types';

export type Measurement = {
    '@_end': string;
    '@_start': string;
    value: string;
};

export type MeasuringChannel = {
    '@_code'?: string;
    '@_name'?: string;
    period?: Array<Measurement>;
};

export type MeasuringPoint = {
    '@_code'?: string;
    '@_name'?: string;
    measuringchannel?: MeasuringChannel[]
};

export type ChannelVariables = [
    string,
    'AP' | 'RP',
    Measurement[]
];

export type ReportVariables = [Nullable<string>, Nullable<string>, MeasuringChannel[]];

export type ChannelTotalVariables = [Maybe<'AP' | 'RP'>, Measurement[]];

export type MeasuringType = 'AP' | 'RP';

export type MeasuringTotal = Record<MeasuringType, number>;

export type PointsList = {
    points: Array<MeasuringPoint>;
    total: MeasuringTotal;
};

export type ChannelTotal = {
    desc: MeasuringType;
    total: number;
};

export type SortPoint = MeasuringChannel | MeasuringPoint;

