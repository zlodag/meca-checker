import { Pipe, PipeTransform } from '@angular/core';
import { Shift } from '../shift/shift';

@Pipe({
    name: 'sortedShifts',
    pure: false,
})
export class SortedShiftsPipe implements PipeTransform {
    transform(shifts: Shift[]): Shift[] {
        return shifts.sort((shiftA, shiftB) => shiftA.start > shiftB.start ? 1 : shiftA.start < shiftB.start ? -1 : 0);
    }
}
