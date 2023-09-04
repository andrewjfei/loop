class Venue {
    id;
    name;
    description;
    type;
    countryCode;
    created;

    constructor(
        id,
        name,
        description,
        type,
        countryCode,
        created,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.countryCode = countryCode;
        this.created = created;
    }
}

export { Venue };
