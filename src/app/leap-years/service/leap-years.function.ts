export function isLeapYear(year: number) {
    if (isAnAtypicalLeapYear(year)) {
        return true;
    } else if (isAnAtypicalCommonYear(year)) {
        return false;
    }
    return isTypicalLeapYear(year);

    function isAnAtypicalLeapYear(year: number) {
        return year % 400 === 0;
    }

    function isAnAtypicalCommonYear(year) {
        return year % 100 === 0;
    }

    function isTypicalLeapYear(year: number) {
        return year % 4 === 0;
    }
}
