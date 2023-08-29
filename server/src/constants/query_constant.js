const CREATE_USER_QUERY =
    `INSERT INTO "user" (username, first_name, last_name, email, password) VALUES ($username, $firstName, $lastName, $email, $encryptedPassword) RETURNING *`;
const RETRIEVE_USER_BY_USERNAME_QUERY =
    `SELECT * FROM "user" as u WHERE u.username = $username`;
const RETRIEVE_USER_BY_EMAIL_QUERY =
    `SELECT * FROM "user" as u WHERE u.email = $email`;

export {
    CREATE_USER_QUERY,
    RETRIEVE_USER_BY_EMAIL_QUERY,
    RETRIEVE_USER_BY_USERNAME_QUERY,
};
