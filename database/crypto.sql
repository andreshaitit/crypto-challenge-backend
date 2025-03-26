--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-03-26 15:27:26

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 220 (class 1259 OID 16395)
-- Name: cryptos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cryptos (
    id integer NOT NULL,
    purchase_price numeric(15,2) NOT NULL,
    purchase_quantity numeric(15,2) NOT NULL,
    invested_amount numeric(15,2) NOT NULL,
    name character varying(255) NOT NULL,
    ticker character varying(10) NOT NULL
);


ALTER TABLE public.cryptos OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16394)
-- Name: cryptos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cryptos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cryptos_id_seq OWNER TO postgres;

--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 219
-- Name: cryptos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cryptos_id_seq OWNED BY public.cryptos.id;


--
-- TOC entry 218 (class 1259 OID 16386)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16403)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 217 (class 1259 OID 16385)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.users.id;


--
-- TOC entry 4749 (class 2604 OID 16398)
-- Name: cryptos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cryptos ALTER COLUMN id SET DEFAULT nextval('public.cryptos_id_seq'::regclass);


--
-- TOC entry 4748 (class 2604 OID 16405)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4902 (class 0 OID 16395)
-- Dependencies: 220
-- Data for Name: cryptos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cryptos (id, purchase_price, purchase_quantity, invested_amount, name, ticker) FROM stdin;
51	45000.00	1.50	67500.00	Bitcoin	BTC
52	3200.00	5.00	16000.00	Ethereum	ETH
53	150.00	20.00	3000.00	Litecoin	LTC
54	1.20	500.00	600.00	Cardano	ADA
55	180.00	10.00	1800.00	Solana	SOL
56	0.80	1000.00	800.00	Ripple	XRP
57	0.25	2000.00	500.00	Dogecoin	DOGE
\.


--
-- TOC entry 4900 (class 0 OID 16386)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password) FROM stdin;
12	admin	$2b$10$cy50HZnai9ebk.rMKheiBO3NpIKI9JDrszUriN0Q51nGEFCv/E3eS
\.


--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 219
-- Name: cryptos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cryptos_id_seq', 57, true);


--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);


--
-- TOC entry 4753 (class 2606 OID 16402)
-- Name: cryptos cryptos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cryptos
    ADD CONSTRAINT cryptos_pkey PRIMARY KEY (id);


--
-- TOC entry 4751 (class 2606 OID 16393)
-- Name: users usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


-- Completed on 2025-03-26 15:27:27

--
-- PostgreSQL database dump complete
--

