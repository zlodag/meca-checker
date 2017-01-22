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
        let str = '';
        if (hours) {
            str += hours + 'h';
        }
        if (minutes) {
            str += minutes + 'm';
        }
        return str;
    }
}
