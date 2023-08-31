-- install uuid module
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create user table
CREATE TABLE IF NOT EXISTS "user" (
    id              UUID            DEFAULT			    uuid_generate_v4(),
    username        VARCHAR(30)     UNIQUE              NOT NULL,
    first_name      VARCHAR(30)     NOT NULL,
    last_name       VARCHAR(30)     NOT NULL,
    email           VARCHAR(255)    UNIQUE              NOT NULL,
    password        VARCHAR(255)    NOT NULL,
    created         TIMESTAMP       NOT NULL            DEFAULT         		CURRENT_TIMESTAMP,
    last_updated    TIMESTAMP       NOT NULL            DEFAULT         		CURRENT_TIMESTAMP,
    deleted         TIMESTAMP,
    PRIMARY KEY (id)
);

-- create venue type enum
CREATE TYPE VENUE_TYPE AS ENUM ('CLUB', 'OTHER');

-- create country code enum
CREATE TYPE COUNTRY_CODE AS ENUM ('NZ', 'AU');

-- create venue table
CREATE TABLE IF NOT EXISTS "venue" (
    id              UUID            DEFAULT			    uuid_generate_v4(),
    name            VARCHAR(30)     NOT NULL,
    description     VARCHAR(255)    NOT NULL,
    type            VENUE_TYPE      NOT NULL            DEFAULT                 'OTHER',
    country_code    COUNTRY_CODE    NOT NULL            DEFAULT                 'NZ',
    created         TIMESTAMP       NOT NULL            DEFAULT         		CURRENT_TIMESTAMP,
    last_updated    TIMESTAMP       NOT NULL            DEFAULT         		CURRENT_TIMESTAMP,
    deleted         TIMESTAMP,
    PRIMARY KEY (id)
);

-- create venue type enum
CREATE TYPE PASS_TYPE AS ENUM ('GROUP', 'CLUB', 'EVENT', 'OTHER');

-- create period enum
CREATE TYPE PERIOD AS ENUM ('1_MONTH', '1_WEEK', '1_DAY', 'NONE');

-- create pass info table
CREATE TABLE IF NOT EXISTS "pass_info" (
    id                  UUID                DEFAULT		        uuid_generate_v4(),
    name                VARCHAR(30)         NOT NULL,
    description         VARCHAR(255),
    type                PASS_TYPE           NOT NULL            DEFAULT                     'OTHER',
    cost                DECIMAL(6, 2)       NOT NULL            DEFAULT                     0.00,
    recurrence_period   PERIOD              NOT NULL            DEFAULT                     'NONE',
    reminder_period     PERIOD              NOT NULL            DEFAULT                     'NONE',
    start_date          DATE                NOT NULL,
    start_time          TIME                NOT NULL,
    duration            TIME                NOT NULL,
    end_date            DATE,
    created             TIMESTAMP           NOT NULL            DEFAULT         		    CURRENT_TIMESTAMP,
    last_updated        TIMESTAMP           NOT NULL            DEFAULT         		    CURRENT_TIMESTAMP,
    deleted             TIMESTAMP,
    PRIMARY KEY (id)
);

-- create pass info has venue table (i.e. venues which can join the pass)
CREATE TABLE IF NOT EXISTS "pass_info_has_venue" (
    pass_info_id    UUID            NOT NULL        REFERENCES "pass_info"(id),
    venue_id        UUID            NOT NULL        REFERENCES "venue"(id),
    created         TIMESTAMP       NOT NULL        DEFAULT         		        CURRENT_TIMESTAMP,
    deleted         TIMESTAMP,
    PRIMARY KEY (pass_info_id, venue_id)
);

-- create pass table
CREATE TABLE IF NOT EXISTS "pass" (
    id                  UUID            DEFAULT	    uuid_generate_v4(),
    pass_info_id        UUID            NOT NULL    REFERENCES "pass_info"(id),
    start_timestamp     TIMESTAMP       NOT NULL,
    end_timestamp       TIMESTAMP       NOT NULL,
    created             TIMESTAMP       NOT NULL    DEFAULT         		        CURRENT_TIMESTAMP,
    last_updated        TIMESTAMP       NOT NULL    DEFAULT         		        CURRENT_TIMESTAMP,
    deleted             TIMESTAMP,
    PRIMARY KEY (id)
);

-- create pass has venue table (i.e. venue associated to a given pass)
CREATE TABLE IF NOT EXISTS "pass_has_venue" (
    pass_id         UUID            NOT NULL        REFERENCES "pass"(id),
    venue_id        UUID            NOT NULL        REFERENCES "venue"(id),
    created         TIMESTAMP       NOT NULL        DEFAULT         		    CURRENT_TIMESTAMP,
    deleted         TIMESTAMP,
    PRIMARY KEY (pass_id, venue_id)
);

