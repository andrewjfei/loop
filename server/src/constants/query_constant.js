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
    `INSERT INTO "venue" (name, description, capacity, type) VALUES ($name, $description, $capacity, $type) RETURNING *`;
const RETRIEVE_ALL_VENUES_QUERY =
    `SELECT * FROM "venue" as v ORDER BY v.created DESC`;
const RETRIEVE_SINGLE_VENUE_QUERY =
    `SELECT * FROM "venue" as v WHERE v.id = $id`;

// event queries
const CREATE_EVENT_QUERY =
    `INSERT INTO "event" (name, description, type, cost, recurrence_period, reminder_period, start_date, start_time, duration, end_date) VALUES ($name, $description, $type, $cost, $recurrencePeriod, $reminderPeriod, $startDate, $startTime, $duration, $endDate) RETURNING id, name, description, type, cost, country_code, recurrence_period, reminder_period, CAST(start_date AS TEXT), start_time, duration, CAST(end_date AS TEXT)`;

// event has venue queries
const CREATE_EVENT_HAS_VENUE_QUERY =
    `INSERT INTO "event_has_venue" (event_id, venue_id) VALUES ($eventId, $venueId) RETURNING *`;

// pass queries
const CREATE_PASS_QUERY =
    `INSERT INTO "pass" (event_id, start_timestamp, end_timestamp) VALUES ($eventId, $startTimestamp, $endTimestamp) RETURNING *`;

// pass has venue queries
const CREATE_PASS_HAS_VENUE_QUERY =
    `INSERT INTO "pass_has_venue" (pass_id, venue_id) VALUES ($passId, $venueId) RETURNING *`;

export {
    CREATE_EVENT_HAS_VENUE_QUERY,
    CREATE_EVENT_QUERY,
    CREATE_PASS_HAS_VENUE_QUERY,
    CREATE_PASS_QUERY,
    CREATE_USER_QUERY,
    CREATE_VENUE_QUERY,
    RETRIEVE_ALL_USERS_QUERY,
    RETRIEVE_ALL_VENUES_QUERY,
    RETRIEVE_SINGLE_USER_QUERY,
    RETRIEVE_SINGLE_VENUE_QUERY,
    RETRIEVE_USER_BY_EMAIL_QUERY,
    RETRIEVE_USER_BY_USERNAME_QUERY,
};
