import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { ShiftComponent }  from './shift/shift.component';


@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        AppComponent,
        ShiftComponent,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }
