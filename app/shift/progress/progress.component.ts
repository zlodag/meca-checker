import { Component, Input, OnChanges } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-progress',
    templateUrl: 'progress.component.html',
})
export class ProgressComponent implements OnChanges {
    @Input() start: Date;
    @Input() end: Date;
    workingAtMidnight: boolean;
    firstWidth: string;
    secondWidth: string;
    ngOnChanges(){
        this.workingAtMidnight = this.start.getDate() !== this.end.getDate();
        const startPlusADay = new Date(this.start.getTime());
        startPlusADay.setDate(startPlusADay.getDate() + 1);
        const dayLength = startPlusADay.getTime() - this.start.getTime();
        let midnightReference: Date;
        if (this.workingAtMidnight){
            midnightReference = new Date(this.start.getFullYear(), this.start.getMonth(), this.start.getDate() + 1);
            this.firstWidth = 100*(this.end.getTime() - midnightReference.getTime())/dayLength + '%';
            this.secondWidth = 100*(this.start.getTime() - this.end.getTime() + dayLength)/dayLength + '%';            
        } else {
            midnightReference = new Date(this.start.getFullYear(), this.start.getMonth(), this.start.getDate());
            this.firstWidth = 100*(this.start.getTime() - midnightReference.getTime())/dayLength + '%';
            this.secondWidth = 100*(this.end.getTime() - this.start.getTime())/dayLength + '%';
        }
    }
}
