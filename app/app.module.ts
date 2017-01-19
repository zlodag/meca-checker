import { NgModule, LOCALE_ID }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }  from './app.component';
import { ShiftComponent }  from './shift/shift.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        ShiftComponent,
    ],
    bootstrap: [
        AppComponent,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'en-NZ' },
    ],
})
export class AppModule { }
