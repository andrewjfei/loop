import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { ErrorCode } from "../enums/mod.js";
import { LOOPServerError } from "../errors/loop_server_error.js";
import { UserRepository } from "../repositories/mod.js";
import { CommonUtil, CryptographyUtil } from "../utils/mod.js";

async function addUser(request) {
    const { username, firstName, lastName, email, password } = request;

    // validate username
    await validateUsername(username);

    // validate email
    await validateEmail(email);

    // encrypt password
    const encryptedPassword = await CryptographyUtil.encrypt(password);

    return await UserRepository.createUser(
        username,
        firstName,
        lastName,
        email,
        encryptedPassword,
    );
}

async function fetchAllUsers() {
    return await UserRepository.retrieveAllUsers();
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

async function validateUsername(username) {
    const user = await UserRepository.retrieveUserByUsername(username);

    if (CommonUtil.isPresent(user)) {
        throw new LOOPServerError(
            Status.BadRequest,
            ErrorCode.UNAVAILABLE_ERROR_CODE,
            `User with username '${username}' already exists.`,
        );
    }
}

async function validateEmail(email) {
    const user = await UserRepository.retrieveUserByEmail(email);

    if (CommonUtil.isPresent(user)) {
        throw new LOOPServerError(
            Status.BadRequest,
            ErrorCode.UNAVAILABLE_ERROR_CODE,
            `User with email '${email}' already exists.`,
        );
    }
}

export { addUser, fetchAllUsers, fetchSingleUser, modifyUser, removeUser };
