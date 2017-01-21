import { NgModule, LOCALE_ID }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }  from './app.component';
import { ShiftListComponent } from './shift/shift-list/shift-list.component';
import { ShiftDetailComponent }  from './shift/shift-detail/shift-detail.component';
import { DatetimeComponent }  from './shift/datetime/datetime.component';
import { ProgressComponent }  from './shift/progress/progress.component';
import { DurationToStringPipe, DurationToPercentOfDayPipe, MillisSinceMidnightPipe } from './util/duration.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        ShiftListComponent,
        ShiftDetailComponent,
        DatetimeComponent,
        ProgressComponent,
        DurationToStringPipe,
        DurationToPercentOfDayPipe,
        MillisSinceMidnightPipe,
    ],
    bootstrap: [
        AppComponent,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'en-NZ' },
    ],
})
export class AppModule { }
