const CREATE_USER_QUERY =
    `INSERT INTO "user" (username, first_name, last_name, email, password) VALUES ($username, $firstName, $lastName, $email, $encryptedPassword) RETURNING *`;
const RETRIEVE_ALL_USERS_QUERY =
    `SELECT * FROM "user" as u ORDER BY u.created DESC`;
const RETRIEVE_SINGLE_USER_QUERY =
    `SELECT * FROM "user" as u WHERE u.id = $id`;
const RETRIEVE_USER_BY_USERNAME_QUERY =
    `SELECT * FROM "user" as u WHERE u.username = $username`;
const RETRIEVE_USER_BY_EMAIL_QUERY =
    `SELECT * FROM "user" as u WHERE u.email = $email`;

export {
    CREATE_USER_QUERY,
    RETRIEVE_ALL_USERS_QUERY,
    RETRIEVE_SINGLE_USER_QUERY,
    RETRIEVE_USER_BY_EMAIL_QUERY,
    RETRIEVE_USER_BY_USERNAME_QUERY,
};
