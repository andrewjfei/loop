import {
    assert,
    assertEquals,
} from "https://deno.land/std@0.200.0/testing/asserts.ts";
import { ObjectMapperUtil } from "../../src/utils/mod.js";
import { AddUserRequest } from "../../src/models/requests/add_user_request.js";

Deno.test("test toAddUserRequest with valid payload should return correctly", () => {
    // given
    const username = "benwilliams";
    const firstName = "Ben";
    const lastName = "Williams";
    const email = "benwilliams@loop.nz";
    const password = "password";

    const payload = {
        username,
        firstName,
        lastName,
        email,
        password,
    };

    // when
    const addUserRequest = ObjectMapperUtil.toAddUserRequest(payload);

    // then
    assert(addUserRequest instanceof AddUserRequest);
    assertEquals(addUserRequest.username, username);
    assertEquals(addUserRequest.firstName, firstName);
    assertEquals(addUserRequest.lastName, lastName);
    assertEquals(addUserRequest.email, email);
    assertEquals(addUserRequest.password, password);
});
