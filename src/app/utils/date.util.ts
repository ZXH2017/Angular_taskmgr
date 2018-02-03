import { isDate, parse, isValid, isFuture, differenceInYears } from 'date-fns';

export const isValidDate = (val: string): boolean => {
    const date = parse(val);
    return isDate(date)
        && isValid(date)
        && !isFuture(date)
        && differenceInYears(Date.now(), date) < 150
}