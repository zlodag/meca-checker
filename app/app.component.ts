import { Component } from '@angular/core';
import { NgbTimepickerConfig, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app',
  template: `<app-shift></app-shift>`,
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
        datepickerConfig.navigation = "arrows";
    }
}
