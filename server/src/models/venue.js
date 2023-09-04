class Venue {
    id;
    name;
    description;
    capacity;
    type;
    countryCode;
    created;

    constructor(
        id,
        name,
        description,
        capacity,
        type,
        countryCode,
        created,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.capacity = capacity;
        this.type = type;
        this.countryCode = countryCode;
        this.created = created;
    }
}

export { Venue };
