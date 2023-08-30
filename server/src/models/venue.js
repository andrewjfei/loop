class Venue {
    id;
    name;
    description;
    type;
    countryCode;
    created;
    lastUpdated;
    deleted;

    constructor(
        id,
        name,
        description,
        type,
        countryCode,
        created,
        lastUpdated,
        deleted,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.countryCode = countryCode;
        this.created = created;
        this.lastUpdated = lastUpdated;
        this.deleted = deleted;
    }
}

export { Venue };
