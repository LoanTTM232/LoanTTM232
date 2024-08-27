--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.address (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    unit_id uuid NOT NULL,
    address character varying(255) NOT NULL,
    longitude numeric(10,8) NOT NULL,
    latitude numeric(10,8) NOT NULL,
    location_id uuid NOT NULL
);


ALTER TABLE public.address OWNER TO spb_user;

--
-- Name: club; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.club (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    open_time character varying(5) NOT NULL,
    close_time character varying(5) NOT NULL,
    owner_id uuid NOT NULL
);


ALTER TABLE public.club OWNER TO spb_user;

--
-- Name: club_media; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.club_media (
    club_id uuid DEFAULT gen_random_uuid() NOT NULL,
    media_id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE public.club_media OWNER TO spb_user;

--
-- Name: club_member; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.club_member (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    member_id uuid NOT NULL,
    club_id uuid NOT NULL
);


ALTER TABLE public.club_member OWNER TO spb_user;

--
-- Name: club_payment_infos; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.club_payment_infos (
    club_id uuid DEFAULT gen_random_uuid() NOT NULL,
    payment_info_id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE public.club_payment_infos OWNER TO spb_user;

--
-- Name: club_sporttype; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.club_sporttype (
    club_id uuid DEFAULT gen_random_uuid() NOT NULL,
    sport_type_id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE public.club_sporttype OWNER TO spb_user;

--
-- Name: location; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.location (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    province character varying(50) NOT NULL,
    province_slug character varying(100) NOT NULL,
    city character varying(50) NOT NULL,
    city_slug character varying(100) NOT NULL,
    district character varying(5) NOT NULL,
    district_slug character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.location OWNER TO spb_user;

--
-- Name: media; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.media (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    file_path character varying(255) NOT NULL,
    file_type character varying(255) NOT NULL,
    hash character varying(255) NOT NULL,
    uploaded_at timestamp with time zone NOT NULL
);


ALTER TABLE public.media OWNER TO spb_user;

--
-- Name: metadata; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.metadata (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    key character varying(255) NOT NULL,
    value text NOT NULL,
    description text
);


ALTER TABLE public.metadata OWNER TO spb_user;

--
-- Name: notification; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.notification (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    additional_data text,
    status smallint,
    notification_type_id uuid NOT NULL,
    sender_id uuid NOT NULL,
    receiver_id uuid NOT NULL,
    read_at timestamp with time zone
);


ALTER TABLE public.notification OWNER TO spb_user;

--
-- Name: notification_type; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.notification_type (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name character varying(255) NOT NULL,
    template text NOT NULL,
    description text
);


ALTER TABLE public.notification_type OWNER TO spb_user;

--
-- Name: order; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public."order" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    total_amount numeric(12,2),
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    status smallint NOT NULL,
    is_approved boolean DEFAULT false NOT NULL,
    approve_owner_id uuid,
    is_paid boolean DEFAULT false NOT NULL,
    tax numeric(5,2) DEFAULT 0 NOT NULL,
    discount numeric(5,2) DEFAULT 0 NOT NULL,
    evident_id uuid,
    unit_id uuid NOT NULL
);


ALTER TABLE public."order" OWNER TO spb_user;

--
-- Name: payment_info; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.payment_info (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    q_rcode text NOT NULL,
    user_name text NOT NULL,
    bank_name text NOT NULL
);


ALTER TABLE public.payment_info OWNER TO spb_user;

--
-- Name: payment_method; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.payment_method (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    method_type smallint,
    provider_id text,
    is_default boolean DEFAULT false
);


ALTER TABLE public.payment_method OWNER TO spb_user;

--
-- Name: payments; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.payments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    amount numeric(12,2),
    payment_status smallint NOT NULL,
    currency character varying(10) NOT NULL,
    payment_method_id uuid NOT NULL,
    order_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.payments OWNER TO spb_user;

--
-- Name: permission; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.permission (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name character varying(25) NOT NULL
);


ALTER TABLE public.permission OWNER TO spb_user;

--
-- Name: role; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.role (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name character varying(10) NOT NULL,
    description character varying(255),
    parent_id uuid
);


ALTER TABLE public.role OWNER TO spb_user;

--
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.role_permissions (
    role_id uuid DEFAULT gen_random_uuid() NOT NULL,
    permission_id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE public.role_permissions OWNER TO spb_user;

--
-- Name: sport_type; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.sport_type (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name character varying(255) NOT NULL
);


ALTER TABLE public.sport_type OWNER TO spb_user;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.transactions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    transaction_status character varying(20) NOT NULL,
    amount numeric(12,2),
    currency character varying(10) NOT NULL,
    response_code character varying(20),
    response_message text,
    gateway_id character varying(255),
    payments_id uuid NOT NULL
);


ALTER TABLE public.transactions OWNER TO spb_user;

--
-- Name: unit; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.unit (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name character varying(255) NOT NULL,
    open_time character varying(5) NOT NULL,
    close_time character varying(5) NOT NULL,
    phone character varying(25) NOT NULL,
    description text,
    status smallint NOT NULL,
    club_id uuid NOT NULL
);


ALTER TABLE public.unit OWNER TO spb_user;

--
-- Name: unit_media; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.unit_media (
    unit_id uuid DEFAULT gen_random_uuid() NOT NULL,
    media_id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE public.unit_media OWNER TO spb_user;

--
-- Name: unit_price; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.unit_price (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    price numeric(12,2),
    unit_id uuid NOT NULL,
    start_time character varying(5) NOT NULL,
    end_time character varying(5) NOT NULL
);


ALTER TABLE public.unit_price OWNER TO spb_user;

--
-- Name: unit_service; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.unit_service (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name character varying(255) NOT NULL,
    icon character varying(255),
    price numeric(12,2),
    description text,
    status smallint NOT NULL,
    unit_id uuid NOT NULL
);


ALTER TABLE public.unit_service OWNER TO spb_user;

--
-- Name: unit_sporttype; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.unit_sporttype (
    unit_id uuid DEFAULT gen_random_uuid() NOT NULL,
    sport_type_id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE public.unit_sporttype OWNER TO spb_user;

--
-- Name: user; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public."user" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    full_name character varying(255),
    phone character varying(25),
    is_email_verified boolean NOT NULL,
    role_id uuid NOT NULL
);


ALTER TABLE public."user" OWNER TO spb_user;

--
-- Name: webhooks; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.webhooks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    event_type character varying(20) NOT NULL,
    payload text,
    processed boolean DEFAULT false,
    received_at timestamp with time zone NOT NULL
);


ALTER TABLE public.webhooks OWNER TO spb_user;

--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.address (id, created_at, updated_at, deleted_at, unit_id, address, longitude, latitude, location_id) FROM stdin;
\.


--
-- Data for Name: club; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.club (id, created_at, updated_at, deleted_at, name, slug, open_time, close_time, owner_id) FROM stdin;
\.


--
-- Data for Name: club_media; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.club_media (club_id, media_id) FROM stdin;
\.


--
-- Data for Name: club_member; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.club_member (id, created_at, updated_at, deleted_at, member_id, club_id) FROM stdin;
\.


--
-- Data for Name: club_payment_infos; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.club_payment_infos (club_id, payment_info_id) FROM stdin;
\.


--
-- Data for Name: club_sporttype; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.club_sporttype (club_id, sport_type_id) FROM stdin;
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.location (id, created_at, updated_at, deleted_at, province, province_slug, city, city_slug, district, district_slug, description) FROM stdin;
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.media (id, created_at, updated_at, deleted_at, file_path, file_type, hash, uploaded_at) FROM stdin;
\.


--
-- Data for Name: metadata; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.metadata (id, created_at, updated_at, deleted_at, key, value, description) FROM stdin;
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.notification (id, created_at, updated_at, deleted_at, additional_data, status, notification_type_id, sender_id, receiver_id, read_at) FROM stdin;
\.


--
-- Data for Name: notification_type; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.notification_type (id, created_at, updated_at, deleted_at, name, template, description) FROM stdin;
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public."order" (id, created_at, updated_at, deleted_at, total_amount, start_time, end_time, status, is_approved, approve_owner_id, is_paid, tax, discount, evident_id, unit_id) FROM stdin;
\.


--
-- Data for Name: payment_info; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.payment_info (id, created_at, updated_at, deleted_at, q_rcode, user_name, bank_name) FROM stdin;
\.


--
-- Data for Name: payment_method; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.payment_method (id, created_at, updated_at, deleted_at, method_type, provider_id, is_default) FROM stdin;
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.payments (id, created_at, updated_at, deleted_at, amount, payment_status, currency, payment_method_id, order_id, user_id) FROM stdin;
\.


--
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.permission (id, created_at, updated_at, deleted_at, name) FROM stdin;
cb6541f1-a32b-42aa-a6b2-1e84024fa076	2024-08-27 08:34:59.683164+00	2024-08-27 08:34:59.683164+00	\N	create_user
728b7199-8d4b-4a2d-bd97-7b53f284091c	2024-08-27 08:34:59.683164+00	2024-08-27 08:34:59.683164+00	\N	update_user
3008638a-ea1c-4be3-9d24-1b2ebd578bc0	2024-08-27 08:34:59.683164+00	2024-08-27 08:34:59.683164+00	\N	delete_user
1683cbe9-8076-40da-8210-624a600e340d	2024-08-27 08:34:59.683164+00	2024-08-27 08:34:59.683164+00	\N	read_user
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.role (id, created_at, updated_at, deleted_at, name, description, parent_id) FROM stdin;
cc203bb9-7b33-4391-8917-0089588356f2	2024-08-27 08:34:59.687556+00	2024-08-27 08:34:59.687556+00	\N	admin	\N	\N
6c8647dc-091f-4249-b9f7-12bed594d124	2024-08-27 08:34:59.687556+00	2024-08-27 08:34:59.687556+00	\N	client	\N	cc203bb9-7b33-4391-8917-0089588356f2
9666740a-4ff5-4d22-830f-ab3361ba5ef4	2024-08-27 08:34:59.687556+00	2024-08-27 08:34:59.687556+00	\N	user	\N	6c8647dc-091f-4249-b9f7-12bed594d124
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.role_permissions (role_id, permission_id) FROM stdin;
cc203bb9-7b33-4391-8917-0089588356f2	cb6541f1-a32b-42aa-a6b2-1e84024fa076
cc203bb9-7b33-4391-8917-0089588356f2	728b7199-8d4b-4a2d-bd97-7b53f284091c
cc203bb9-7b33-4391-8917-0089588356f2	3008638a-ea1c-4be3-9d24-1b2ebd578bc0
cc203bb9-7b33-4391-8917-0089588356f2	1683cbe9-8076-40da-8210-624a600e340d
6c8647dc-091f-4249-b9f7-12bed594d124	1683cbe9-8076-40da-8210-624a600e340d
\.


--
-- Data for Name: sport_type; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.sport_type (id, created_at, updated_at, deleted_at, name) FROM stdin;
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.transactions (id, created_at, updated_at, deleted_at, transaction_status, amount, currency, response_code, response_message, gateway_id, payments_id) FROM stdin;
\.


--
-- Data for Name: unit; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.unit (id, created_at, updated_at, deleted_at, name, open_time, close_time, phone, description, status, club_id) FROM stdin;
\.


--
-- Data for Name: unit_media; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.unit_media (unit_id, media_id) FROM stdin;
\.


--
-- Data for Name: unit_price; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.unit_price (id, created_at, updated_at, deleted_at, price, unit_id, start_time, end_time) FROM stdin;
\.


--
-- Data for Name: unit_service; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.unit_service (id, created_at, updated_at, deleted_at, name, icon, price, description, status, unit_id) FROM stdin;
\.


--
-- Data for Name: unit_sporttype; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.unit_sporttype (unit_id, sport_type_id) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public."user" (id, created_at, updated_at, deleted_at, email, password, full_name, phone, is_email_verified, role_id) FROM stdin;
78574593-757c-49bc-aad1-3a8dd5c03970	2024-08-27 04:37:42.405602+00	2024-08-27 04:37:42.405602+00	\N	admin@gmail.com	$2a$10$nCvN3CAF4b1mMuramtpSre8Dx7fsBf4FoRG2btotNKvbLftZPKbqu	\N	\N	t	cc203bb9-7b33-4391-8917-0089588356f2
6bb9e18d-69e7-4dd3-bf7a-7b9ee15b3aeb	2024-08-27 06:42:39.84702+00	2024-08-27 06:42:39.84702+00	\N	client@gmail.com	$2a$10$A20KBHwJ8dpuL951mY23P.D0gV6kek73rKqspLgAm2sfkCe7HgbFm	\N	\N	t	6c8647dc-091f-4249-b9f7-12bed594d124
c5e7a0dd-d311-40ae-bbe7-1c1ec26e3be6	2024-08-27 08:41:52.124246+00	2024-08-27 08:41:52.124246+00	\N	client1@gmail.com	$2a$10$I/BsePVj4Vx31ymd9BcjBeEbyNTDUcVOaGBq/DzoE2Lv5K1h4wi42	\N	\N	t	9666740a-4ff5-4d22-830f-ab3361ba5ef4
3d3441fe-682f-40dd-9007-8a5af5da83fa	2024-08-27 08:42:15.093822+00	2024-08-27 08:42:15.093822+00	\N	user@gmail.com	$2a$10$piOJHqONRXwyGus8acnejuE6lTAYJUWAAP0ovfh1TG6d2coJnPgNC	\N	\N	t	9666740a-4ff5-4d22-830f-ab3361ba5ef4
46d5a660-f0ea-4658-8105-a17d6e922697	2024-08-27 13:09:14.680484+00	2024-08-27 13:09:14.680484+00	\N	client3@gmail.com	$2a$10$6pdE6fgeJXHC34hXn.KOF./R0URrwgRkdgn6e.eP6yaTmEOGtl0cK	\N	\N	f	9666740a-4ff5-4d22-830f-ab3361ba5ef4
d96a9ccd-524b-40da-b7c9-063438d8e306	2024-08-27 13:09:18.75999+00	2024-08-27 13:09:18.75999+00	2024-08-27 13:09:58.289075+00	client2@gmail.com	$2a$10$GiC.6lwGZnjbz/NSnSf2fOdJhbJSJtnXISnC8JW78sgfr8OgZvACO	\N	\N	t	9666740a-4ff5-4d22-830f-ab3361ba5ef4
\.


--
-- Data for Name: webhooks; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.webhooks (id, created_at, updated_at, deleted_at, event_type, payload, processed, received_at) FROM stdin;
\.


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- Name: club_media club_media_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club_media
    ADD CONSTRAINT club_media_pkey PRIMARY KEY (club_id, media_id);


--
-- Name: club_member club_member_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club_member
    ADD CONSTRAINT club_member_pkey PRIMARY KEY (id);


--
-- Name: club_payment_infos club_payment_infos_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club_payment_infos
    ADD CONSTRAINT club_payment_infos_pkey PRIMARY KEY (club_id, payment_info_id);


--
-- Name: club club_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club
    ADD CONSTRAINT club_pkey PRIMARY KEY (id);


--
-- Name: club_sporttype club_sporttype_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club_sporttype
    ADD CONSTRAINT club_sporttype_pkey PRIMARY KEY (club_id, sport_type_id);


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: metadata metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.metadata
    ADD CONSTRAINT metadata_pkey PRIMARY KEY (id);


--
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id);


--
-- Name: notification_type notification_type_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.notification_type
    ADD CONSTRAINT notification_type_pkey PRIMARY KEY (id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: payment_info payment_info_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.payment_info
    ADD CONSTRAINT payment_info_pkey PRIMARY KEY (id);


--
-- Name: payment_method payment_method_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.payment_method
    ADD CONSTRAINT payment_method_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- Name: role_permissions role_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (role_id, permission_id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: sport_type sport_type_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.sport_type
    ADD CONSTRAINT sport_type_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: notification_type uni_notification_type_name; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.notification_type
    ADD CONSTRAINT uni_notification_type_name UNIQUE (name);


--
-- Name: permission uni_permission_name; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT uni_permission_name UNIQUE (name);


--
-- Name: role uni_role_name; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT uni_role_name UNIQUE (name);


--
-- Name: unit_media unit_media_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.unit_media
    ADD CONSTRAINT unit_media_pkey PRIMARY KEY (unit_id, media_id);


--
-- Name: unit unit_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.unit
    ADD CONSTRAINT unit_pkey PRIMARY KEY (id);


--
-- Name: unit_price unit_price_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.unit_price
    ADD CONSTRAINT unit_price_pkey PRIMARY KEY (id);


--
-- Name: unit_service unit_service_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.unit_service
    ADD CONSTRAINT unit_service_pkey PRIMARY KEY (id);


--
-- Name: unit_sporttype unit_sporttype_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.unit_sporttype
    ADD CONSTRAINT unit_sporttype_pkey PRIMARY KEY (unit_id, sport_type_id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: webhooks webhooks_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.webhooks
    ADD CONSTRAINT webhooks_pkey PRIMARY KEY (id);


--
-- Name: idx_club_name; Type: INDEX; Schema: public; Owner: spb_user
--

CREATE UNIQUE INDEX idx_club_name ON public.club USING btree (name);


--
-- Name: idx_unit_name; Type: INDEX; Schema: public; Owner: spb_user
--

CREATE UNIQUE INDEX idx_unit_name ON public.unit USING btree (name);


--
-- Name: idx_user_email; Type: INDEX; Schema: public; Owner: spb_user
--

CREATE UNIQUE INDEX idx_user_email ON public."user" USING btree (email);


--
-- Name: address fk_address_location; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT fk_address_location FOREIGN KEY (location_id) REFERENCES public.location(id);


--
-- Name: club_media fk_club_media_club; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club_media
    ADD CONSTRAINT fk_club_media_club FOREIGN KEY (club_id) REFERENCES public.club(id);


--
-- Name: club_media fk_club_media_media; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club_media
    ADD CONSTRAINT fk_club_media_media FOREIGN KEY (media_id) REFERENCES public.media(id);


--
-- Name: club_member fk_club_member_club; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club_member
    ADD CONSTRAINT fk_club_member_club FOREIGN KEY (club_id) REFERENCES public.club(id);


--
-- Name: club_member fk_club_member_member; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club_member
    ADD CONSTRAINT fk_club_member_member FOREIGN KEY (member_id) REFERENCES public."user"(id);


--
-- Name: club fk_club_owner; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club
    ADD CONSTRAINT fk_club_owner FOREIGN KEY (owner_id) REFERENCES public."user"(id);


--
-- Name: club_payment_infos fk_club_payment_infos_club; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club_payment_infos
    ADD CONSTRAINT fk_club_payment_infos_club FOREIGN KEY (club_id) REFERENCES public.club(id);


--
-- Name: club_payment_infos fk_club_payment_infos_payment_info; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club_payment_infos
    ADD CONSTRAINT fk_club_payment_infos_payment_info FOREIGN KEY (payment_info_id) REFERENCES public.payment_info(id);


--
-- Name: club_sporttype fk_club_sporttype_club; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club_sporttype
    ADD CONSTRAINT fk_club_sporttype_club FOREIGN KEY (club_id) REFERENCES public.club(id);


--
-- Name: club_sporttype fk_club_sporttype_sport_type; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.club_sporttype
    ADD CONSTRAINT fk_club_sporttype_sport_type FOREIGN KEY (sport_type_id) REFERENCES public.sport_type(id);


--
-- Name: unit fk_club_units; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.unit
    ADD CONSTRAINT fk_club_units FOREIGN KEY (club_id) REFERENCES public.club(id);


--
-- Name: notification fk_notification_notification_type; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT fk_notification_notification_type FOREIGN KEY (notification_type_id) REFERENCES public.notification_type(id);


--
-- Name: notification fk_notification_receiver; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT fk_notification_receiver FOREIGN KEY (receiver_id) REFERENCES public."user"(id);


--
-- Name: notification fk_notification_sender; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT fk_notification_sender FOREIGN KEY (sender_id) REFERENCES public."user"(id);


--
-- Name: order fk_order_approve_owner; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT fk_order_approve_owner FOREIGN KEY (approve_owner_id) REFERENCES public.club_member(id);


--
-- Name: order fk_order_evident; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT fk_order_evident FOREIGN KEY (evident_id) REFERENCES public.media(id);


--
-- Name: order fk_order_unit; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT fk_order_unit FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: payments fk_payments_order; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES public."order"(id);


--
-- Name: payments fk_payments_payment_method; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_payments_payment_method FOREIGN KEY (payment_method_id) REFERENCES public.payment_method(id);


--
-- Name: payments fk_payments_user; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT fk_payments_user FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: role fk_role_children; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT fk_role_children FOREIGN KEY (parent_id) REFERENCES public.role(id);


--
-- Name: role_permissions fk_role_permissions_permission; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT fk_role_permissions_permission FOREIGN KEY (permission_id) REFERENCES public.permission(id);


--
-- Name: role_permissions fk_role_permissions_role; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT fk_role_permissions_role FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: transactions fk_transactions_payments; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_transactions_payments FOREIGN KEY (payments_id) REFERENCES public.payments(id);


--
-- Name: address fk_unit_addresses; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT fk_unit_addresses FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: unit_media fk_unit_media_media; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.unit_media
    ADD CONSTRAINT fk_unit_media_media FOREIGN KEY (media_id) REFERENCES public.media(id);


--
-- Name: unit_media fk_unit_media_unit; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.unit_media
    ADD CONSTRAINT fk_unit_media_unit FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: unit_sporttype fk_unit_sporttype_sport_type; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.unit_sporttype
    ADD CONSTRAINT fk_unit_sporttype_sport_type FOREIGN KEY (sport_type_id) REFERENCES public.sport_type(id);


--
-- Name: unit_sporttype fk_unit_sporttype_unit; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.unit_sporttype
    ADD CONSTRAINT fk_unit_sporttype_unit FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: unit_price fk_unit_unit_price; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.unit_price
    ADD CONSTRAINT fk_unit_unit_price FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: unit_service fk_unit_unit_services; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.unit_service
    ADD CONSTRAINT fk_unit_unit_services FOREIGN KEY (unit_id) REFERENCES public.unit(id);


--
-- Name: user fk_user_role; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- PostgreSQL database dump complete
--

