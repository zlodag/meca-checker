/// <reference path="./compliance.matchers.d.ts"/>

import { matchers } from './compliance.matchers';

beforeEach(function(){
    jasmine.addMatchers(matchers);
});
describe('Rostered hours', function(){
    //                                 M, Tu,  W, Th,  F, Sa, Su,  M, Tu,  W, Th,  F, Sa, Su,  M, Tu,  W, Th,  F, Sa, Su
    const compliantRoster          = [ 8,  8,  8,  8,  8, 16, 16,  8,  8,  8,  8,  8,  0,  0,  8,  8,  8,  8,  8, 16, 16];
    const tooManyHoursPerWeek      = [ 8,  8,  8,  8,  8,  0,  0,  8,  8,  8,  8,  8,  0,  0,  8,  8,  9,  8,  8, 16, 16];
    const tooManyHoursPerFortnight = [ 8,  8,  8,  8,  8,  0,  0,  8,  8,  8,  8,  8,  0,  0,  9, 16, 16, 16, 16, 16, 16];
    const tooManyWeekends1         = [ 8,  8,  8,  8,  8,  0,  1,  8,  8,  8,  8,  8,  1,  0,  8,  8,  8,  8,  8,  0,  0];
    const tooManyWeekends2         = [ 8,  8,  8,  8,  8,  0,  0,  8,  8,  8,  8,  8,  1,  0,  8,  8,  8,  8,  8,  0,  1];
    it('cannot exceed 72 hours per week: custom matcher', function(){
        expect(compliantRoster).toComplyWithLimitOnHoursPerWeek();
        expect(tooManyHoursPerWeek).not.toComplyWithLimitOnHoursPerWeek();
        expect(tooManyHoursPerFortnight).not.toComplyWithLimitOnHoursPerWeek();
        expect(tooManyWeekends1).toComplyWithLimitOnHoursPerWeek();
        expect(tooManyWeekends2).toComplyWithLimitOnHoursPerWeek();
    });
    it('cannot exceed 144 hours per fortnight', function(){
        expect(compliantRoster).toComplyWithLimitOnHoursPerFortnight();
        expect(tooManyHoursPerWeek).toComplyWithLimitOnHoursPerFortnight();
        expect(tooManyHoursPerFortnight).not.toComplyWithLimitOnHoursPerFortnight();
        expect(tooManyWeekends1).toComplyWithLimitOnHoursPerFortnight();
        expect(tooManyWeekends2).toComplyWithLimitOnHoursPerFortnight();
    });
    it('cannot work more than 1 in 2 weekends', function(){
        expect(compliantRoster).toComplyWithLimitOnWorkedWeekends();
        expect(tooManyHoursPerWeek).toComplyWithLimitOnWorkedWeekends();
        expect(tooManyHoursPerFortnight).toComplyWithLimitOnWorkedWeekends();
        expect(tooManyWeekends1).not.toComplyWithLimitOnWorkedWeekends();
        expect(tooManyWeekends2).not.toComplyWithLimitOnWorkedWeekends();
    });
});
describe('Shift durations and rest periods', function(){
    const compliantRoster = [[8, 16], [8, 16], [8, 16], [16, 8], [8, 16], [0, 24], [0, 24]];
    const tooMuchWork     = [[8, 16], [8, 16], [8, 16], [17, 8], [8, 16], [0, 24], [0, 24]];
    const notEnoughRest   = [[8, 16], [8, 16], [8, 16], [16, 7], [8, 16], [0, 24], [0, 24]];
    it('cannot exceed 16 hours per day', function(){
        expect(compliantRoster).toComplyWithMaximumWorkHours();
        expect(tooMuchWork).not.toComplyWithMaximumWorkHours();
        expect(notEnoughRest).toComplyWithMaximumWorkHours();
    });
    it('must have at least 8 hours between rostered shifts', function(){
        expect(compliantRoster).toComplyWithMinimumRestHours();
        expect(tooMuchWork).toComplyWithMinimumRestHours();
        expect(notEnoughRest).not.toComplyWithMinimumRestHours();
    });
});
describe('Test hospital rosters', function(){
    let hoursPerDayStartingMonday: number[];
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
            8.5, // M
            8.5, // Tu
            8.5, // W
            8.5, // Th
            8.5, // F
            0,   // Sa
            0,   // Su
            0,   // M
            15,  // Tu
            8,   // W
            8,   // Th
            8,   // F
            15,  // Sa
            8,   // Su
        ];
        workAndRest = [
            [8.5, 15.5], // M
            [8.5, 15.5], // T
            [8.5, 15.5], // W
            [8.5, 15.5], // Th
            [8.5, 15.5], // F
            [0, 24], // Sa
            [0, 24], // Su
            [0, 24], // M
            [15, 9], // T
            [8, 16], // W
            [8, 16], // Th
            [8, 16], // Fr
            [15, 9], // Sa
            [8, 16], // Su
        ];
    });
});
