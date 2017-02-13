DROP TABLE IF EXISTS public.materialitempackage;
DROP TABLE IF EXISTS public.packageuser;
DROP TABLE IF EXISTS public.packagechild;
DROP TABLE IF EXISTS public.materialitem;
DROP TABLE IF EXISTS public.package;

CREATE TABLE public.materialitem
(
    "MaterialItemID" UUID,
    "Name" character varying(50) NOT NULL,
    "Description" text,
    "Addon" boolean,
    "Path" character varying(50) NOT NULL,
    "DateAdded" timestamp NOT NULL,
    "DateModified" timestamp NOT NULL,
    CONSTRAINT materialitem_pkey PRIMARY KEY ("MaterialItemID")
);

CREATE TABLE public.package
(
    "PackageID" UUID,
    "Name" character varying(50) NOT NULL,
    "Description" text,
    "Price" money NOT NULL,
    "Public" boolean,
    "DateAdded" timestamp NOT NULL,
    "DateModified" timestamp NOT NULL,
    CONSTRAINT package_pkey PRIMARY KEY ("PackageID")
);

CREATE TABLE public.materialitempackage
(
    "MaterialItemPackageID" UUID,
    "MaterialItemID" UUID REFERENCES public.materialitem("MaterialItemID"),
    "PackageID" UUID REFERENCES public.package("PackageID"),
    "DateAdded" timestamp NOT NULL,
    CONSTRAINT materialitempackage_pkey PRIMARY KEY ("MaterialItemPackageID")
);

CREATE TABLE public.packageuser
(
    "PackageUserID" UUID,
    "PackageID" UUID REFERENCES public.package("PackageID"),
    "UserID" UUID REFERENCES public.users("UserID"),
    "DateAdded" timestamp NOT NULL,
    CONSTRAINT packageuser_pkey PRIMARY KEY ("PackageUserID")
);

--------------------
-- INITIAL DATA!! --
--------------------

INSERT INTO public.materialitem VALUES (
    'f2f4737c-140b-4bd4-aa83-9064bead0eea',
    'Test Item',
    'This is an item that is used to test the materials library system.',
    false,
    '',
    now(),
    now()
);

INSERT INTO public.materialitem values (
    '0b5a4082-7663-491e-bba5-1f1e011dc2e6',
    'Another Test Item',
    'This is another item that is being used to test the things.',
    false,
    '',
    now(),
    now()
);

INSERT INTO public.materialitem values (
    '236d144e-377a-4cc9-8e44-d3485e82c38e',
    'Test add-on item',
    'This is an add-on item for testing how add-ons are going to work.',
    true,
    '',
    now(),
    now()
);

INSERT INTO public.materialitem values (
    'bc10c327-bacc-43e8-b2f0-c01d5b0f51d4',
    'Test Item Plus Hooray',
    'So many test items, I just don''t know how to keep them straight!.',
    false,
    '',
    now(),
    now()
);

INSERT INTO public.package VALUES (
    '8d047aad-a50d-4e21-9777-c840fa281156',
    'Test Package',
    'This is the super cool test package that does not actually do anything!',
    145,
    true,
    now(),
    now()
);

INSERT INTO public.package VALUES (
    '132aed78-04af-4285-9cde-34541c0d6971',
    'Improv+Networking',
    'Network with the best.',
    225,
    true,
    now(),
    now()
);

INSERT INTO public.package VALUES (
    '6eb0e16b-f1c0-40b5-a842-9ed0be8f211b',
    'Improv+Leadership',
    'Explore Leadership in a whole new way.',
    50,
    true,
    now(),
    now()
);

-- Test Item into Test Package
INSERT INTO public.materialitempackage VALUES (
    '3574ef1b-4f6e-46fe-88ea-094a404c22d7',
    'f2f4737c-140b-4bd4-aa83-9064bead0eea',
    '8d047aad-a50d-4e21-9777-c840fa281156',
    now()
);

-- Another Test Item into Test Package
INSERT INTO public.materialitempackage VALUES (
    'dd4107df-060e-4158-9bb1-3c0a36be7314',
    '0b5a4082-7663-491e-bba5-1f1e011dc2e6',
    '8d047aad-a50d-4e21-9777-c840fa281156',
    now()
);

-- Test add-on item into Test Package
INSERT INTO public.materialitempackage VALUES (
    'd7bfed2d-bece-4d66-9834-893fe52e3524',
    '236d144e-377a-4cc9-8e44-d3485e82c38e',
    '8d047aad-a50d-4e21-9777-c840fa281156',
    now()
);

-- Test add-on item into Test Package 2
INSERT INTO public.materialitempackage VALUES (
    '82d1ac27-9efb-4423-b0dd-d4f8e2061683',
    '236d144e-377a-4cc9-8e44-d3485e82c38e',
    '132aed78-04af-4285-9cde-34541c0d6971',
    now()
);

-- Hooray item into Test Package 2
INSERT INTO public.materialitempackage VALUES (
    '65ae4524-153e-4373-8796-f0ec027e71fe',
    'bc10c327-bacc-43e8-b2f0-c01d5b0f51d4',
    '132aed78-04af-4285-9cde-34541c0d6971',
    now()
);

-- Assigning Test Package to Shauvon
INSERT INTO public.packageuser VALUES (
    'a07bb8b2-c47e-48e0-9fc8-fc6fe0a5cb4b',
    '8d047aad-a50d-4e21-9777-c840fa281156',
    'c83dfaf0-ceb1-46cf-9c8f-6a2fe771c9f4',
    now()
);

-- Assigning Test Package 2 to Shauvon
INSERT INTO public.packageuser VALUES (
    'bc8a67e1-65c6-49b2-af1e-74be1d824769',
    '132aed78-04af-4285-9cde-34541c0d6971',
    'c83dfaf0-ceb1-46cf-9c8f-6a2fe771c9f4',
    now()
);

-- Assigning Test Package to Kate
INSERT INTO public.packageuser VALUES (
    '6d10e2d6-a88e-41cc-b161-5aa7f63d34bc',
    '8d047aad-a50d-4e21-9777-c840fa281156',
    '3a36cfff-d4d9-4e79-855d-652f3b0cbb6d',
    now()
);