import { Component } from '@angular/core';
import { ConfigurationService } from '../../configuration.service';

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
        this.shifts.push(new Shift(this.config));
    }
}

class Shift {
    constructor(
        config: ConfigurationService,
        shiftBefore?: Shift,
        shiftAfter?: Shift,
    ) {
        this.start = new Date();
        this.start.setHours(config.shift.start.hour, config.shift.start.minute, 0, 0);
        this.end = new Date();
        this.end.setHours(config.shift.end.hour, config.shift.end.minute, 0, 0);
        while(this.end <= this.start){
            this.end.setDate(this.end.getDate() + 1);
        }
    }
    start: Date;
    end: Date;
}
