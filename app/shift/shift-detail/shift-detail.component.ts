import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
export class ShiftDetailComponent implements OnChanges {

    @Input() start: Date;
    @Output() startChange = new EventEmitter<Date>();
    @Input() end: Date;
    @Output() endChange = new EventEmitter<Date>();
    @Input() startOverlap: boolean;
    @Input() endOverlap: boolean;

    startTime: NgbTimeStruct;
    endTime: NgbTimeStruct;
    startDate: NgbDateStruct;

    ngOnChanges(changes: SimpleChanges) {
        const startChanged = changes['start'];
        if (startChanged){
            this.startDate = this.getDateStruct(startChanged.currentValue);
            this.startTime = this.getTimeStruct(startChanged.currentValue);
            // this.startOverlap = !!this.previousEnd && (startChanged.currentValue.getTime() < this.previousEnd.getTime());
        }
        const endChanged = changes['end'];
        if (endChanged){
            this.endTime = this.getTimeStruct(endChanged.currentValue);
            // this.endOverlap = !!this.nextStart && (endChanged.currentValue.getTime() > this.nextStart.getTime());
        }
    }
    emitNewStart(startDate: NgbDateStruct, startTime: NgbTimeStruct){
        const start = new Date(
            startDate.year,
            startDate.month - 1,
            startDate.day,
            startTime.hour,
            startTime.minute
        );
        this.startChange.next(start);
        const end = new Date(
            startDate.year,
            startDate.month - 1,
            startDate.day,
            this.endTime.hour,
            this.endTime.minute
        );
        while (start >= end){
            end.setDate(end.getDate() + 1);
        }
        if (end.getTime() !== this.end.getTime()){
            this.endChange.next(end);
        }
    }
    emitNewEnd(endTime: NgbTimeStruct){
        const end = new Date(
            this.start.getFullYear(),
            this.start.getMonth(),
            this.start.getDate(),
            endTime.hour,
            endTime.minute
        );
        while (this.start >= end){
            end.setDate(end.getDate() + 1);
        }
        this.endChange.next(end);
    }
    startDateChanged(startDate: NgbDateStruct){
        if (startDate) {
            this.emitNewStart(startDate, this.startTime);
        } else {
            this.startDate = this.getDateStruct(this.start);
        }
    }
    startTimeChanged(startTime: NgbTimeStruct){
        if (startTime) {
            this.emitNewStart(this.startDate, startTime);
        } else {
            this.startTime = this.getTimeStruct(this.start);
        }
    }
    endTimeChanged(endTime: NgbTimeStruct){
        if (endTime) {
            this.emitNewEnd(endTime);
        } else {
            this.endTime = this.getTimeStruct(this.end);
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
