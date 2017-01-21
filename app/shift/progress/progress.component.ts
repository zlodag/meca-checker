import { Component, Input } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'app-progress',
    templateUrl: 'progress.component.html'
})
export class ProgressComponent {
    @Input() start: NgbTimeStruct;
    @Input() end: NgbTimeStruct;
    workingAtMidnight: boolean;
}
