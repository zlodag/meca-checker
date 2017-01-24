import { Pipe, PipeTransform } from '@angular/core';
import { Shift } from '../shift/shift';

@Pipe({
    name: 'compliance',
    pure: false,
})
export class CompliancePipe implements PipeTransform {
    transform(shifts: Shift[]): boolean {
        console.log('Checking compliance...');
        return checkHours(7, 72, shifts);
    }
}

function checkHours(periodInDays: number, maxHoursInPeriod: number, shifts: Shift[]): any {
    let totalMillis = 0;
    let shift: Shift;
    let maxDurationPeriodStart = new Date();
    let maxDurationPeriodEnd = new Date();
    let maxDurationWorked = -1;
    let periodStart = new Date();
    let compliant = true;

    for (let i = 0, firstShiftThisPeriod = 0; compliant && i < shifts.length; i++) {

        shift = shifts[i];
        periodStart.setTime(shift.end.getTime());
        periodStart.setDate(periodStart.getDate() - periodInDays);
        console.log('Shift end', shift.end, 'Period start', periodStart);
        totalMillis += shift.end.getTime() - shift.start.getTime();

        while (periodStart.getTime() > shifts[firstShiftThisPeriod].start.getTime()) {

            totalMillis -= shifts[firstShiftThisPeriod].end.getTime() - shifts[firstShiftThisPeriod].start.getTime();
            firstShiftThisPeriod++;
            // if (firstShiftThisPeriod >= i) return false;
        }
        if (totalMillis > maxDurationWorked){
            maxDurationWorked = totalMillis;
            maxDurationPeriodStart.setTime(periodStart.getTime());
            maxDurationPeriodEnd.setTime(shift.end.getTime());
        }
        if (totalMillis > maxHoursInPeriod * 60 * 60 * 1000) {
            compliant = false;
            break;
        }
    }
    console.log({
        compliant: compliant,
        maxDurationPeriodStart: maxDurationPeriodStart,
        maxDurationPeriodEnd: maxDurationPeriodEnd,
        maxDurationWorked: maxDurationWorked,
    });
    return {
        compliant: compliant,
        maxDurationPeriodStart: maxDurationPeriodStart,
        maxDurationPeriodEnd: maxDurationPeriodEnd,
        maxDurationWorked: maxDurationWorked,
    };
}
