import { Pipe, PipeTransform } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

const MILLIS_IN_MINUTE = 1000 * 60;
const MILLIS_IN_HOUR = MILLIS_IN_MINUTE * 60;
const MINUTES_IN_DAY = 24 * 60;

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

// @Pipe({
//     name: 'timeToPercentOfDay'
// })
// export class TimeToPercentOfDayPipe implements PipeTransform {
//     transform(time: NgbTimeStruct, inverse: boolean = false): string {
//         const minutesSinceMidnight = time.hour * 60 + time.minute;
//         const percent = minutesSinceMidnight/MINUTES_IN_DAY;
//         return (inverse ? 100 - percent : percent)  + '%';
//     }
// }


@Pipe({
    name: 'minutesToPercentOfDay'
})
export class MinutesToPercentOfDayPipe implements PipeTransform {
    transform(minutesSinceMidnight: number, inverse: boolean = false): string {
        const percent = 100 * minutesSinceMidnight / MINUTES_IN_DAY;
        return (inverse ? 100 - percent : percent)  + '%';
    }
}

@Pipe({
    name: 'minutesSinceMidnight'
})
export class MinutesSinceMidnightPipe implements PipeTransform {
    transform(time: NgbTimeStruct): number {
        return time.hour * 60 + time.minute;
    }
}
