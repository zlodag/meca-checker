import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DurationToStringPipe, DurationToPercentOfDayPipe, MillisSinceMidnightPipe } from '../../util/duration.pipe';

@Component({
    moduleId: module.id,
    selector: 'app-progress',
    templateUrl: 'progress.component.html'
})
export class ProgressComponent implements OnChanges {
    constructor(
        // private millisSinceMidnightPipe: MillisSinceMidnightPipe,
    ) {
    }
    private millisSinceMidnight = new MillisSinceMidnightPipe().transform;
    @Input() start: Date;
    @Input() end: Date;
    duration: number;
    workingAtMidnight: boolean;
    startMillisSinceMidnight: number;
    endMillisSinceMidnight: number;
    ngOnChanges(){
        if (this.start && this.end){
            this.duration = this.end.getTime() - this.start.getTime();
            this.startMillisSinceMidnight = this.millisSinceMidnight(this.start);
            this.endMillisSinceMidnight = this.millisSinceMidnight(this.end);
            this.workingAtMidnight = this.startMillisSinceMidnight === 0 || this.endMillisSinceMidnight !== 0 && this.endMillisSinceMidnight < this.startMillisSinceMidnight;
        }
    }

}
