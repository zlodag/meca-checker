import * as compliance from './compliance';

describe('Rostered hours', function(){
    it('cannot exceed 72 hours per week', function(){
        expect(compliance.check72(8,8,8,8,8,16,16)).toBe(true);
        expect(compliance.check72(8,8,8,8,8,16,17)).toBe(false);
        expect(compliance.check72(8,8,8,8,8,16,16,8,8,8,8,8)).toBe(true);
        expect(compliance.check72(8,8,8,8,8,16,16,8,8,8,8,9)).toBe(false);
    });
    it('cannot exceed 144 hours per fortnight', function(){
        expect(compliance.check144(8,8,8,8,8,16,16,8,8,8,8,8,16,16)).toBe(true);
        expect(compliance.check144(8,8,8,8,8,16,16,8,8,8,8,8,16,17)).toBe(false);
    });
    it('cannot work more than 1 in 2 weekends', function(){
        expect(compliance.check2(8,8,8,8,8,16,16,8,8,8,8,8,0,0,8,8,8,8,8,16,16)).toBe(true);
        expect(compliance.check2(16,8,8,8,8,8,16,16,8,8,8,8,8,0,0,8,8,8,8,8,16)).toBe(false);
        expect(compliance.check2(8,8,8,8,16,16,8,8,8,8,8,0,0,8,8,8,8,8,16,16,8)).toBe(false);
        expect(compliance.check2(8,8,8,8,8,16,16,8,8,8,8,8,0,1,8,8,8,8,8,0,0)).toBe(false);
        expect(compliance.check2(8,8,8,8,8,0,0,8,8,8,8,8,16,16,8,8,8,8,8,0,0)).toBe(true);
        expect(compliance.check2(8,8,8,8,8,0,0,8,8,8,8,8,16,16,8,8,8,8,8,1,0)).toBe(false);
    });
});

describe('Shift durations and rest periods', function(){
    it('cannot exceed 16 hours per day', function(){
        expect(compliance.check16([8,16],[8,16],[8,16],[16,8],[8,16],[0,24],[0,24])).toBe(true);
        expect(compliance.check16([8,16],[8,16],[8,16],[17,8],[8,16],[0,24],[0,24])).toBe(false);
        expect(compliance.check16([8,16],[8,16],[8,16],[16,7],[8,16],[0,24],[0,24])).toBe(true);
    });
    it('must have at least 8 hours between rostered shifts', function(){
        expect(compliance.check8([8,16],[8,16],[8,16],[16,8],[8,16],[0,24],[0,24])).toBe(true);
        expect(compliance.check8([8,16],[8,16],[8,16],[17,8],[8,16],[0,24],[0,24])).toBe(true);
        expect(compliance.check8([8,16],[8,16],[8,16],[16,7],[8,16],[0,24],[0,24])).toBe(false);
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
        expect(compliance.check72(...hoursPerDayStartingMonday)).toBe(true);
        expect(compliance.check144(...hoursPerDayStartingMonday)).toBe(true);
        expect(compliance.check2(...hoursPerDayStartingMonday)).toBe(true);
        expect(workAndRest).toBeDefined();
        expect(compliance.check8(...workAndRest)).toBe(true);
        expect(compliance.check16(...workAndRest)).toBe(true);
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
