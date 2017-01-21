import { Pipe, PipeTransform } from '@angular/core';

const MILLIS_IN_MINUTE = 1000 * 60;
const MILLIS_IN_HOUR = MILLIS_IN_MINUTE * 60;

@Pipe({
    name: 'durationToString'
})
export class DurationToStringPipe implements PipeTransform {
    transform(durationInMillis: number): string {
        const hours = Math.floor(durationInMillis / MILLIS_IN_HOUR);
        const minutes = Math.floor((durationInMillis % MILLIS_IN_HOUR) / MILLIS_IN_MINUTE);
        let str = hours + ' hour';
        if (hours !== 1) {
            str += 's';
        }
        if (minutes) {
            str += ', ' + minutes + ' minute';
            if (minutes !== 1) {
                str += 's';
            }
        }
        return str;
    }
}

@Pipe({
    name: 'durationToPercentOfDay'
})
export class DurationToPercentOfDayPipe implements PipeTransform {
    transform(durationInMillis: number, inverse: boolean = false): string {
        const percent = durationInMillis / 864000;
        return (inverse ? 100 - percent : percent)  + '%';
    }
}

@Pipe({
    name: 'millisSinceMidnight'
})
export class MillisSinceMidnightPipe implements PipeTransform {
    transform(time: Date): number {
        return time.getHours() * MILLIS_IN_HOUR + time.getMinutes() * MILLIS_IN_MINUTE;
    }
}
