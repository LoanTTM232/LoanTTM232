--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg110+1)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg110+1)

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

--
-- Name: tiger; Type: SCHEMA; Schema: -; Owner: spb_user
--

CREATE SCHEMA tiger;


ALTER SCHEMA tiger OWNER TO spb_user;

--
-- Name: tiger_data; Type: SCHEMA; Schema: -; Owner: spb_user
--

CREATE SCHEMA tiger_data;


ALTER SCHEMA tiger_data OWNER TO spb_user;

--
-- Name: topology; Type: SCHEMA; Schema: -; Owner: spb_user
--

CREATE SCHEMA topology;


ALTER SCHEMA topology OWNER TO spb_user;

--
-- Name: SCHEMA topology; Type: COMMENT; Schema: -; Owner: spb_user
--

COMMENT ON SCHEMA topology IS 'PostGIS Topology schema';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


--
-- Name: postgis_tiger_geocoder; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder WITH SCHEMA tiger;


--
-- Name: EXTENSION postgis_tiger_geocoder; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_tiger_geocoder IS 'PostGIS tiger geocoder and reverse geocoder';


--
-- Name: postgis_topology; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis_topology WITH SCHEMA topology;


--
-- Name: EXTENSION postgis_topology; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis_topology IS 'PostGIS topology spatial types and functions';


--
-- Name: platform; Type: TYPE; Schema: public; Owner: spb_user
--

CREATE TYPE public.platform AS ENUM (
    'android',
    'ios',
    'inapp',
    'email'
);


ALTER TYPE public.platform OWNER TO spb_user;

--
-- Name: progress; Type: TYPE; Schema: public; Owner: spb_user
--

CREATE TYPE public.progress AS ENUM (
    'inprogress',
    'pending',
    'success',
    'failure'
);


ALTER TYPE public.progress OWNER TO spb_user;

--
-- Name: status; Type: TYPE; Schema: public; Owner: spb_user
--

CREATE TYPE public.status AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.status OWNER TO spb_user;

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
    location_geography public.geography(Point,4326) NOT NULL,
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
    status public.progress,
    error text,
    platform public.platform,
    title character varying(255) NOT NULL,
    message text,
    notification_type_id uuid NOT NULL,
    sender_id uuid,
    receiver_id uuid,
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
    type character varying(255) NOT NULL,
    template text NOT NULL,
    title character varying(500) NOT NULL,
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
    email_verify_token character varying(255),
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

COPY public.address (id, created_at, updated_at, deleted_at, unit_id, address, location_geography, location_id) FROM stdin;
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
40d39fa2-c6f4-43a4-a8be-aa6768e208be	2024-09-26 12:32:05.184429+00	2024-09-26 12:32:05.184429+00	\N	operator_email	hoangduc97dn@gmail.com	\N
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.notification (id, created_at, updated_at, deleted_at, status, error, platform, title, message, notification_type_id, sender_id, receiver_id, read_at) FROM stdin;
50f57533-857e-432a-b9be-66425c93c85b	2024-09-26 13:08:41.378067+00	2024-09-26 13:08:41.378067+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
c2d00980-1bcb-4be7-b322-ecf522d2fd8b	2024-09-26 13:09:07.35993+00	2024-09-26 13:09:07.35993+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
ea6ebf64-2c4d-4b97-86f1-f3523948f5fa	2024-09-26 13:09:52.898069+00	2024-09-26 13:09:52.898069+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
448b7973-4052-46fe-ad4b-cda74bc320db	2024-09-26 15:33:49.05845+00	2024-09-26 15:33:49.05845+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
5d5d7d16-6b39-4d4a-bcc8-939e56d72884	2024-09-26 15:40:38.662554+00	2024-09-26 15:40:38.662554+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
8ad81526-78d7-4e1b-9bf7-17e14852adda	2024-09-26 15:41:12.51183+00	2024-09-26 15:41:12.51183+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
213e32f5-a2d0-4575-bf4d-1ee002b46319	2024-09-26 15:43:47.903441+00	2024-09-26 15:43:47.903441+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
53d2bdf1-ac1b-4792-9c4b-a95f5009e723	2024-09-26 15:44:28.633472+00	2024-09-26 15:44:28.633472+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
18fdf900-5f90-4b8a-a760-963cb2815123	2024-09-26 15:47:10.226425+00	2024-09-26 15:47:10.226425+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
a07ce58f-e38e-4211-9b83-c2e528f6a287	2024-09-26 15:49:32.759327+00	2024-09-26 15:49:32.759327+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
430d6603-40fd-4045-b540-063d4d3614b4	2024-09-26 16:11:10.095714+00	2024-09-26 16:11:10.095714+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
724acd26-345f-412d-a06c-c28e80d2b4db	2024-09-26 16:14:59.118331+00	2024-09-26 16:14:59.118331+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
8d797acb-38d8-41bb-87f5-217ea77334b0	2024-09-26 16:16:18.153414+00	2024-09-26 16:16:18.153414+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
40b7e208-fe83-4581-8548-7b69dd1fa9cf	2024-09-27 02:20:44.571427+00	2024-09-27 02:20:44.571427+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
695212ac-6e41-4b3d-9400-5fcfea59f132	2024-09-27 02:22:41.074764+00	2024-09-27 02:22:41.074764+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
01e13d83-e990-46ce-8f2b-f206697c44f5	2024-09-27 02:23:01.050808+00	2024-09-27 02:23:01.050808+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
551b30d2-c191-45fd-8c29-7116b412e7bd	2024-09-27 02:29:11.301413+00	2024-09-27 02:29:11.301413+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
5d764e36-b984-4a72-b562-9c7ec1c54648	2024-09-27 02:30:01.778867+00	2024-09-27 02:30:01.778867+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
e371e0a4-e604-4ec2-91e2-21a05a0f58bc	2024-09-27 04:27:33.301499+00	2024-09-27 04:27:33.301499+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
dab08187-2ba7-449e-bde2-6f50d3048ca6	2024-09-27 04:27:58.24185+00	2024-09-27 04:27:58.24185+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
483fd11b-4463-4b12-9861-50c420192f1d	2024-09-27 04:31:19.971777+00	2024-09-27 04:31:19.971777+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
95837182-89df-49f4-948b-a087f090e389	2024-09-27 04:32:19.138117+00	2024-09-27 04:32:19.138117+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
ca049d6e-f667-496c-b9e2-5a4b11cf923f	2024-09-27 04:34:49.484371+00	2024-09-27 04:34:49.484371+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
9f617d98-76aa-4336-8d38-b758f254466f	2024-09-27 04:37:03.198298+00	2024-09-27 04:37:03.198298+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
4e14b6b7-59f5-4dd1-af1f-0a88b9c2d20f	2024-09-27 04:45:59.060621+00	2024-09-27 04:45:59.060621+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
a7853d7a-b87c-4cb2-b0b6-1e6ea142adf5	2024-09-27 04:51:29.8129+00	2024-09-27 04:51:29.8129+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
ef02f04f-c30d-40ca-a9ed-fe205f7ceec4	2024-09-27 04:52:13.517162+00	2024-09-27 04:52:13.517162+00	\N	inprogress	\N	email	verify register email	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	22511c51-83bc-444e-8708-4801d7eaa2e2	\N	\N	\N
\.


