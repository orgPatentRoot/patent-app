CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "user_name" VARCHAR (20) UNIQUE NOT NULL,
    "password" VARCHAR (255) NOT NULL,
    "is_admin" BOOLEAN DEFAULT FALSE,
    "signature_name" VARCHAR(70),
    "registration_number" VARCHAR(10),
    "phone_number" VARCHAR(20),
    "firm_name" VARCHAR(70),
    "uspto_customer_number" VARCHAR(9),
    "deposit_account_number" VARCHAR(9),
    "active" BOOLEAN DEFAULT TRUE
);

CREATE TABLE "application" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user",
    "applicant_name" VARCHAR(60),
    "status" VARCHAR(50),
    "last_checked_date" DATE,
    "status_date" DATE,
    "application_number" VARCHAR(20),
    "title" VARCHAR(100),
    "inventor_name" VARCHAR(60),
    "inactive" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "status" (
    "id" SERIAL PRIMARY KEY,
    "status" VARCHAR(30),
    "color" VARCHAR(10)
);

CREATE TABLE "office_action" (
    "id" SERIAL PRIMARY KEY,
    "application_id" INTEGER REFERENCES "application",
    "uspto_mailing_date" DATE,
    "response_sent_date" DATE,
    "status_id" INTEGER REFERENCES "status"
);

CREATE TABLE "template_type" (
    "id" SERIAL PRIMARY KEY,
    "type" VARCHAR(30)
);

CREATE TABLE "template" (
    "id" SERIAL PRIMARY KEY,
    "template_name" VARCHAR(60),
    "content" VARCHAR(1000),
    "user_id" INTEGER REFERENCES "user"
);

CREATE TABLE "issue" (
    "id" SERIAL PRIMARY KEY,
    "office_action_id" INTEGER REFERENCES "office_action",
    "template_type_id" INTEGER REFERENCES "template_type",
    "claims" VARCHAR(30),
    "template_id" INTEGER REFERENCES "template"
);

CREATE TABLE "field_code" (
    "id" SERIAL PRIMARY KEY,
    "code" VARCHAR(20),
    "description" VARCHAR(100)
);


INSERT INTO "user" ("user_name", "password")
VALUES
('admin', '$2b$10$jGgyR6x7KyoQwowqxJHGlujj2KpUssCzzIjmKIAzJ3itZ8P55MOE.'), --pw admin
('user', '$2b$10$doyOvwDhPKKLO/ZiRKDg0eEPXfoAhf13zFQ5r0vJEE/W76V72TDQK'), --pw user
('user2', '$2b$10$ZKcBbq.B2tDia.2QLWFe7e4nP0CxgkqGfeWh8bN/T3WM4V1TvCrjy'); --pw user2
