class Pass {
    id;
    name;
    description;
    type;
    cost;
    startTimestamp;
    endTimestamp;
    created;
    venues;

    constructor(
        id,
        name,
        description,
        type,
        cost,
        startTimestamp,
        endTimestamp,
        created,
        venues,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.cost = cost;
        this.startTimestamp = startTimestamp;
        this.endTimestamp = endTimestamp;
        this.created = created;
        this.venues = venues;
    }
}

export { Pass };
