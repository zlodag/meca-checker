declare module jasmine {
    interface Matchers {
        toComplyWithLimitOnHoursPerWeek(): boolean;
        toComplyWithLimitOnHoursPerFortnight(): boolean;
        toComplyWithLimitOnWorkedWeekends(): boolean;
        toComplyWithMinimumRestHours(): boolean;
        toComplyWithMaximumWorkHours(): boolean;
    }
}
