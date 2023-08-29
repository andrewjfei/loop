import { AddUserRequest } from "../models/requests/mod.js";
import { User } from "../models/user.js";

function toAddUserRequest(payload) {
    const { username, firstName, lastName, email, password } = payload;

    // todo: validate if all properties are available

    return new AddUserRequest(username, firstName, lastName, email, password);
}

function toUser(userRow) {
    const {
        id,
        username,
        firstName,
        lastName,
        email,
        created,
        lastUpdated,
        deleted,
    } = userRow;

    return new User(
        id,
        username,
        firstName,
        lastName,
        email,
        created,
        lastUpdated,
        deleted,
    );
}

function toUserArray(userRows) {
    return userRows.map((userRow) => {
        return toUser(userRow);
    });
}

export { toAddUserRequest, toUser, toUserArray };
