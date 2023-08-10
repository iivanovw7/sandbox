export * from './debounce';

export const randomIntFromInterval = (min: number, max: number) => {
    return (Math.random() * (max - min + 1)) + min;
};

export const getRandom = (min: number, max: number) => {
    return (Math.random() * (max - min)) + min;
};

export const mapRange = (n: number, range1: [number, number], range2: [number, number]) => {
    const [start1, end1] = range1;
    const [start2, end2] = range2;

    return ((n - start1) / ((end1 - start1)) * (end2 - start2)) + start2;
};
