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
-- Name: permission; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.permission (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name text NOT NULL
);


ALTER TABLE public.permission OWNER TO spb_user;

--
-- Name: permission_id_seq; Type: SEQUENCE; Schema: public; Owner: spb_user
--

CREATE SEQUENCE public.permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permission_id_seq OWNER TO spb_user;

--
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: spb_user
--

ALTER SEQUENCE public.permission_id_seq OWNED BY public.permission.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.role (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name text NOT NULL
);


ALTER TABLE public.role OWNER TO spb_user;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: spb_user
--

CREATE SEQUENCE public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_id_seq OWNER TO spb_user;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: spb_user
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: role_permission; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.role_permission (
    role_id bigint NOT NULL,
    permission_id bigint NOT NULL
);


ALTER TABLE public.role_permission OWNER TO spb_user;

--
-- Name: sport_type; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public.sport_type (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name text NOT NULL
);


ALTER TABLE public.sport_type OWNER TO spb_user;

--
-- Name: sport_type_id_seq; Type: SEQUENCE; Schema: public; Owner: spb_user
--

CREATE SEQUENCE public.sport_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sport_type_id_seq OWNER TO spb_user;

--
-- Name: sport_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: spb_user
--

ALTER SEQUENCE public.sport_type_id_seq OWNED BY public.sport_type.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: spb_user
--

CREATE TABLE public."user" (
    id bigint NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text NOT NULL,
    password text NOT NULL,
    full_name text,
    phone text,
    active boolean DEFAULT false,
    is_email_verified boolean NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE public."user" OWNER TO spb_user;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: spb_user
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO spb_user;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: spb_user
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: permission id; Type: DEFAULT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.permission ALTER COLUMN id SET DEFAULT nextval('public.permission_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: sport_type id; Type: DEFAULT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.sport_type ALTER COLUMN id SET DEFAULT nextval('public.sport_type_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.permission (id, created_at, updated_at, name) FROM stdin;
1	2024-08-24 09:27:05.096638+00	2024-08-24 09:27:05.096638+00	create_user
2	2024-08-24 09:27:05.096638+00	2024-08-24 09:27:05.096638+00	update_user
3	2024-08-24 09:27:05.096638+00	2024-08-24 09:27:05.096638+00	delete_user
4	2024-08-24 09:27:05.096638+00	2024-08-24 09:27:05.096638+00	read_user
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.role (id, created_at, updated_at, name) FROM stdin;
1	2024-08-24 09:27:05.102366+00	2024-08-24 09:27:05.102366+00	admin
2	2024-08-24 09:27:05.102366+00	2024-08-24 09:27:05.102366+00	client
3	2024-08-24 09:27:05.102366+00	2024-08-24 09:27:05.102366+00	user
\.


--
-- Data for Name: role_permission; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.role_permission (role_id, permission_id) FROM stdin;
1	1
1	2
1	3
1	4
2	4
\.


--
-- Data for Name: sport_type; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.sport_type (id, created_at, updated_at, name) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public."user" (id, created_at, updated_at, email, password, full_name, phone, active, is_email_verified, role_id) FROM stdin;
\.


--
-- Name: permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: spb_user
--

SELECT pg_catalog.setval('public.permission_id_seq', 1, false);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: spb_user
--

SELECT pg_catalog.setval('public.role_id_seq', 1, false);


--
-- Name: sport_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: spb_user
--

SELECT pg_catalog.setval('public.sport_type_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: spb_user
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- Name: role_permission role_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT role_permission_pkey PRIMARY KEY (role_id, permission_id);


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
-- Name: user uni_user_email; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT uni_user_email UNIQUE (email);


--
-- Name: user uni_user_role_id; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT uni_user_role_id UNIQUE (role_id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: role_permission fk_role_permission_permission; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT fk_role_permission_permission FOREIGN KEY (permission_id) REFERENCES public.permission(id);


--
-- Name: role_permission fk_role_permission_role; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.role_permission
    ADD CONSTRAINT fk_role_permission_role FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: user fk_user_role; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- PostgreSQL database dump complete
--

