import { Injectable } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ConfigurationService {
    shift: {
        start: NgbTimeStruct;
        end: NgbTimeStruct;
    } = {
        start: {
            hour: 8,
            minute: 0,
            second: 0,
        },
        end: {
            hour: 16,
            minute: 0,
            second: 0,
        }
    }
}
