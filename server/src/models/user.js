class User {
    id;
    username;
    firstName;
    lastName;
    email;
    created;

    constructor(
        id,
        username,
        firstName,
        lastName,
        email,
        created,
    ) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.created = created;
    }
}

export { User };
