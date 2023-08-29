const CREATE_USER_QUERY = `INSERT INTO "user" (username, first_name, last_name, email, password) VALUES ($username, $firstName, $lastName, $email, $encryptedPassword) RETURNING *`;

export { CREATE_USER_QUERY };