function check72(hoursPerDay : number[]): boolean {
    return checkHours(7, 72, hoursPerDay);
}

function check144(hoursPerDay : number[]): boolean {
    return checkHours(14, 144, hoursPerDay);
}

function checkHours(periodInDays: number, maxHoursInPeriod: number, hoursPerDay : number[]): boolean {
    let totalHours = 0;
    for (let i = 0; i < hoursPerDay.length; i++){
        totalHours += hoursPerDay[i];
        if (i >= periodInDays) {
            totalHours -= hoursPerDay[i - periodInDays];
        }
        if (totalHours > maxHoursInPeriod) {
            return false;
        }
    }
    return true;
}

function check2(hoursPerDayStartingMonday : number[]): boolean {
    let lastWeekendWorked : number = null;
    for (let i = 0; i < hoursPerDayStartingMonday.length; i++){
        if ((i % 7 > 4) && (hoursPerDayStartingMonday[i] > 0)) {
            const thisWeekend = Math.floor(i / 7);
            if (lastWeekendWorked === thisWeekend - 1){
                return false;
            }
            lastWeekendWorked = thisWeekend;
        }
    }
    return true;
}

function check8(workAndRest: [number, number][]): boolean {
    const minRestHours = 8;
    let work: number, rest: number;
    for (let i = 0; i < workAndRest.length; i++){
        [work, rest] = workAndRest[i];
        if (rest < minRestHours) return false;
    }
    return true;
}

function check16(workAndRest: [number, number][]): boolean {
    const maxWorkHours = 16;
    let work: number, rest: number;
    for (let i = 0; i < workAndRest.length; i++){
        [work, rest] = workAndRest[i];
        if (work > maxWorkHours) return false;
    }
    return true;
}

function getCustomMatcherResult(pass: boolean): jasmine.CustomMatcherResult {
    return {
        pass: pass,
        message: pass ? 'Should not have complied' : 'Should have complied'
    };
}

function getHoursPerDayMatcher(checkFunction: (hoursPerDayStartingMonday : number[]) => boolean): jasmine.CustomMatcher {
    return {
        compare: (hoursPerDayStartingMonday: number[]) => getCustomMatcherResult(checkFunction(hoursPerDayStartingMonday))
    };
}

function getWorkAndRestMatcher(checkFunction: (workAndRest: [number, number][]) => boolean): jasmine.CustomMatcher {
    return {
        compare: (workAndRest: [number, number][]) => getCustomMatcherResult(checkFunction(workAndRest))
    };
}

export const matchers : jasmine.CustomMatcherFactories = {
    toComplyWithLimitOnHoursPerWeek: () => getHoursPerDayMatcher(check72),
    toComplyWithLimitOnHoursPerFortnight: () => getHoursPerDayMatcher(check144),
    toComplyWithLimitOnWorkedWeekends: () => getHoursPerDayMatcher(check2),
    toComplyWithMinimumRestHours: () => getWorkAndRestMatcher(check8),
    toComplyWithMaximumWorkHours: () => getWorkAndRestMatcher(check16)
};
