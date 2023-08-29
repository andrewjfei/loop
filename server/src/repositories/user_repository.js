import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { DatabaseConfig } from "../configs/mod.js";
import { QueryConstant } from "../constants/mod.js";
import { ErrorCode } from "../enums/mod.js";
import { LOOPServerError } from "../errors/loop_server_error.js";
import { ObjectMapperUtil } from "../utils/mod.js";

async function createUser(
    username,
    firstName,
    lastName,
    email,
    encryptedPassword,
) {
    try {
        // attempt to create user in postgresql database
        const result = await DatabaseConfig.client.queryObject({
            camelcase: true,
            args: { username, firstName, lastName, email, encryptedPassword },
            text: QueryConstant.CREATE_USER_QUERY,
        });

        console.log("successfully created user in postgresql");
        return ObjectMapperUtil.toUser(result.rows[0]);
    } catch (err) {
        console.log("failed to create user in postgresql");
        throw new LOOPServerError(
            Status.InternalServerError,
            ErrorCode.POSTGRESQL_ERROR_CODE,
            "Failed to create user in PostgreSQL database.",
        );
    }
}

async function retrieveAllUsers() {
    try {
        const result = await DatabaseConfig.client.queryObject({
            camelcase: true,
            text: QueryConstant.RETRIEVE_ALL_USERS_QUERY,
        });

        return ObjectMapperUtil.toUserArray(result.rows);
    } catch (err) {
        throw new LOOPServerError(
            Status.InternalServerError,
            ErrorCode.POSTGRESQL_ERROR_CODE,
            "Failed to retrieve all users in PostgreSQL database.",
        );
    }
}

function retrieveSingleUser() {
    const str = "Retrieved Single User Successfully";
    return str;
}

async function retrieveUserByUsername(username) {
    try {
        const result = await DatabaseConfig.client.queryObject({
            camelcase: true,
            args: { username },
            text: QueryConstant.RETRIEVE_USER_BY_USERNAME_QUERY,
        });

        const rows = result.rows;

        if (rows.length < 1) {
            return null;
        } else if (rows.length > 1) {
            console.error(
                `multiple users returned for unique username '${username}'`,
            );
        }

        return ObjectMapperUtil.toUser(rows[0]);
    } catch (err) {
        console.log("failed to retrieve user by username in postgresql");
        throw new LOOPServerError(
            Status.InternalServerError,
            ErrorCode.POSTGRESQL_ERROR_CODE,
            "Failed to retrieve user by username in PostgreSQL database.",
        );
    }
}

async function retrieveUserByEmail(email) {
    try {
        const result = await DatabaseConfig.client.queryObject({
            camelcase: true,
            args: { email },
            text: QueryConstant.RETRIEVE_USER_BY_EMAIL_QUERY,
        });

        const rows = result.rows;

        if (rows.length < 1) {
            return null;
        } else if (rows.length > 1) {
            console.error(
                `multiple users returned for unique email '${email}'`,
            );
        }

        return ObjectMapperUtil.toUser(rows[0]);
    } catch (err) {
        console.log("failed to retrieve user by email in postgresql");
        throw new LOOPServerError(
            Status.InternalServerError,
            ErrorCode.POSTGRESQL_ERROR_CODE,
            "Failed to retrieve user by email in PostgreSQL database.",
        );
    }
}

function updateUser() {
    const str = "Updated User Successfully";
    return str;
}

function deleteUser() {
    const str = "Deleted User Successfully";
    return str;
}

export {
    createUser,
    deleteUser,
    retrieveAllUsers,
    retrieveSingleUser,
    retrieveUserByEmail,
    retrieveUserByUsername,
    updateUser,
};
