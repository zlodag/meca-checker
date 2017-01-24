import { NgModule, LOCALE_ID }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DurationToStringPipe } from './util/duration.pipe';
import { SortedShiftsPipe } from './util/sorted-shifts.pipe';
import { CompliancePipe } from './util/compliance.pipe';
import { ConfigurationService } from './configuration.service';
import { AppComponent }  from './app.component';
import { ShiftListComponent } from './shift/shift-list/shift-list.component';
import { ShiftDetailComponent }  from './shift/shift-detail/shift-detail.component';
import { ProgressComponent }  from './shift/progress/progress.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        NgbModule.forRoot(),
    ],
    declarations: [
        DurationToStringPipe,
        SortedShiftsPipe,
        CompliancePipe,
        AppComponent,
        ShiftListComponent,
        ShiftDetailComponent,
        ProgressComponent,
    ],
    bootstrap: [
        AppComponent,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'en-NZ' },
        ConfigurationService,
    ],
})
export class AppModule { }
