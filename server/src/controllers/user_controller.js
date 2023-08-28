import { UserService } from "../services/mod.js";

function addUser({ request, response }) {
	response.body = UserService.addUser();
}

function fetchAllUsers({ request, response }) {
	response.body = UserService.fetchAllUsers();
}

function fetchSingleUser({ request, response }) {
	response.body = UserService.fetchSingleUser();
}

function modifyUser({ request, response }) {
	response.body = UserService.modifyUser();
}

function removeUser({ request, response }) {
	response.body = UserService.removeUser();
}

export { addUser, fetchAllUsers, fetchSingleUser, modifyUser, removeUser };
