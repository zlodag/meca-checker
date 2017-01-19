import { Component, OnInit } from '@angular/core';
import { NgbTimeStruct, NgbDateStruct, NgbTimepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

const millisPerMinute = 60 * 1000;
const millisPerHour = 60 * millisPerMinute;
const enum Updates {
    start,
    end,
    duration,
}
@Component({
    moduleId: module.id,
    selector: 'app-shift',
    templateUrl: 'shift.component.html'
})
export class ShiftComponent implements OnInit {
    constructor(
    ){}

    ngOnInit() {
        const now = new Date();
        this.startTime = {
            hour: 8,
            minute: 0,
            second: 0
        };
        this.startDate = {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate()
        };
        this.shiftDuration = {
            hour: 8,
            minute: 0,
            second: 0
        };
        this.onStartUpdated();
    }
    shiftDuration: NgbTimeStruct;
    startTime: NgbTimeStruct;
    startDate: NgbDateStruct;
    start: Date;
    endTime: NgbTimeStruct;
    endDate: NgbDateStruct;
    end: Date;
    orderOfUpdates: Updates[] = [Updates.start, Updates.duration, Updates.end];

    onUpdated(justUpdated: Updates): void {
        switch (this.orderOfUpdates.indexOf(justUpdated)) {
            case 0:
                break;
            case 1:
                [
                    this.orderOfUpdates[0],
                    this.orderOfUpdates[1],
                ] = [
                    this.orderOfUpdates[1],
                    this.orderOfUpdates[0],
                ];
                break;
            case 2:
                [
                    this.orderOfUpdates[0],
                    this.orderOfUpdates[1],
                    this.orderOfUpdates[2],
                ] = [
                    this.orderOfUpdates[2],
                    this.orderOfUpdates[0],
                    this.orderOfUpdates[1],
                ];
                break;
        }
        switch (this.orderOfUpdates[2]) {
            case Updates.end:
                this.end = new Date(this.start.getTime() + this.getShiftDurationInMillis());
                this.endTime = this.getTimeStruct(this.end);
                this.endDate = this.getDateStruct(this.end);
                break;
            case Updates.start:
                this.start = new Date(this.end.getTime() - this.getShiftDurationInMillis());
                this.startTime = this.getTimeStruct(this.start);
                this.startDate = this.getDateStruct(this.start);
                break;
            case Updates.duration:
                const durationInMillis = this.end.getTime() - this.start.getTime();
                this.shiftDuration = this.getTimeStruct(new Date(durationInMillis));
        }
    }

    onStartUpdated(){
        this.start = this.getDate(this.startDate, this.startTime);
        this.onUpdated(Updates.start);
    }
    onEndUpdated(){
        this.end = this.getDate(this.endDate, this.endTime);
        this.onUpdated(Updates.end);
    }
    onDurationUpdated(){
        this.onUpdated(Updates.duration);
    }
    getShiftDurationInMillis() : number {
        return this.shiftDuration.hour * millisPerHour + this.shiftDuration.minute * millisPerMinute;
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
    getDate(dateStruct: NgbDateStruct, timeStruct: NgbTimeStruct) : Date {
        return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day, timeStruct.hour, timeStruct.minute, 0, 0);
    }
}

