-- install uuid module
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create user table
CREATE TABLE IF NOT EXISTS "user" (
    id              UUID            DEFAULT			uuid_generate_v4()		PRIMARY KEY,
    username        VARCHAR(30)     UNIQUE          NOT NULL,
    first_name      VARCHAR(30)     NOT NULL,
    last_name       VARCHAR(30)     NOT NULL,
    email           VARCHAR(255)    UNIQUE          NOT NULL,
    password        VARCHAR(255)    NOT NULL,
    created         TIMESTAMP       NOT NULL        DEFAULT         		CURRENT_TIMESTAMP,
    last_updated    TIMESTAMP,
    deleted         TIMESTAMP
);

-- create venue type enum
CREATE TYPE VENUE_TYPE AS ENUM ('CLUB', 'OTHER');

-- create country code enum
CREATE TYPE COUNTRY_CODE AS ENUM ('NZ', 'AU');

-- create venue table
CREATE TABLE IF NOT EXISTS "venue" (
    id              UUID            DEFAULT			uuid_generate_v4()		PRIMARY KEY,
    name            VARCHAR(30)     NOT NULL,
    description     VARCHAR(255)    NOT NULL,
    type            VENUE_TYPE      DEFAULT         'OTHER'                 NOT NULL,
    country_code    COUNTRY_CODE    DEFAULT         'NZ'                    NOT NULL,
    created         TIMESTAMP       NOT NULL        DEFAULT         		CURRENT_TIMESTAMP,
    last_updated    TIMESTAMP,
    deleted         TIMESTAMP
);

-- insert default user records
INSERT INTO "user" (username, first_name, last_name, email, password) VALUES
('joebloggs', 'Joe', 'Bloggs', 'joebloggs@loop.nz', 'password'),
('johnsmith', 'John', 'Smith', 'johnsmith@loop.nz', 'password'),
('maxjones', 'Max', 'Jones', 'maxjones@loop.nz', 'password');

-- insert default venue records
INSERT INTO "venue" (name, description, type) VALUES
('King Club', 'King Club Description.', 'CLUB'),
('Empire', 'Empire Description.', 'CLUB'),
('Club 101', 'Club 101 Description.', 'CLUB'),
('Concave', 'Concave Description.', 'CLUB');