-- create user has pass table
CREATE TABLE IF NOT EXISTS "user_has_pass" (
    user_id                 UUID                NOT NULL        REFERENCES "user"(id),
    pass_id                 UUID                NOT NULL        REFERENCES "pass"(id),
    reference_id            VARCHAR(30)         UNIQUE          NOT NULL,
    purchased_timestamp     TIMESTAMP           NOT NULL,
    created                 TIMESTAMP           NOT NULL        DEFAULT         		    CURRENT_TIMESTAMP,
    deleted                 TIMESTAMP,
    PRIMARY KEY (user_id, pass_id)
);

-- insert default user records
INSERT INTO "user" (id, username, first_name, last_name, email, password) VALUES
('f947bad3-03a6-4064-8dd3-f1e95861ae4a', 'joebloggs', 'Joe', 'Bloggs', 'joebloggs@loop.nz', 'password'),
('b1e0092b-ff8a-4f0b-aa5d-5e441f9fa94a', 'johnsmith', 'John', 'Smith', 'johnsmith@loop.nz', 'password'),
('13e8d0f2-088a-4bab-93b2-f476eb212c14', 'maxjones', 'Max', 'Jones', 'maxjones@loop.nz', 'password'),
('8b275de4-05e0-4c1b-8bd5-ab2a00b2fb28', 'rileykerr', 'Riley', 'Kerr', 'rileykerr@loop.nz', 'password'),
('137ea589-57b0-433a-9430-964b1298894d', 'samchen', 'Sam', 'Chen', 'samchen@loop.nz', 'password');

-- insert default venue records
INSERT INTO "venue" (id, name, description, type) VALUES
('9bc3a68a-30ce-4ed6-b49b-031e8246df22', 'King Club', 'King Club Description.', 'CLUB'),
('c44b2dfe-b97f-4614-8508-43b80e1b7ee2', 'Empire', 'Empire Description.', 'CLUB'),
('dda516ea-bb3d-4c96-b518-3ba10ce24f67', 'Club 101', 'Club 101 Description.', 'CLUB'),
('e8c3c1e6-1fed-4d46-9f56-4385e9075ecf', 'Concave', 'Concave Description.', 'CLUB'),
('54743ac9-bf3d-4ee4-9d5e-b117fdc2e7d7', 'Amazon', 'Amazon Description.', 'CLUB'),
('4b6c651c-3740-4eed-b6a8-e8ec5c09850c', 'Dimension', 'Dimension Description.', 'CLUB'),
('de9ef0b0-6036-4493-9ee2-1be7461e75f0', 'Underground', 'Underground Description.', 'CLUB'),
('75e54882-06a1-469d-9b6d-5f3a9192a0c2', 'Gen Z', 'Gen Z Description.', 'CLUB');

-- insert default pass info records
INSERT INTO "pass_info" (id, name, type, cost, recurrence_period, reminder_period, start_date, start_time, duration, end_date) VALUES
('0e75069e-f99a-4c12-bed0-ab08fbf7dbe0', 'Golden Glow', 'GROUP', 10.00, '1_WEEK', '1_WEEK', '2023-08-28', '20:00:00', '08:00:00', '2034-09-13'),
('a3b838e6-e5ba-4287-98aa-4fafc9066441', 'Prehistoric Times', 'GROUP', 15.00, 'NONE', 'NONE', '2023-08-30', '18:00:00', '10:00:00', '2023-08-30'),
('317659cb-496d-4258-977f-1edf9ff6cfd5', 'Dirty Dancing', 'EVENT', 20.00, 'NONE', 'NONE', '2023-09-05', '20:00:00', '06:00:00', '2023-09-05'),
('4cddcfef-2e48-43d9-98ee-269b95d79875', 'Basic', 'CLUB', 20.00, '1_DAY', 'NONE', '2023-09-05', '20:00:00', '08:00:00', NULL);

