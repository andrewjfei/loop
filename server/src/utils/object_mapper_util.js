import { AddUserRequest } from "../models/requests/mod.js";
import { User } from "../models/user.js";

async function toAddUserRequest(request) {
    const payload = await request.body().value;
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
        deleted 
    } = userRow;

    return new User(id, username, firstName, lastName, email, created, lastUpdated, deleted);
}

export { toAddUserRequest, toUser };