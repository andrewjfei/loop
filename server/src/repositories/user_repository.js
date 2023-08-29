import { Status } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { DatabaseConfig } from "../configs/mod.js";
import { QueryConstant } from "../constants/mod.js";
import { ErrorCode } from "../enums/mod.js";
import { LOOPServerError } from "../errors/loop_server_error.js";
import { ObjectMapperUtil } from "../utils/mod.js";

async function createUser(username, firstName, lastName, email, encryptedPassword) {
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
			"Failed to create user in PostgreSQL database."
		);
	}
}

function retrieveAllUsers() {
	const str = "Retrieved All Users Successfully";
	return str;
}

function retrieveSingleUser() {
	const str = "Retrieved Single User Successfully";
	return str;
}

function updateUser() {
	const str = "Updated User Successfully";
	return str;
}

function deleteUser() {
	const str = "Deleted User Successfully";
	return str;
}

export { createUser, retrieveAllUsers, retrieveSingleUser, updateUser, deleteUser };
