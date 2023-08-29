class AddUserRequest {
    username;
    firstName;
    lastName;
    email;
    password;

    constructor(username, firstName, lastName, email, password) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    toString() {
        return `[AddUserRequest] { username: ${this.username}, firstName: ${this.firstName}, lastName: ${this.lastName}, email: ${this.email}, password: [Hidden] }`;
    }
}

export { AddUserRequest };