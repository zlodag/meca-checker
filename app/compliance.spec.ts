/// <reference path="./compliance.matcher.d.ts"/>

import { matchers } from './compliance.matchers';

beforeEach(function(){
    jasmine.addMatchers(matchers);
});

describe('Rostered hours', function(){
    it('cannot exceed 72 hours per week: custom matcher', function(){
        expect([8,8,8,8,8,16,16]).toComplyWithLimitOnHoursPerWeek();
        expect([8,8,8,8,8,16,17]).not.toComplyWithLimitOnHoursPerWeek();
        expect([8,8,8,8,8,16,16,8,8,8,8,8]).toComplyWithLimitOnHoursPerWeek();
        expect([8,8,8,8,8,16,16,8,8,8,8,9]).not.toComplyWithLimitOnHoursPerWeek();
    });
    it('cannot exceed 144 hours per fortnight', function(){
        expect([8,8,8,8,8,16,16,8,8,8,8,8,16,16]).toComplyWithLimitOnHoursPerFortnight();
        expect([8,8,8,8,8,16,16,8,8,8,8,8,16,17]).not.toComplyWithLimitOnHoursPerFortnight();
    });
    it('cannot work more than 1 in 2 weekends', function(){
        expect([8,8,8,8,8,16,16,8,8,8,8,8,0,0,8,8,8,8,8,16,16]).toComplyWithLimitOnWorkedWeekends();
        expect([8,8,8,8,8,16,16,8,8,8,8,8,0,1,8,8,8,8,8,0,0]).not.toComplyWithLimitOnWorkedWeekends();
        expect([8,8,8,8,16,16,8,8,8,8,8,0,0,8,8,8,8,8,16,16,8]).not.toComplyWithLimitOnWorkedWeekends();
        expect([16,8,8,8,8,8,16,16,8,8,8,8,8,0,0,8,8,8,8,8,16]).not.toComplyWithLimitOnWorkedWeekends();
        expect([8,8,8,8,8,0,0,8,8,8,8,8,16,16,8,8,8,8,8,0,0]).toComplyWithLimitOnWorkedWeekends();
        expect([8,8,8,8,8,0,0,8,8,8,8,8,16,16,8,8,8,8,8,1,0]).not.toComplyWithLimitOnWorkedWeekends();
        expect([8,8,8,8,8,0,1,8,8,8,8,8,16,16,8,8,8,8,8,0,0]).not.toComplyWithLimitOnWorkedWeekends();
    });
});

describe('Shift durations and rest periods', function(){
    it('cannot exceed 16 hours per day', function(){
        expect([[8,16],[8,16],[8,16],[16,8],[8,16],[0,24],[0,24]]).toComplyWithMaximumWorkHours();
        expect([[8,16],[8,16],[8,16],[17,8],[8,16],[0,24],[0,24]]).not.toComplyWithMaximumWorkHours();
        expect([[8,16],[8,16],[8,16],[16,7],[8,16],[0,24],[0,24]]).toComplyWithMaximumWorkHours();

    });
    it('must have at least 8 hours between rostered shifts', function(){
        expect([[8,16],[8,16],[8,16],[16,8],[8,16],[0,24],[0,24]]).toComplyWithMinimumRestHours();
        expect([[8,16],[8,16],[8,16],[17,8],[8,16],[0,24],[0,24]]).toComplyWithMinimumRestHours();
        expect([[8,16],[8,16],[8,16],[16,7],[8,16],[0,24],[0,24]]).not.toComplyWithMinimumRestHours();
    });
});

describe('Test hospital rosters', function(){
    let hoursPerDayStartingMonday : number[];
    let workAndRest: [number, number][];
    beforeEach(function(){
        hoursPerDayStartingMonday = undefined;
        workAndRest = undefined;
    });
    afterEach(function(){
        expect(hoursPerDayStartingMonday).toBeDefined();
        expect(hoursPerDayStartingMonday).toComplyWithLimitOnHoursPerWeek();
        expect(hoursPerDayStartingMonday).toComplyWithLimitOnHoursPerFortnight();
        expect(hoursPerDayStartingMonday).toComplyWithLimitOnWorkedWeekends();
        expect(workAndRest).toComplyWithMaximumWorkHours();
        expect(workAndRest).toComplyWithMinimumRestHours();
    });
    it('Sample hospital roster', function(){
        hoursPerDayStartingMonday = [
            8.5, //M
            8.5, //T
            8.5, //W
            8.5, //Th
            8.5, //F
            0, //Sa
            0, //Su
            0, //M
            15, //T
            8, //W        
            8, //Th        
            8, //Fr
            15, //Sa
            8, //Su
        ];
        workAndRest = [
            [8.5,15.5], //M
            [8.5,15.5], //T
            [8.5,15.5], //W
            [8.5,15.5], //Th
            [8.5,15.5], //F
            [0, 24], //Sa
            [0, 24], //Su
            [0, 24], //M
            [15, 9], //T
            [8, 16], //W        
            [8, 16], //Th        
            [8, 16], //Fr
            [15, 9], //Sa
            [8, 16], //Su
        ];
    });
});
