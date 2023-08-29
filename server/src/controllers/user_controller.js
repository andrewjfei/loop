import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { UserService } from "../services/mod.js";
import { ObjectMapperUtil } from "../utils/mod.js";
import { DataResponse } from "../models/responses/data_response.js";

async function addUser({ request, response }) {
    const payload = await request.body().value;
    const addUserRequest = ObjectMapperUtil.toAddUserRequest(payload);
    console.log(`currently processing ${addUserRequest}`);

    const newUser = await UserService.addUser(addUserRequest);
    response.body = new DataResponse(newUser);
    response.status = Status.Created;
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
