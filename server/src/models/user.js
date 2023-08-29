class User {
    id;
    username;
    firstName;
    lastName;
    email;
    created;
    lastUpdated;
    deleted;

    constructor(
        id,
        username,
        firstName,
        lastName,
        email,
        created,
        lastUpdated,
        deleted,
    ) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.created = created;
        this.lastUpdated = lastUpdated;
        this.deleted = deleted;
    }
}

export { User };
