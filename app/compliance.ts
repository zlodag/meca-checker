// export function check16(...hoursPerDay : number[]): boolean {
//     return checkHours(1, 16, ...hoursPerDay);
// }

export function check72(...hoursPerDay : number[]): boolean {
    return checkHours(7, 72, ...hoursPerDay);
}

export function check144(...hoursPerDay : number[]): boolean {
    return checkHours(14, 144, ...hoursPerDay);
}

function checkHours(periodInDays: number, maxHoursInPeriod: number, ...hoursPerDay : number[]): boolean {
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

export function check2(...hoursPerDayStartingMonday : number[]): boolean {
    // let weekendCount = (hoursPerDayStartingMonday.length + 1) / 7;
    // let workedPreviousWeekend = false;

    let lastWeekendWorked : number = null;

    for (let i = 0; i < hoursPerDayStartingMonday.length; i++){
        // console.log((i % 7 > 4) && (hoursPerDayStartingMonday[i] > 0));
        if ((i % 7 > 4) && (hoursPerDayStartingMonday[i] > 0)) {
            const thisWeekend = Math.floor(i / 7);
            if (lastWeekendWorked === thisWeekend - 1){
                return false;
            }
            lastWeekendWorked = thisWeekend;
        }
    }
    // for (let i = 0; i < weekendCount; i++){
    //     for (let j = 5; j < 6; j++){
    //         if (hoursPerDayStartingMonday.length <= 7 * i + j){
    //             return true;
    //         }
    //         let hours = hoursPerDayStartingMonday[7 * i + j];
    //         if (hours > 0) {
    //             workedThisWeekend = true;
    //             if (workedPreviousWeekend) {
    //                 return false;
    //             }
    //         }
    //     }
    //     workedPreviousWeekend = workedThisWeekend;
    //     workedThisWeekend = false;
    // }
    return true;
}

export function check8(...workAndRest: [number, number][]): boolean {
    const minRestHours = 8;
    let work: number, rest: number;
    for (let i = 0; i < workAndRest.length; i++){
        [work, rest] = workAndRest[i];
        if (rest < minRestHours) return false;
    }
    return true;
}

export function check16(...workAndRest: [number, number][]): boolean {
    const maxWorkHours = 16;
    let work: number, rest: number;
    for (let i = 0; i < workAndRest.length; i++){
        [work, rest] = workAndRest[i];
        if (work > maxWorkHours) return false;
    }
    return true;
}

