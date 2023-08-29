import { UserRepository } from "../repositories/mod.js";

async function addUser(request) {
    const { username, firstName, lastName, email, password } = request;

    // todo: validate username and email

    // todo: encrypt password
    const encryptedPassword = password;

    return await UserRepository.createUser(username, firstName, lastName, email, encryptedPassword);
}

function fetchAllUsers() {
	return UserRepository.retrieveAllUsers();
}

function fetchSingleUser() {
	return UserRepository.retrieveSingleUser();
}

function modifyUser() {
	return UserRepository.updateUser();
}

function removeUser() {
	return UserRepository.deleteUser();
}

export { addUser, fetchAllUsers, fetchSingleUser, modifyUser, removeUser };
