import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1><app-shift></app-shift>`,
})
export class AppComponent  { name = 'Angular'; }
