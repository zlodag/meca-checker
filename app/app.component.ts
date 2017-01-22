import { Component } from '@angular/core';
import { NgbTimepickerConfig, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app',
  template: `<div class="container"><app-shift-list></app-shift-list></div>`,
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
        timepickerConfig.minuteStep = 15;
        datepickerConfig.navigation = "arrows";
    }
}
