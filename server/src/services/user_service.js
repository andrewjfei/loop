import { UserRepository } from "../repositories/mod.js";

function addUser() {
	return UserRepository.createUser();
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
