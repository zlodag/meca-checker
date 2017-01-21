import { Component, Input, OnInit } from '@angular/core';
import { NgbTimeStruct, NgbDateStruct, NgbTimepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'app-shift-detail',
    templateUrl: 'shift-detail.component.html',
})
export class ShiftDetailComponent implements OnInit {
    ngOnInit() {
        this.start = new Date();
        this.start.setMilliseconds(0);
        this.start.setSeconds(0);
        this.start.setMinutes(0);
        this.start.setHours(8);
        this.updateEnd();
    }
    millisPerHour = 60 * 60 * 1000;
    duration = 8 * this.millisPerHour;
    start: Date;
    end: Date;
    endTimeUpdated: boolean = false;
    onStartUpdated(start: Date){
        this.start = new Date(start.getTime());
        if (!this.endTimeUpdated || !this.updateDuration()){
            this.updateEnd();
        }
    }
    onEndUpdated(end: Date){
        this.end = new Date(end.getTime());
        this.endTimeUpdated = true;
        if (!this.updateDuration()){
            this.updateStart();
        }
    }
    updateDuration(): boolean {
        const duration = this.end.getTime() - this.start.getTime();
        if (duration <= 0 || duration > (24 * this.millisPerHour)) {
            return false;
        }
        this.duration = duration;
        return true;
    }
    updateEnd(){
        this.end = new Date(this.start.getTime() + this.duration);
    }
    updateStart(){
        this.start = new Date(this.end.getTime() - this.duration);
    }
}

