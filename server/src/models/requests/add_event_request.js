class AddEventRequest {
    name;
    description;
    type;
    cost;
    recurrencePeriod;
    reminderPeriod;
    startDate;
    startTime;
    duration;
    endDate;
    venues;

    constructor(
        name,
        description,
        type,
        cost,
        recurrencePeriod,
        reminderPeriod,
        startDate,
        startTime,
        duration,
        endDate,
        venues,
    ) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.cost = cost;
        this.recurrencePeriod = recurrencePeriod;
        this.reminderPeriod = reminderPeriod;
        this.startDate = startDate;
        this.startTime = startTime;
        this.duration = duration;
        this.endDate = endDate;
        this.venues = venues;
    }

    toString() {
        return `[AddEventRequest] { name: ${this.name}, description: ${this.description}, type: ${this.type}, cost: ${this.cost}, recurrencePeriod: ${this.recurrencePeriod}, reminderPeriod: ${this.reminderPeriod}, startDate: ${this.startDate}, startTime: ${this.startTime}, duration: ${this.duration}, endDate: ${this.endDate}, venues: ${this.venues} }`;
    }
}

export { AddEventRequest };