--
-- Data for Name: notification_type; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.notification_type (id, created_at, updated_at, deleted_at, type, template, title, description) FROM stdin;
22511c51-83bc-444e-8708-4801d7eaa2e2	2024-09-26 12:31:14.596547+00	2024-09-26 12:31:14.596547+00	\N	VERIFY:USER	<!DOCTYPE html> <html> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> <link rel="preconnect" href="https://fonts.googleapis.com" /> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /> <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" /> <style> body { font-family: "Lato", sans-serif; font-weight: 400; font-style: normal; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .header { text-align: center; padding: 0; color: white; border-top-left-radius: 5px; border-top-right-radius: 5px; } .header img { width: 350px; max-height: 100%; border-top-left-radius: 5px; border-top-right-radius: 5px; } .content { text-align: center; padding: 20px; } .button { display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px; } .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; } </style> </head> <body> <div class="container"> <div class="header"> <img src="https://res.cloudinary.com/dnvquc1sb/image/upload/v1726057657/Mail_Illustration_udruhw.png" alt="Email Verification Banner" /> </div> <div class="content"> <h1>Hi there,</h1> <p> Thank you for registering. Please click the button below to verify your email address: </p> <a href="{{verification_link}}" class="button">Verify Email</a> <p> If you did not create an account, no further action is required. </p> </div> <div class="footer"> <p>&copy; 2024 Sport Booking. All rights reserved.</p> </div> </div> </body> </html>	verify register email	verify email
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
cb6541f1-a32b-42aa-a6b2-1e84024fa076	2024-09-26 12:28:17.147322+00	2024-09-26 12:28:17.147322+00	\N	user:create
728b7199-8d4b-4a2d-bd97-7b53f284091c	2024-09-26 12:28:17.147322+00	2024-09-26 12:28:17.147322+00	\N	user:update
3008638a-ea1c-4be3-9d24-1b2ebd578bc0	2024-09-26 12:28:17.147322+00	2024-09-26 12:28:17.147322+00	\N	user:delete
1683cbe9-8076-40da-8210-624a600e340d	2024-09-26 12:28:17.147322+00	2024-09-26 12:28:17.147322+00	\N	user:read
2083cbe9-8072-40aa-a210-a24a600e340d	2024-09-26 12:28:17.147322+00	2024-09-26 12:28:17.147322+00	\N	user:list
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.role (id, created_at, updated_at, deleted_at, name, description, parent_id) FROM stdin;
cc203bb9-7b33-4391-8917-0089588356f2	2024-09-26 12:28:17.151604+00	2024-09-26 12:28:17.151604+00	\N	admin	\N	\N
6c8647dc-091f-4249-b9f7-12bed594d124	2024-09-26 12:28:17.151604+00	2024-09-26 12:28:17.151604+00	\N	client	\N	cc203bb9-7b33-4391-8917-0089588356f2
9666740a-4ff5-4d22-830f-ab3361ba5ef4	2024-09-26 12:28:17.151604+00	2024-09-26 12:28:17.151604+00	\N	user	\N	6c8647dc-091f-4249-b9f7-12bed594d124
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.role_permissions (role_id, permission_id) FROM stdin;
cc203bb9-7b33-4391-8917-0089588356f2	cb6541f1-a32b-42aa-a6b2-1e84024fa076
cc203bb9-7b33-4391-8917-0089588356f2	728b7199-8d4b-4a2d-bd97-7b53f284091c
cc203bb9-7b33-4391-8917-0089588356f2	3008638a-ea1c-4be3-9d24-1b2ebd578bc0
cc203bb9-7b33-4391-8917-0089588356f2	1683cbe9-8076-40da-8210-624a600e340d
cc203bb9-7b33-4391-8917-0089588356f2	2083cbe9-8072-40aa-a210-a24a600e340d
6c8647dc-091f-4249-b9f7-12bed594d124	1683cbe9-8076-40da-8210-624a600e340d
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
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

COPY public."user" (id, created_at, updated_at, deleted_at, email, password, full_name, phone, is_email_verified, email_verify_token, role_id) FROM stdin;
78574593-757c-49bc-aad1-3a8dd5c03970	2024-09-26 12:28:17.158577+00	2024-09-26 12:28:17.158577+00	\N	admin@gmail.com	$2a$10$nCvN3CAF4b1mMuramtpSre8Dx7fsBf4FoRG2btotNKvbLftZPKbqu	\N	\N	t	\N	cc203bb9-7b33-4391-8917-0089588356f2
6bb9e18d-69e7-4dd3-bf7a-7b9ee15b3aeb	2024-09-26 12:28:17.158577+00	2024-09-26 12:28:17.158577+00	\N	client@gmail.com	$2a$10$A20KBHwJ8dpuL951mY23P.D0gV6kek73rKqspLgAm2sfkCe7HgbFm	\N	\N	t	\N	6c8647dc-091f-4249-b9f7-12bed594d124
043aad47-c234-4e76-a809-d65dc5708646	2024-09-26 12:28:17.158577+00	2024-09-26 12:28:17.158577+00	\N	user1@gmail.com	$2a$10$buwiJga6U0oGp4eim88zCuKYYFdxLz3cGgGxb9mhzuXoh3G5vpY26	\N	\N	f	\N	9666740a-4ff5-4d22-830f-ab3361ba5ef4
\.


--
-- Data for Name: webhooks; Type: TABLE DATA; Schema: public; Owner: spb_user
--

COPY public.webhooks (id, created_at, updated_at, deleted_at, event_type, payload, processed, received_at) FROM stdin;
\.


--
-- Data for Name: geocode_settings; Type: TABLE DATA; Schema: tiger; Owner: spb_user
--

COPY tiger.geocode_settings (name, setting, unit, category, short_desc) FROM stdin;
\.


--
-- Data for Name: pagc_gaz; Type: TABLE DATA; Schema: tiger; Owner: spb_user
--

COPY tiger.pagc_gaz (id, seq, word, stdword, token, is_custom) FROM stdin;
\.


--
-- Data for Name: pagc_lex; Type: TABLE DATA; Schema: tiger; Owner: spb_user
--

COPY tiger.pagc_lex (id, seq, word, stdword, token, is_custom) FROM stdin;
\.


--
-- Data for Name: pagc_rules; Type: TABLE DATA; Schema: tiger; Owner: spb_user
--

COPY tiger.pagc_rules (id, rule, is_custom) FROM stdin;
\.


--
-- Data for Name: topology; Type: TABLE DATA; Schema: topology; Owner: spb_user
--

COPY topology.topology (id, name, srid, "precision", hasz) FROM stdin;
\.


--
-- Data for Name: layer; Type: TABLE DATA; Schema: topology; Owner: spb_user
--

COPY topology.layer (topology_id, layer_id, schema_name, table_name, feature_column, feature_type, level, child_id) FROM stdin;
\.


--
-- Name: topology_id_seq; Type: SEQUENCE SET; Schema: topology; Owner: spb_user
--

SELECT pg_catalog.setval('topology.topology_id_seq', 1, false);


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
-- Name: notification_type uni_notification_type_type; Type: CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.notification_type
    ADD CONSTRAINT uni_notification_type_type UNIQUE (type);


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
-- Name: address fk_unit_address; Type: FK CONSTRAINT; Schema: public; Owner: spb_user
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT fk_unit_address FOREIGN KEY (unit_id) REFERENCES public.unit(id);


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

