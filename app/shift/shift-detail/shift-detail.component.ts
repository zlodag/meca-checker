import { Component, OnInit } from '@angular/core';
import { NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { ConfigurationService } from '../../configuration.service';

@Component({
    moduleId: module.id,
    selector: 'app-shift-detail',
    templateUrl: 'shift-detail.component.html',
    styles: [`
         /deep/ ngb-timepicker table {
            margin: auto;
        }
    `],
})
export class ShiftDetailComponent implements OnInit {
    start: NgbTimeStruct;
    end: NgbTimeStruct;
    date: NgbDateStruct;
    startTimestamp: Date;
    endTimestamp: Date;
    constructor(
        private config: ConfigurationService,
    ) { }
    ngOnInit() {
        this.start = this.config.shift.start;
        this.end = this.config.shift.end;
        this.updateTimestamps();
    }
    updateTimestamps(){
        if (!this.date) {
            this.date = this.getDateStruct(new Date());
        }
        if (this.start){
            this.startTimestamp = new Date(this.date.year, this.date.month - 1, this.date.day, this.start.hour, this.start.minute, 0, 0);
        } else {
            this.start = this.getTimeStruct(this.startTimestamp);
        }
        if (this.end) {
            this.endTimestamp = new Date(this.date.year, this.date.month - 1, this.date.day, this.end.hour, this.end.minute, 0, 0);
        } else {
            this.end = this.getTimeStruct(this.endTimestamp);
        }
        while (this.startTimestamp.getTime() >= this.endTimestamp.getTime()){
            this.endTimestamp.setDate(this.endTimestamp.getDate() + 1);
        }
    }
    getTimeStruct(date: Date): NgbTimeStruct {
        return {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        };
    }
    getDateStruct(date: Date): NgbDateStruct {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    }
}
