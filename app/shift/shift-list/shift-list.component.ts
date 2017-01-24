import { Component } from '@angular/core';
import { ConfigurationService } from '../../configuration.service';
import { Shift } from '../shift';

@Component({
    moduleId: module.id,
    selector: 'app-shift-list',
    templateUrl: 'shift-list.component.html'
})
export class ShiftListComponent {
    shifts: Shift[] = [];
    constructor(
        private config: ConfigurationService,
    ) { }
    appendShift(){
        this.shifts.push(new DefaultShift(this.config, this.shifts.length ? this.shifts[this.shifts.length - 1] : null));
    }
}

class DefaultShift implements Shift {
    constructor(
        config: ConfigurationService,
        shiftBefore?: Shift
    ) {
        this.start = new Date();
        if (shiftBefore) {
            this.start.setTime(shiftBefore.end.getTime());
        }
        this.start.setHours(config.shift.start.hour, config.shift.start.minute, 0, 0);
        if (shiftBefore){
            while(this.start < shiftBefore.end || !config.daysWorked[this.start.getDay()]){
                this.start.setDate(this.start.getDate() + 1);
            }
        }
        this.end = new Date(this.start.getTime());
        this.end.setHours(config.shift.end.hour, config.shift.end.minute, 0, 0);
        while(this.end <= this.start){
            this.end.setDate(this.end.getDate() + 1);
        }
    }
    start: Date;
    end: Date;
}