-- insert default pass info has venue records
INSERT INTO "pass_info_has_venue" (pass_info_id, venue_id) VALUES
('0e75069e-f99a-4c12-bed0-ab08fbf7dbe0', '9bc3a68a-30ce-4ed6-b49b-031e8246df22'),
('0e75069e-f99a-4c12-bed0-ab08fbf7dbe0', 'c44b2dfe-b97f-4614-8508-43b80e1b7ee2'),
('a3b838e6-e5ba-4287-98aa-4fafc9066441', 'e8c3c1e6-1fed-4d46-9f56-4385e9075ecf'),
('a3b838e6-e5ba-4287-98aa-4fafc9066441', '54743ac9-bf3d-4ee4-9d5e-b117fdc2e7d7'),
('a3b838e6-e5ba-4287-98aa-4fafc9066441', 'de9ef0b0-6036-4493-9ee2-1be7461e75f0'),
('a3b838e6-e5ba-4287-98aa-4fafc9066441', '4b6c651c-3740-4eed-b6a8-e8ec5c09850c'),
('317659cb-496d-4258-977f-1edf9ff6cfd5', 'dda516ea-bb3d-4c96-b518-3ba10ce24f67'),
('4cddcfef-2e48-43d9-98ee-269b95d79875', '75e54882-06a1-469d-9b6d-5f3a9192a0c2');

-- insert default pass records
INSERT INTO "pass" (id, pass_info_id, start_timestamp, end_timestamp) VALUES
('d6dcc8f9-2a28-42a1-90f8-f1317007311d', '0e75069e-f99a-4c12-bed0-ab08fbf7dbe0', '2023-08-28 20:00:00', '2023-08-29 04:00:00'),
('394c5783-66ea-40f2-a787-3f06f62e546b', '0e75069e-f99a-4c12-bed0-ab08fbf7dbe0', '2023-09-04 20:00:00', '2023-09-05 04:00:00'),
('1851ceb1-cbcf-4729-a86d-34a0ca4b8cc5', '0e75069e-f99a-4c12-bed0-ab08fbf7dbe0', '2023-09-11 20:00:00', '2023-09-12 04:00:00'),
('83a3fa3c-f1f1-4ad0-a67d-92962ac75dd1', 'a3b838e6-e5ba-4287-98aa-4fafc9066441', '2023-08-30 18:00:00', '2023-08-31 04:00:00'),
('c8834704-d8ad-4fcd-8d04-457e09c0028f', '317659cb-496d-4258-977f-1edf9ff6cfd5', '2023-09-05 20:00:00', '2023-09-06 02:00:00'),
('628d1145-20c4-4ddf-b280-6c355b7531b5', '4cddcfef-2e48-43d9-98ee-269b95d79875', '2023-09-05 20:00:00', '2023-09-06 04:00:00'),
('d835c048-1f44-4d23-aae6-d9e82742092c', '4cddcfef-2e48-43d9-98ee-269b95d79875', '2023-09-06 20:00:00', '2023-09-07 04:00:00'),
('dbdad00c-c8ae-435b-98e8-ed951f064419', '4cddcfef-2e48-43d9-98ee-269b95d79875', '2023-09-07 20:00:00', '2023-09-08 04:00:00'),
('8a0d66a2-3815-4008-b0ee-429aa0ce8d73', '4cddcfef-2e48-43d9-98ee-269b95d79875', '2023-09-08 20:00:00', '2023-09-09 04:00:00'),
('f46dd165-75ab-4cf6-bbf9-2edbb4a47293', '4cddcfef-2e48-43d9-98ee-269b95d79875', '2023-09-09 20:00:00', '2023-09-10 04:00:00');

-- insert default pass has venue records
INSERT INTO "pass_has_venue" (pass_id, venue_id) VALUES
('d6dcc8f9-2a28-42a1-90f8-f1317007311d', '9bc3a68a-30ce-4ed6-b49b-031e8246df22'),
('d6dcc8f9-2a28-42a1-90f8-f1317007311d', 'c44b2dfe-b97f-4614-8508-43b80e1b7ee2'),
('394c5783-66ea-40f2-a787-3f06f62e546b', '9bc3a68a-30ce-4ed6-b49b-031e8246df22'),
('394c5783-66ea-40f2-a787-3f06f62e546b', 'c44b2dfe-b97f-4614-8508-43b80e1b7ee2'),
('1851ceb1-cbcf-4729-a86d-34a0ca4b8cc5', '9bc3a68a-30ce-4ed6-b49b-031e8246df22'),
('83a3fa3c-f1f1-4ad0-a67d-92962ac75dd1', 'e8c3c1e6-1fed-4d46-9f56-4385e9075ecf'),
('83a3fa3c-f1f1-4ad0-a67d-92962ac75dd1', '54743ac9-bf3d-4ee4-9d5e-b117fdc2e7d7'),
('83a3fa3c-f1f1-4ad0-a67d-92962ac75dd1', '4b6c651c-3740-4eed-b6a8-e8ec5c09850c'),
('83a3fa3c-f1f1-4ad0-a67d-92962ac75dd1', 'de9ef0b0-6036-4493-9ee2-1be7461e75f0'),
('c8834704-d8ad-4fcd-8d04-457e09c0028f', 'dda516ea-bb3d-4c96-b518-3ba10ce24f67'),
('628d1145-20c4-4ddf-b280-6c355b7531b5', '75e54882-06a1-469d-9b6d-5f3a9192a0c2'),
('d835c048-1f44-4d23-aae6-d9e82742092c', '75e54882-06a1-469d-9b6d-5f3a9192a0c2'),
('dbdad00c-c8ae-435b-98e8-ed951f064419', '75e54882-06a1-469d-9b6d-5f3a9192a0c2'),
('8a0d66a2-3815-4008-b0ee-429aa0ce8d73', '75e54882-06a1-469d-9b6d-5f3a9192a0c2'),
('f46dd165-75ab-4cf6-bbf9-2edbb4a47293', '75e54882-06a1-469d-9b6d-5f3a9192a0c2');

