DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.permissionkey;
DROP TABLE IF EXISTS public.userlevel;
DROP TABLE IF EXISTS public.permissionkeyuserlevel;

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE public.users
(
    "UserID" UUID,
    "Email" citext UNIQUE,
    "Password" character(60),
    "FirstName" character varying(50) NOT NULL,
    "LastName" character varying(50) NOT NULL,
    "Title" character varying(50),
    "Company" character varying(50),
    "Phone" character varying(20),
    "Address" character varying(50),
    "City" character varying(50),
    "State" character(2),
    "Zip" character varying(10),
    "Country" character varying(50),
    "ImprovExp" integer,
    "FacilitationExp" integer,
    "TrainingInterest" boolean DEFAULT true,
    "URL" character varying(50),
    "DateAdded" timestamp NOT NULL,
    "DateModified" timestamp NOT NULL,
    "Locked" boolean DEFAULT false,
    "RoleID" integer,
    "Description" text,
    "Permissions" JSON,
    CONSTRAINT user_pkey PRIMARY KEY ("UserID")
);

ALTER TABLE public.users
    OWNER to postgres;

INSERT INTO public.users VALUES (
    'c83dfaf0-ceb1-46cf-9c8f-6a2fe771c9f4',
    'smcgill@denyconformity.com',
    '$2a$06$x9aw9n3olqftzKOlnwfW/.OKGjFQvCCVxZt2V4nmJ5uD8rPxY3ziW',
    'Shauvon',
    'McGill',
    'Founder',
    'ImprovPlus',
    '(312) 554-5215',
    '543 E. Barbee Ave',
    'Louisville',
    'KY',
    '40217',
    'United States',
    5,
    1,
    true,
    'http://www.denyconformity.com',
    '2014-12-01 12:06:35.098',
    '2017-02-06 12:06:35.098',
    false,
    19,
    'A super cool dude.'
);

INSERT INTO public.users VALUES (
    'e4448afb-2aff-4a40-a3c7-047a28777ec6',
    'testly@mctestingtons.com',
    '$2a$06$6lF2qnoJavJwJ/YLltJPue0v9VeP9fDluVA7QTGrqQ.iQTuyLuW1i', -- password
    'Testly',
    'McTestington',
    'Tester',
    'McTestingtons',
    '',
    '1234 Fake St.',
    'Chicago',
    'IL',
    '60606',
    'United States',
    1,
    1,
    false,
    'http://www.google.com',
    '2017-02-07 14:38:00.000',
    '2017-02-07 14:38:00.000',
    false,
    1,
    'An enigma'
);