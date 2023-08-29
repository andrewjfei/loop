import {
    assertSpyCall,
    assertSpyCalls,
    returnsNext,
    stub,
  } from "https://deno.land/std@0.200.0/testing/mock.ts";
import { assert, assertEquals } from "https://deno.land/std@0.200.0/testing/asserts.ts";
import { AddUserRequest } from "../../src/models/requests/add_user_request.js";
import { UserService } from "../../src/services/mod.js";
import { UserRepository } from "../../src/repositories/mod.js";
import { CryptographyUtil } from "../../src/utils/mod.js";

Deno.test("test addUser with valid request should return correctly", async () => {
    // given
    const originalRetrieveUserByUsername = UserRepository.retrieveUserByUsername;
    UserRepository.retrieveUserByUsername = () => "Mocked External Data";

    const originalRetrieveUserByEmail = UserRepository.retrieveUserByEmail;
    UserRepository.retrieveUserByEmail = () => "Mocked External Data";

    const originalEncrypt = CryptographyUtil.encrypt;
    CryptographyUtil.encrypt = () => "Encrpyted Password";

    const id = "123"
    const username = "benwilliams";
    const firstName = "Ben";
    const lastName = "Williams";
    const email = "benwilliams@loop.nz";
    const password = "Encrpyted Password";
    const created = "1223";
    const lastUpdated = null;
    const deleted = null;

    const originalCreateUser = UserRepository.createUser;
    UserRepository.createUser = () => {
        id,
        username,
        firstName,
        lastName,
        email,
        password,
        created,
        lastUpdated,
        deleted
    };

    // when
    const user = await UserService.addUser(request);
    console.log(user);

    // then
    // assert(addUserRequest instanceof AddUserRequest);
    // assertEquals(addUserRequest.username, username);
    // assertEquals(addUserRequest.firstName, firstName);
    // assertEquals(addUserRequest.lastName, lastName);
    // assertEquals(addUserRequest.email, email);
    // assertEquals(addUserRequest.password, password);

    UserRepository.retrieveUserByUsername = originalRetrieveUserByUsername;
    UserRepository.retrieveUserByEmail = originalRetrieveUserByEmail;
    CryptographyUtil.encrypt = originalEncrypt;
    UserRepository.createUser = originalCreateUser;
});