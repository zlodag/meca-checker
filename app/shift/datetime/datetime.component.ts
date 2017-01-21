import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgbTimeStruct, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'app-datetime',
    templateUrl: 'datetime.component.html',
    styles: [`
         /deep/ ngb-timepicker table {
            margin: auto;
        }
    `],
})
export class DatetimeComponent implements OnChanges {
    @Output() updated = new EventEmitter<Date>();
    @Input() datetime: Date;
    time: NgbTimeStruct;
    date: NgbDateStruct;
    ngOnChanges(changes: SimpleChanges) {
        const change = changes['datetime'];
        if (change) {
            this.time = this.getTimeStruct(change.currentValue);
            this.date = this.getDateStruct(change.currentValue);
        }
    }
    onDomChanged(){
        if (this.date && this.time){
            this.datetime = this.getDate(this.date, this.time);
            this.updated.next(this.datetime);
        } else {
            this.time = this.getTimeStruct(this.datetime);
            this.date = this.getDateStruct(this.datetime);
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
    getDate(dateStruct: NgbDateStruct, timeStruct: NgbTimeStruct) : Date {
        return new Date(dateStruct.year, dateStruct.month - 1, dateStruct.day, timeStruct.hour, timeStruct.minute, 0, 0);
    }
}

