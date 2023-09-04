class Event {
    id;
    name;
    description;
    type;
    cost;
    countryCode;
    recurrencePeriod;
    reminderPeriod;
    startDate;
    startTime;
    duration;
    endDate;
    created;
    venues;
    passes;

    constructor(
        id,
        name,
        description,
        type,
        cost,
        countryCode,
        recurrencePeriod,
        reminderPeriod,
        startDate,
        startTime,
        duration,
        endDate,
        created,
        venues,
        passes,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.cost = cost;
        this.countryCode = countryCode;
        this.recurrencePeriod = recurrencePeriod;
        this.reminderPeriod = reminderPeriod;
        this.startDate = startDate;
        this.startTime = startTime;
        this.duration = duration;
        this.endDate = endDate;
        this.created = created;
        this.venues = venues;
        this.passes = passes;
    }
}

export { Event };
