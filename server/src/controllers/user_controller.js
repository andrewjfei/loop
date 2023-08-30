import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { UserService } from "../services/mod.js";
import { ObjectMapperUtil } from "../utils/mod.js";
import { DataResponse } from "../models/responses/mod.js";

async function addUser({ request, response }) {
    const payload = await request.body().value;
    const addUserRequest = ObjectMapperUtil.toAddUserRequest(payload);
    console.log(`currently processing ${addUserRequest}`);

    const newUser = await UserService.addUser(addUserRequest);
    response.body = new DataResponse(newUser);
    response.status = Status.Created;
}

async function fetchAllUsers({ response }) {
    const allUsers = await UserService.fetchAllUsers();
    response.body = new DataResponse(allUsers);
    response.status = Status.OK;
}

async function fetchSingleUser({ params, response }) {
    const userId = params.userId;

    const user = await UserService.fetchSingleUser(userId);
    response.body = new DataResponse(user);
    response.status = Status.OK;
}

function modifyUser({ _request, response }) {
    response.body = UserService.modifyUser();
}

function removeUser({ _request, response }) {
    response.body = UserService.removeUser();
}

export { addUser, fetchAllUsers, fetchSingleUser, modifyUser, removeUser };
