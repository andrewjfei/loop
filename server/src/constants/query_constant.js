// user queries
const CREATE_USER_QUERY =
    `INSERT INTO "user" (username, first_name, last_name, email, password) VALUES ($username, $firstName, $lastName, $email, $encryptedPassword) RETURNING *`;
const RETRIEVE_ALL_USERS_QUERY =
    `SELECT * FROM "user" as u ORDER BY u.created DESC`;
const RETRIEVE_SINGLE_USER_QUERY = `SELECT * FROM "user" as u WHERE u.id = $id`;
const RETRIEVE_USER_BY_USERNAME_QUERY =
    `SELECT * FROM "user" as u WHERE u.username = $username`;
const RETRIEVE_USER_BY_EMAIL_QUERY =
    `SELECT * FROM "user" as u WHERE u.email = $email`;

// venue queries
const CREATE_VENUE_QUERY =
    `INSERT INTO "venue" (name, description) VALUES ($name, $description) RETURNING *`;
const CREATE_VENUE_WITH_TYPE_QUERY =
    `INSERT INTO "venue" (name, description, type) VALUES ($name, $description, $type) RETURNING *`;
const RETRIEVE_ALL_VENUES_QUERY =
    `SELECT * FROM "venue" as v ORDER BY v.created DESC`;
const RETRIEVE_SINGLE_VENUE_QUERY =
    `SELECT * FROM "venue" as v WHERE v.id = $id`;

export {
    CREATE_USER_QUERY,
    CREATE_VENUE_QUERY,
    CREATE_VENUE_WITH_TYPE_QUERY,
    RETRIEVE_ALL_USERS_QUERY,
    RETRIEVE_ALL_VENUES_QUERY,
    RETRIEVE_SINGLE_USER_QUERY,
    RETRIEVE_SINGLE_VENUE_QUERY,
    RETRIEVE_USER_BY_EMAIL_QUERY,
    RETRIEVE_USER_BY_USERNAME_QUERY,
};