-- insert default user has pass records
INSERT INTO "user_has_pass" (user_id, pass_id, reference_id, purchased_timestamp) VALUES
('f947bad3-03a6-4064-8dd3-f1e95861ae4a', 'd6dcc8f9-2a28-42a1-90f8-f1317007311d', 'LP200823000000', '2023-08-20 15:46:12'),
('f947bad3-03a6-4064-8dd3-f1e95861ae4a', '1851ceb1-cbcf-4729-a86d-34a0ca4b8cc5', 'LP020923000000', '2023-09-02 11:29:56'),
('f947bad3-03a6-4064-8dd3-f1e95861ae4a', '83a3fa3c-f1f1-4ad0-a67d-92962ac75dd1', 'LP230823000000', '2023-08-23 18:02:44'),
('f947bad3-03a6-4064-8dd3-f1e95861ae4a', 'c8834704-d8ad-4fcd-8d04-457e09c0028f', 'LP290823000000', '2023-08-29 23:18:07'),
('f947bad3-03a6-4064-8dd3-f1e95861ae4a', 'd835c048-1f44-4d23-aae6-d9e82742092c', 'LP020923000001', '2023-09-02 13:19:12'),
('f947bad3-03a6-4064-8dd3-f1e95861ae4a', '8a0d66a2-3815-4008-b0ee-429aa0ce8d73', 'LP020923000002', '2023-09-02 13:19:12'),
('b1e0092b-ff8a-4f0b-aa5d-5e441f9fa94a', 'd6dcc8f9-2a28-42a1-90f8-f1317007311d', 'LP150823000000', '2023-08-15 17:25:42'),
('b1e0092b-ff8a-4f0b-aa5d-5e441f9fa94a', '83a3fa3c-f1f1-4ad0-a67d-92962ac75dd1', 'LP270823000000', '2023-08-27 08:36:30'),
('13e8d0f2-088a-4bab-93b2-f476eb212c14', '83a3fa3c-f1f1-4ad0-a67d-92962ac75dd1', 'LP300823000000', '2023-08-30 10:05:54'),
('8b275de4-05e0-4c1b-8bd5-ab2a00b2fb28', 'd6dcc8f9-2a28-42a1-90f8-f1317007311d', 'LP180823000000', '2023-08-18 18:25:05'),
('8b275de4-05e0-4c1b-8bd5-ab2a00b2fb28', '83a3fa3c-f1f1-4ad0-a67d-92962ac75dd1', 'LP260823000000', '2023-08-26 12:14:31'),
('8b275de4-05e0-4c1b-8bd5-ab2a00b2fb28', '628d1145-20c4-4ddf-b280-6c355b7531b5', 'LP030923000000', '2023-09-03 19:27:43'),
('8b275de4-05e0-4c1b-8bd5-ab2a00b2fb28', 'd835c048-1f44-4d23-aae6-d9e82742092c', 'LP030923000001', '2023-09-03 19:27:43'),
('8b275de4-05e0-4c1b-8bd5-ab2a00b2fb28', 'dbdad00c-c8ae-435b-98e8-ed951f064419', 'LP030923000002', '2023-09-03 19:27:43'),
('8b275de4-05e0-4c1b-8bd5-ab2a00b2fb28', '8a0d66a2-3815-4008-b0ee-429aa0ce8d73', 'LP030923000003', '2023-09-03 19:27:43'),
('8b275de4-05e0-4c1b-8bd5-ab2a00b2fb28', 'f46dd165-75ab-4cf6-bbf9-2edbb4a47293', 'LP030923000004', '2023-09-03 19:27:43'),
('137ea589-57b0-433a-9430-964b1298894d', '628d1145-20c4-4ddf-b280-6c355b7531b5', 'LP040923000000', '2023-09-04 23:58:27');