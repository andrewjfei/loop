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
    type            VENUE_TYPE      NOT NULL        DEFAULT                 'OTHER',
    country_code    COUNTRY_CODE    NOT NULL        DEFAULT                 'NZ',
    created         TIMESTAMP       NOT NULL        DEFAULT         		CURRENT_TIMESTAMP,
    last_updated    TIMESTAMP,
    deleted         TIMESTAMP
);

-- create venue type enum
CREATE TYPE PASS_TYPE AS ENUM ('GROUP', 'CLUB', 'EVENT', 'OTHER');

-- create period enum
CREATE TYPE PERIOD AS ENUM ('1_MONTH', '1_WEEK', '1_DAY', 'NONE');

-- create pass info table
CREATE TABLE IF NOT EXISTS "pass_info" (
    id                  UUID                DEFAULT			uuid_generate_v4()		    PRIMARY KEY,
    name                VARCHAR(30)         NOT NULL,
    description         VARCHAR(255),
    type                PASS_TYPE           NOT NULL        DEFAULT                     'OTHER',
    cost                DECIMAL(6, 2)       NOT NULL        DEFAULT                     0.00,
    recurrence_period   PERIOD              NOT NULL        DEFAULT                     'NONE',
    reminder_period     PERIOD              NOT NULL        DEFAULT                     'NONE',
    start_date          DATE                NOT NULL,
    start_time          TIME                NOT NULL,
    duration            TIME                NOT NULL,
    end_date            DATE,
    created             TIMESTAMP           NOT NULL        DEFAULT         		    CURRENT_TIMESTAMP,
    last_updated        TIMESTAMP,
    deleted             TIMESTAMP
);

-- create pass info has venue table (i.e. venues which can join the pass)
CREATE TABLE IF NOT EXISTS "pass_info_has_venue" (
    id              UUID            DEFAULT			uuid_generate_v4()		        PRIMARY KEY,
    pass_info_id    UUID            NOT NULL        REFERENCES "pass_info"(id),
    venue_id        UUID            NOT NULL        REFERENCES "venue"(id),
    created         TIMESTAMP       NOT NULL        DEFAULT         		        CURRENT_TIMESTAMP,
    last_updated    TIMESTAMP,
    deleted         TIMESTAMP
);

-- create pass table
CREATE TABLE IF NOT EXISTS "pass" (
    id                  UUID            DEFAULT			uuid_generate_v4()		    PRIMARY KEY,
    pass_info_id        UUID            NOT NULL        REFERENCES "pass_info"(id),
    start_timestamp     TIMESTAMP       NOT NULL,
    end_timestamp       TIMESTAMP       NOT NULL,
    created             TIMESTAMP       NOT NULL        DEFAULT         		    CURRENT_TIMESTAMP,
    last_updated        TIMESTAMP,
    deleted             TIMESTAMP
);

-- create pass has venue table (i.e. venue associated to a given pass)
CREATE TABLE IF NOT EXISTS "pass_has_venue" (
    id              UUID            DEFAULT			uuid_generate_v4()		    PRIMARY KEY,
    pass_id         UUID            NOT NULL        REFERENCES "pass"(id),
    venue_id        UUID            NOT NULL        REFERENCES "venue"(id),
    created         TIMESTAMP       NOT NULL        DEFAULT         		    CURRENT_TIMESTAMP,
    last_updated    TIMESTAMP,
    deleted         TIMESTAMP
);

-- create user has pass table
CREATE TABLE IF NOT EXISTS "user_has_pass" (
    id                      UUID            DEFAULT			uuid_generate_v4()		    PRIMARY KEY,
    user_id                 UUID            NOT NULL        REFERENCES "user"(id),
    pass_id                 UUID            NOT NULL        REFERENCES "pass"(id),
    reference_id            VARCHAR(30)     NOT NULL,
    purchased_timestamp     TIMESTAMP       NOT NULL,
    created                 TIMESTAMP       NOT NULL        DEFAULT         		    CURRENT_TIMESTAMP,
    last_updated            TIMESTAMP,
    deleted                 TIMESTAMP
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