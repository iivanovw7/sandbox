import { intlFormat } from 'date-fns';

export const getDateString = (date: Date = new Date()): string => {
    try {
        return intlFormat(date, {
            day: 'numeric',
            month: 'long',
            weekday: 'long',
            year: 'numeric',
        }, {
            locale: 'ru-RU',
        });
    }
    catch (errorData: unknown) {
        return '';
    }
};
