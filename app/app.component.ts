import { Component } from '@angular/core';
import { NgbTimepickerConfig, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app',
  template: `<app-shift-list></app-shift-list>`,
  providers: [
      NgbTimepickerConfig,
      NgbDatepickerConfig,
  ],
})
export class AppComponent {
    constructor(
        timepickerConfig: NgbTimepickerConfig,
        datepickerConfig: NgbDatepickerConfig,
    ){
        timepickerConfig.minuteStep = 5;
        timepickerConfig.meridian = true;
        datepickerConfig.navigation = "arrows";
    }
}
