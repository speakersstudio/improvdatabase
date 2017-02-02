--
-- TOC entry 170 (class 1259 OID 3398618)
-- Name: comedygroup; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE comedygroup (
    "GroupID" integer NOT NULL,
    "Name" character varying(50) NOT NULL,
    "Description" text NOT NULL,
    "Email" character varying(50) NOT NULL,
    "URL" character varying(50) NOT NULL,
    "DateAdded" timestamp without time zone NOT NULL,
    "DateModified" timestamp without time zone NOT NULL,
    "AddedUserID" integer NOT NULL,
    "ModifiedUserID" integer NOT NULL
);


ALTER TABLE comedygroup OWNER TO pynrwwmwncytsi;

--
-- TOC entry 171 (class 1259 OID 3398624)
-- Name: comedygroup_GroupID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "comedygroup_GroupID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "comedygroup_GroupID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2634 (class 0 OID 0)
-- Dependencies: 171
-- Name: comedygroup_GroupID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "comedygroup_GroupID_seq" OWNED BY comedygroup."GroupID";


--
-- TOC entry 172 (class 1259 OID 3398626)
-- Name: duration; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE duration (
    "DurationID" integer NOT NULL,
    "Name" character varying(50) NOT NULL,
    "Description" text,
    "Min" integer,
    "Max" integer,
    "DateAdded" timestamp without time zone NOT NULL,
    "DateModified" timestamp without time zone NOT NULL,
    "AddedUserID" integer NOT NULL,
    "ModifiedUserID" integer NOT NULL
);


ALTER TABLE duration OWNER TO pynrwwmwncytsi;

--
-- TOC entry 173 (class 1259 OID 3398632)
-- Name: duration_DurationID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "duration_DurationID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "duration_DurationID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2635 (class 0 OID 0)
-- Dependencies: 173
-- Name: duration_DurationID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "duration_DurationID_seq" OWNED BY duration."DurationID";


--
-- TOC entry 174 (class 1259 OID 3398634)
-- Name: game; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE game (
    "GameID" integer NOT NULL,
    "DateModified" timestamp without time zone NOT NULL,
    "DateAdded" timestamp without time zone NOT NULL,
    "Description" text,
    "DurationID" integer,
    "PlayerCountID" integer,
    "AddedUserID" integer NOT NULL,
    "ModifiedUserID" integer NOT NULL,
    "ParentGameID" integer
);


ALTER TABLE game OWNER TO pynrwwmwncytsi;

--
-- TOC entry 175 (class 1259 OID 3398640)
-- Name: game_GameID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "game_GameID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "game_GameID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2636 (class 0 OID 0)
-- Dependencies: 175
-- Name: game_GameID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "game_GameID_seq" OWNED BY game."GameID";


--
-- TOC entry 176 (class 1259 OID 3398642)
-- Name: name; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE name (
    "NameID" integer NOT NULL,
    "GameID" integer NOT NULL,
    "Name" character varying(50) NOT NULL,
    "Weight" integer NOT NULL,
    "DateAdded" timestamp without time zone NOT NULL,
    "DateModified" timestamp without time zone NOT NULL,
    "AddedUserID" integer NOT NULL,
    "ModifiedUserID" integer NOT NULL
);


ALTER TABLE name OWNER TO pynrwwmwncytsi;

--
-- TOC entry 177 (class 1259 OID 3398645)
-- Name: name_NameID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "name_NameID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "name_NameID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2637 (class 0 OID 0)
-- Dependencies: 177
-- Name: name_NameID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "name_NameID_seq" OWNED BY name."NameID";


--
-- TOC entry 178 (class 1259 OID 3398647)
-- Name: note; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE note (
    "NoteID" integer NOT NULL,
    "GameID" integer,
    "Description" text NOT NULL,
    "Public" smallint NOT NULL,
    "DateAdded" timestamp without time zone NOT NULL,
    "DateModified" timestamp without time zone NOT NULL,
    "AddedUserID" integer NOT NULL,
    "ModifiedUserID" integer NOT NULL,
    "TagID" integer,
    "DurationID" integer,
    "PlayerCountID" integer
);


ALTER TABLE note OWNER TO pynrwwmwncytsi;

--
-- TOC entry 179 (class 1259 OID 3398653)
-- Name: note_NoteID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "note_NoteID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "note_NoteID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2638 (class 0 OID 0)
-- Dependencies: 179
-- Name: note_NoteID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "note_NoteID_seq" OWNED BY note."NoteID";


--
-- TOC entry 180 (class 1259 OID 3398655)
-- Name: permissionkey; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE permissionkey (
    "Name" character varying(20),
    "PermissionKeyID" integer NOT NULL
);


ALTER TABLE permissionkey OWNER TO pynrwwmwncytsi;

--
-- TOC entry 181 (class 1259 OID 3398658)
-- Name: permissionkey_PermissionKeyID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "permissionkey_PermissionKeyID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "permissionkey_PermissionKeyID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2639 (class 0 OID 0)
-- Dependencies: 181
-- Name: permissionkey_PermissionKeyID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "permissionkey_PermissionKeyID_seq" OWNED BY permissionkey."PermissionKeyID";


--
-- TOC entry 182 (class 1259 OID 3398660)
-- Name: permissionkeyuserlevel; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE permissionkeyuserlevel (
    "PermissionKeyUserLevelID" integer NOT NULL,
    "PermissionKeyID" integer,
    "UserLevelID" integer
);


ALTER TABLE permissionkeyuserlevel OWNER TO pynrwwmwncytsi;

--
-- TOC entry 183 (class 1259 OID 3398663)
-- Name: permissionkeyuserlevel_PermissionKeyUserLevelID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "permissionkeyuserlevel_PermissionKeyUserLevelID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "permissionkeyuserlevel_PermissionKeyUserLevelID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2640 (class 0 OID 0)
-- Dependencies: 183
-- Name: permissionkeyuserlevel_PermissionKeyUserLevelID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "permissionkeyuserlevel_PermissionKeyUserLevelID_seq" OWNED BY permissionkeyuserlevel."PermissionKeyUserLevelID";


--
-- TOC entry 184 (class 1259 OID 3398665)
-- Name: playercount; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE playercount (
    "PlayerCountID" integer NOT NULL,
    "Name" character varying(50) NOT NULL,
    "Description" text,
    "Min" integer,
    "Max" integer,
    "DateAdded" timestamp without time zone NOT NULL,
    "DateModified" timestamp without time zone NOT NULL,
    "AddedUserID" integer NOT NULL,
    "ModifiedUserID" integer NOT NULL
);


ALTER TABLE playercount OWNER TO pynrwwmwncytsi;

--
-- TOC entry 185 (class 1259 OID 3398671)
-- Name: playercount_PlayerCountID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "playercount_PlayerCountID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "playercount_PlayerCountID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2641 (class 0 OID 0)
-- Dependencies: 185
-- Name: playercount_PlayerCountID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "playercount_PlayerCountID_seq" OWNED BY playercount."PlayerCountID";


--
-- TOC entry 186 (class 1259 OID 3398673)
-- Name: suggestion; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE suggestion (
    "SuggestionID" integer NOT NULL,
    "SuggestionTypeID" integer NOT NULL,
    "Name" character varying(50) NOT NULL,
    "DateAdded" timestamp without time zone NOT NULL,
    "DateModified" timestamp without time zone NOT NULL,
    "AddedUserID" integer NOT NULL,
    "ModifiedUserID" integer NOT NULL
);


ALTER TABLE suggestion OWNER TO pynrwwmwncytsi;

--
-- TOC entry 187 (class 1259 OID 3398676)
-- Name: suggestion_SuggestionID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "suggestion_SuggestionID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "suggestion_SuggestionID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2642 (class 0 OID 0)
-- Dependencies: 187
-- Name: suggestion_SuggestionID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "suggestion_SuggestionID_seq" OWNED BY suggestion."SuggestionID";


--
-- TOC entry 188 (class 1259 OID 3398678)
-- Name: suggestiontype; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE suggestiontype (
    "SuggestionTypeID" integer NOT NULL,
    "Name" character varying(50) NOT NULL,
    "Description" text,
    "DateAdded" timestamp without time zone NOT NULL,
    "DateModified" timestamp without time zone NOT NULL,
    "AddedUserID" integer NOT NULL,
    "ModifiedUserID" integer NOT NULL
);


ALTER TABLE suggestiontype OWNER TO pynrwwmwncytsi;

--
-- TOC entry 189 (class 1259 OID 3398684)
-- Name: suggestiontype_SuggestionTypeID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "suggestiontype_SuggestionTypeID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "suggestiontype_SuggestionTypeID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2643 (class 0 OID 0)
-- Dependencies: 189
-- Name: suggestiontype_SuggestionTypeID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "suggestiontype_SuggestionTypeID_seq" OWNED BY suggestiontype."SuggestionTypeID";


--
-- TOC entry 190 (class 1259 OID 3398686)
-- Name: suggestiontypegame; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE suggestiontypegame (
    "SuggestionTypeGameID" integer NOT NULL,
    "SuggestionTypeID" integer NOT NULL,
    "GameID" integer NOT NULL,
    "Description" text,
    "DateAdded" timestamp without time zone NOT NULL,
    "AddedUserID" integer NOT NULL
);


ALTER TABLE suggestiontypegame OWNER TO pynrwwmwncytsi;

--
-- TOC entry 191 (class 1259 OID 3398692)
-- Name: suggestiontypegame_SuggestionTypeGameID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "suggestiontypegame_SuggestionTypeGameID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "suggestiontypegame_SuggestionTypeGameID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2644 (class 0 OID 0)
-- Dependencies: 191
-- Name: suggestiontypegame_SuggestionTypeGameID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "suggestiontypegame_SuggestionTypeGameID_seq" OWNED BY suggestiontypegame."SuggestionTypeGameID";


--
-- TOC entry 192 (class 1259 OID 3398694)
-- Name: tag; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE tag (
    "TagID" integer NOT NULL,
    "Name" character varying(50) NOT NULL,
    "Description" text,
    "DateAdded" timestamp without time zone NOT NULL,
    "AddedUserID" integer NOT NULL,
    "ModifiedUserID" integer NOT NULL
);


ALTER TABLE tag OWNER TO pynrwwmwncytsi;

--
-- TOC entry 193 (class 1259 OID 3398700)
-- Name: tag_TagID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "tag_TagID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "tag_TagID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2645 (class 0 OID 0)
-- Dependencies: 193
-- Name: tag_TagID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "tag_TagID_seq" OWNED BY tag."TagID";


--
-- TOC entry 194 (class 1259 OID 3398702)
-- Name: taggame; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE taggame (
    "TagGameID" integer NOT NULL,
    "TagID" integer NOT NULL,
    "GameID" integer NOT NULL,
    "DateAdded" timestamp without time zone NOT NULL,
    "AddedUserID" integer NOT NULL,
    "ModifiedUserID" integer NOT NULL
);


ALTER TABLE taggame OWNER TO pynrwwmwncytsi;

--
-- TOC entry 195 (class 1259 OID 3398705)
-- Name: taggame_TagGameID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "taggame_TagGameID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "taggame_TagGameID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2646 (class 0 OID 0)
-- Dependencies: 195
-- Name: taggame_TagGameID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "taggame_TagGameID_seq" OWNED BY taggame."TagGameID";


--
-- TOC entry 196 (class 1259 OID 3398707)
-- Name: userlevel; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE userlevel (
    "UserLevelID" integer NOT NULL,
    "Name" character varying(50)
);


ALTER TABLE userlevel OWNER TO pynrwwmwncytsi;

--
-- TOC entry 197 (class 1259 OID 3398710)
-- Name: userLevel_UserLevelID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "userLevel_UserLevelID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "userLevel_UserLevelID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2647 (class 0 OID 0)
-- Dependencies: 197
-- Name: userLevel_UserLevelID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "userLevel_UserLevelID_seq" OWNED BY userlevel."UserLevelID";


--
-- TOC entry 198 (class 1259 OID 3398712)
-- Name: users; Type: TABLE; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

CREATE TABLE users (
    "UserID" integer NOT NULL,
    "FirstName" character varying(50) NOT NULL,
    "LastName" character varying(50) NOT NULL,
    "Gender" character varying(1),
    "Email" character varying(50) DEFAULT NULL::character varying,
    "URL" character varying(50) DEFAULT NULL::character varying,
    "DateAdded" timestamp without time zone NOT NULL,
    "DateModified" timestamp without time zone NOT NULL,
    "Password" character(60),
    "UserLevel" bigint[],
    "Locked" boolean DEFAULT false,
    "Description" text DEFAULT ''::text
);


ALTER TABLE users OWNER TO pynrwwmwncytsi;

--
-- TOC entry 199 (class 1259 OID 3398722)
-- Name: users_UserID_seq; Type: SEQUENCE; Schema: public; Owner: pynrwwmwncytsi
--

CREATE SEQUENCE "users_UserID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "users_UserID_seq" OWNER TO pynrwwmwncytsi;

--
-- TOC entry 2648 (class 0 OID 0)
-- Dependencies: 199
-- Name: users_UserID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pynrwwmwncytsi
--

ALTER SEQUENCE "users_UserID_seq" OWNED BY users."UserID";


--
-- TOC entry 2436 (class 2604 OID 3398724)
-- Name: GroupID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY comedygroup ALTER COLUMN "GroupID" SET DEFAULT nextval('"comedygroup_GroupID_seq"'::regclass);


--
-- TOC entry 2437 (class 2604 OID 5734072)
-- Name: DurationID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY duration ALTER COLUMN "DurationID" SET DEFAULT nextval('"duration_DurationID_seq"'::regclass);


--
-- TOC entry 2438 (class 2604 OID 3398726)
-- Name: GameID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY game ALTER COLUMN "GameID" SET DEFAULT nextval('"game_GameID_seq"'::regclass);


--
-- TOC entry 2439 (class 2604 OID 3398727)
-- Name: NameID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY name ALTER COLUMN "NameID" SET DEFAULT nextval('"name_NameID_seq"'::regclass);


--
-- TOC entry 2440 (class 2604 OID 3398728)
-- Name: NoteID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY note ALTER COLUMN "NoteID" SET DEFAULT nextval('"note_NoteID_seq"'::regclass);


--
-- TOC entry 2441 (class 2604 OID 5734083)
-- Name: PermissionKeyID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY permissionkey ALTER COLUMN "PermissionKeyID" SET DEFAULT nextval('"permissionkey_PermissionKeyID_seq"'::regclass);


--
-- TOC entry 2442 (class 2604 OID 5734090)
-- Name: PermissionKeyUserLevelID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY permissionkeyuserlevel ALTER COLUMN "PermissionKeyUserLevelID" SET DEFAULT nextval('"permissionkeyuserlevel_PermissionKeyUserLevelID_seq"'::regclass);


--
-- TOC entry 2443 (class 2604 OID 3398731)
-- Name: PlayerCountID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY playercount ALTER COLUMN "PlayerCountID" SET DEFAULT nextval('"playercount_PlayerCountID_seq"'::regclass);


--
-- TOC entry 2444 (class 2604 OID 3398732)
-- Name: SuggestionID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY suggestion ALTER COLUMN "SuggestionID" SET DEFAULT nextval('"suggestion_SuggestionID_seq"'::regclass);


--
-- TOC entry 2445 (class 2604 OID 3398733)
-- Name: SuggestionTypeID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY suggestiontype ALTER COLUMN "SuggestionTypeID" SET DEFAULT nextval('"suggestiontype_SuggestionTypeID_seq"'::regclass);


--
-- TOC entry 2446 (class 2604 OID 3398734)
-- Name: SuggestionTypeGameID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY suggestiontypegame ALTER COLUMN "SuggestionTypeGameID" SET DEFAULT nextval('"suggestiontypegame_SuggestionTypeGameID_seq"'::regclass);


--
-- TOC entry 2447 (class 2604 OID 3398735)
-- Name: TagID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY tag ALTER COLUMN "TagID" SET DEFAULT nextval('"tag_TagID_seq"'::regclass);


--
-- TOC entry 2448 (class 2604 OID 3398736)
-- Name: TagGameID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY taggame ALTER COLUMN "TagGameID" SET DEFAULT nextval('"taggame_TagGameID_seq"'::regclass);


--
-- TOC entry 2449 (class 2604 OID 5734105)
-- Name: UserLevelID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY userlevel ALTER COLUMN "UserLevelID" SET DEFAULT nextval('"userLevel_UserLevelID_seq"'::regclass);


--
-- TOC entry 2450 (class 2604 OID 5734114)
-- Name: UserID; Type: DEFAULT; Schema: public; Owner: pynrwwmwncytsi
--

ALTER TABLE ONLY users ALTER COLUMN "UserID" SET DEFAULT nextval('"users_UserID_seq"'::regclass);


--
-- TOC entry 2596 (class 0 OID 3398618)
-- Dependencies: 170
-- Data for Name: comedygroup; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY comedygroup ("GroupID", "Name", "Description", "Email", "URL", "DateAdded", "DateModified", "AddedUserID", "ModifiedUserID") FROM stdin;
\.


--
-- TOC entry 2649 (class 0 OID 0)
-- Dependencies: 171
-- Name: comedygroup_GroupID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"comedygroup_GroupID_seq"', 1, false);


--
-- TOC entry 2598 (class 0 OID 3398626)
-- Dependencies: 172
-- Data for Name: duration; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY duration ("DurationID", "Name", "Description", "Min", "Max", "DateAdded", "DateModified", "AddedUserID", "ModifiedUserID") FROM stdin;
1	3 to 5 minutes	This is definitely complicated, I know. Hey, wait, I'm just a little box of text, what do I know?	3	5	2013-11-04 20:32:31	2013-11-04 20:38:27	1	1
2	5 to 10 minutes	This could be a bit long, but I'm sure it's worth it, right?	5	10	2013-11-04 20:35:45	2013-11-04 20:35:45	1	1
3	Less than 5 minutes	It's hard to say, really, but this certainly won't take longer than five minutes.	0	5	2013-11-04 20:37:09	2013-11-04 20:39:10	1	1
4	Less than 3 Minutes	This is short and sweet. It might not actually be that sweet, because I don't know everything, but I do know that it's short.	0	3	2013-11-22 09:50:02	2013-11-22 09:50:02	1	1
5	5 Minutes	You can almost set you watch to this game, which may or may not actually be a part of it.	5	5	2013-11-22 09:57:26	2013-11-22 09:57:26	1	1
6	Thirty minutes or more	This is a long game, probably enough to be the entire content of a show.	30	45	2016-02-02 17:02:21.26505	2016-02-02 17:02:21.26505	1	1
7	Long Form	This is a Long Form style game, which means it will be, well, long. We're talking 20 to 40 minutes, depending on how good you are at editing scenes.	20	40	2016-02-03 02:06:21.526934	2016-02-03 02:06:21.526934	1	1
8	n/a	This is either a modifier of other games or some sort of conceptual thing that doesn't really involve a duration. This probably wasn't terribly helpful, but you're still reading it anyway.	0	0	2016-02-04 19:54:54.835961	2016-02-04 19:54:54.835961	1	1
\.


--
-- TOC entry 2650 (class 0 OID 0)
-- Dependencies: 173
-- Name: duration_DurationID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"duration_DurationID_seq"', 8, true);


--
-- TOC entry 2600 (class 0 OID 3398634)
-- Dependencies: 174
-- Data for Name: game; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY game ("GameID", "DateModified", "DateAdded", "Description", "DurationID", "PlayerCountID", "AddedUserID", "ModifiedUserID", "ParentGameID") FROM stdin;
2	2013-11-04 21:08:34	2013-11-04 21:08:34	"Freeze" is the most classic improv game.  Two players start a scene, and at some point another player freezes the scene.  The two original players freeze exactly where they are, and the third tags one of them, assumes their position exactly, and starts a completely new scene that has nothing to do with the original scene.  This has several variations.  See "Blind Freeze," "Anti-Freeze," and "Last Line Freeze."	2	6	1	1	\N
176	2016-09-19 19:48:49.873911	2016-09-19 19:48:49.873911	<p>Two players get an item from the audience. It should just be some sort of simple household object or something. Now they perform a rudimentary scene inspired by the home shopping channel, demonstrating a brand new version of the suggested product.</p>\n\n<p>Take turns announcing amazing things that the product can do, building off the last thing your partner said. For example, if we were demonstrating a new spatula,</p>\n\n<p>"This spatula is really big. Huge."</p>\n\n<p>"Yes, and it is so big, you can actually fit an entire New York Style pizza right on top!"</p>\n\n<p>"Yes, and it also cooks that pizza, right there on the spatula!"</p>\n\n<p>"Yes, and it remains lightweight even if you have an entire pizza on top!"</p>\n\n<p>"Yes, and it manages that by these sophisticated anti-gravity units built into the bottom!"</p>	1	1	1	1	\N
5	2013-11-10 16:08:03	2013-11-10 16:08:03	Often called "3 Things" or "5 Things," this game works with a simple premise.  One member leaves the performance area, and two more members get suggestions for simple activities.  Common, easy to guess items in the activities are replaced by more suggestions, resulting in bizarre activities that the first member is then required to guess.  The activities must be explained to the first member using mime and gibberish only.  Activity suggestions include "skydiving with an elephant as a parachute."  The main variation is the number of activities taken (usually 3 or 5).	1	2	1	1	\N
6	2013-11-10 16:09:56	2013-11-10 16:09:56	Two or three players perform a normal scene.  Each line of the scene has to start with the next letter of the alphabet than the one before it.  The first line of the scene starts with a letter given by the audience.	1	1	1	1	\N
7	2013-11-10 21:52:27	2013-11-10 21:52:27	Players take turns ranting about things that really annoy them, usually suggested by the audience. How the rants flow is up to you, whether you have a host which cuts people off, or you just let people flow from one rant to another.	1	4	1	1	\N
8	2013-11-10 22:04:38	2013-11-10 22:04:38	One player leaves the room. The audience then gives the name of a celebrity, and some crazy crime that the celebrity committed. The player returns, and everyone else disperses themselves throughout the audience. The players in the audience act like members of the press, and ask questions to the celebrity about the crime committed. The questions should be phrased to allow the celebrity to guess who he is and what he did.	1	4	1	1	\N
9	2013-11-10 22:09:51	2013-11-10 22:09:51	Two random and separate audience members are interviewed about dates they've been on.  Very intricate details are recorded, and then the group shows everyone what it would be like if the two audience members dated each other.  Two group members are designated as the "couple," and the other members are supporting characters.	2	6	1	1	\N
10	2013-11-10 22:12:21	2013-11-10 22:12:21	This game works just like Freeze, with one key difference. While a scene is going on, every other member of the group is standing toward the wall, with their back to the scene. The idea is that none of the players know what is actually happening in the scene, so they will randomly freeze it whenever the audience has a big laugh.	2	6	1	1	\N
11	2013-11-11 18:04:30	2013-11-11 18:04:30	Anti Freeze works on the same principal as regular Freeze, with one major difference. Each consecutive scene takes place before the first one. This game is a pseudo long form, because the story could continue (in reverse order) through many scenes.	2	6	1	1	\N
13	2013-11-11 18:08:26	2013-11-11 18:08:26	The audience gives a slew of emotions, and someone writes them all down.  As three players do a scene, someone yells out emotions at various times.  When an emotion is called, the players continue the scene with that emotion.	1	2	1	1	\N
15	2013-11-11 18:11:34	2013-11-11 18:11:34	A rectangular area is marked off with chairs or tape, etc. Two improvisers stand at opposite ends of the area. One is blindfolded. An obstacle course of improvisers, chairs, and props is assembled in the area. The sighted improviser guides the other through the course without touching any of the obstacles. Three touches and the game is over. It is good to have a time limit on this exercise.	1	5	1	1	\N
17	2013-11-11 18:14:51	2013-11-11 18:14:51	One player stands in front of another player. The player in front wraps his arms around the player behind. The player behind then uses his own arms as the front player's arms. Works best in a sort of talk show environment, where the two players are some sort of expert.	1	5	1	1	\N
18	2013-11-11 18:16:16	2013-11-11 18:16:16	Two players are the hosts of a movie critic type show.  They are critiquing a new movie, which is based on the audience's suggestions.  They talk about scenes and things about the movie, and, just like a critic type show, they cut to clips of the film.  Those clips are brought to life by the rest of the group.	1	6	1	1	\N
19	2013-11-11 18:19:10	2013-11-11 18:19:10	A short scene is played. The improvisers then ask the audience if they want to see the scene that came before the scene they saw, or after. The improvisers then play that scene. Once again, the audience is asked and the third scene is played. If the audience choice leads to the improviser repeating a scene, they can add something or inform the scene with something from the earlier scene.	2	1	1	1	\N
20	2013-11-11 18:25:31	2013-11-11 18:25:31	All onstage improvisers wear blindfolds while playing the scene. They act as though they were sighted and the scene was a normal scene. For the sake of safety, the stage should be lined with spotters to make sure the onstage players do not walk off the edge of the stage.	1	1	1	1	\N
21	2013-11-11 21:42:43	2013-11-11 21:42:43	One brave audience volunteer is selected from the audience.  That volunteer is asked to tell the group about what he did that day, including as many details as possible.  The group then acts out his day as if it were a nightmare.  One player serves as the "patsy" playing as the volunteer the entire game.	1	4	1	1	\N
22	2013-11-11 21:45:36	2013-11-11 21:45:36	A regular scene takes place, except the first line and/or last line has to be a line or event given beforehand.	1	1	1	1	\N
16	2013-11-11 18:13:10	2013-11-11 18:13:10	<p>Two players do a normal scene, with a twist.  Each player is given a secret animal (whispered into their ears), and they have to develop a character based on that animal.  They should not actually be the animal.  They should be a human inspired by the animal.</p>\n\n<p>The game "Totems" works similarly, but with given totems instead of just animals.</p>	1	1	1	1	\N
26	2013-11-21 15:29:59	2013-11-21 15:29:59	The scene starts with two players, or three if that's your pleasure.  Everybody has someone else off-stage who is their double.  Somebody off-stage yells "switch" at various times during the scene, which causes everyone to switch with their double.  Players on stage switch with their doubles off stage (or on stage, if their double is on stage as well), and so on.  Everyone is allowed to walk into the scene, so by the end, everybody is on stage.  All of the players will have two characters in the scene (one that they created and one that their double created).  As more players are on stage, the caller calls "switch" more often, causing what looks like partially organized chaos.  By the end, the players switch roles every few words.  This seems like a very complicated game, but it is much simpler to play than it looks, making it a very entertaining experience for audiences.	1	10	1	1	\N
28	2013-11-22 09:28:16	2013-11-22 09:28:16	One improviser leaves the stage and the remaining improvisers get crazy traits, characters, or whatever from the audience. For example, maybe somebody only speaks in rhyme, or somebody is deathly afraid of prepositions. The offstage improviser (the "guesser") returns and starts a scene as the host of a party. Each other improviser enters one at a time and shows off their "quirk." The improviser tries to guess what everyone's deal is. When he guesses correctly they come up with a reason to leave. It works best with four people (one guesser, and three weirdos).	1	12	1	1	\N
29	2013-11-22 09:38:22	2013-11-22 09:38:22	Two improvisers take turns getting a secret about the other from the audience. Obviously the other player has to plug his ears or whatever to not hear his secret. They then do a scene and try to get the other to figure out and embody their secret. For example, person A learns that person B really hates ice cream, so A has to try to get B to refuse ice cream in the scene. It's more fun if they don't just guess what their secret is, and instead start to play as if it was always the case.	1	1	1	1	\N
30	2013-11-22 09:45:50	2013-11-22 09:45:50	Three players take turns getting a "trigger" from the audience. For example, person A might have to give person B a hug every time he agrees to something. They then do a scene. There's no guessing required, really, it's just fun to watch them figure out each other's triggers and then mess with each other. Also sometimes a scene will erupt into chaos when everybody's trigger goes off at once. You could play this with two, just like any scene, but having a three-way trigger explosion is pretty great.	1	2	1	1	\N
32	2013-11-22 09:51:15	2013-11-22 09:51:15	Two players sit opposite each other in chairs.  They conduct a normal conversation.  Two other players try to do whatever they can (within reason and safety) to make the two players lose their concentration.  As soon as one of the players laughs, they lose.	1	7	1	1	\N
179	2016-11-28 15:24:57.394712	2016-11-28 15:24:57.394712	<p>Two (or more) people do a normal scene. At any point during the scene, a player can tap the shoulder of an audience member (or another team-member on stage). The person tapped supplies the player's next line, saying the first thing that comes to mind. The players must then justify why they would say such a thing. Feel free to wander around among the audience, to give you better access to them.</p>	1	5	1	1	\N
34	2013-11-22 09:54:53	2013-11-22 09:54:53	Players get in a line, and one stands in front as the "conductor."  Each player gets something to complain about.  The conductor conducts them just like a symphony, but instead of music, they're bitching about something.  The conductor has to try to make it sound good.	1	4	1	1	\N
36	2013-11-22 09:57:34	2013-11-22 09:57:34	Three players perform a normal scene in exactly two minutes (someone on a stopwatch makes sure the time is exact).    After that, a different set of three players performs the exact same scene, but in only one minute (obviously the scene won't be exact, but it should have all of the same elements).  The first group comes back, and does the same scene again in thirty seconds.  The second team then does the scene in fifteen seconds.  Then the first team does the scene in 7.5 seconds.  Finally, the second team returns to do the scene in 15 seconds backwards.	5	9	1	1	\N
37	2013-11-22 09:58:08	2013-11-22 09:58:08	The players get into a line and tell jokes about suggestions based on the following formula:  "I saw a movie about [suggestion] that was SO BAD!" Audience: "How bad was it?" "It was so bad, [hilarious pun based on the suggestion]!"	1	4	1	1	\N
35	2013-11-22 09:55:30	2013-11-22 09:55:30	<p>The players get into a line, and one stands in front of them as the "conductor."  They get either a topic or the name of the story, and then the conductor points to one of the players.  The player he points to begins telling the story.  At some point, the conductor points to someone else, and the first person immediately stops (mid-sentence or even mid-word), and the next person immediately picks up where the first left off (mid-sentence or even mid-word).  The game can be played where if a player messes up, he or she has to sit down, and the story continues until only one player remains.</p>\n<p>Try it with singing!</p>	1	4	1	1	\N
27	2013-11-22 09:19:39	2013-11-22 09:19:39	Two players are acting out a scene from a movie (it's a made-up movie, obviously).  The twist is that the movie is in some foreign language, taken from the audience.  Two more players sit off-stage, providing the English language "dubbing" to the foreign language spoken lines. Yes, the foreign languages are just gibberish, but try not to be too offensive about it. Start this game with a suggestion for a foreign language and the title of the movie. I like to combine book and movie titles, or just get an activity, and call the movie that.	1	7	1	1	\N
38	2013-11-22 09:59:38	2013-11-22 09:59:38	Four players act out four scenes.  Each scene is set in a different time period (taken from the audience).  In each scene, as the scene progresses, one of the characters dies.  When that happens, the players switch to the next scene.  Once someone has died in each scene, they go back to the first scene, and directly continue it where it left off, with the dead player returning exactly where and how he died.  This continues until all four players have died in all four scenes.  The last player in each scene has to commit suicide (or accidentally die) somehow.	2	12	1	1	\N
39	2013-11-22 10:03:47	2013-11-22 10:03:47	This game works just like the show "Dating Game."  One player is the "bachelorette" and another three players are "bachelors."  Each bachelor gets some sort of ailment, either a debilitating disease, a famous person, they think they're somewhere else, or whatever.  The bachelorette asks each bachelor questions, hopefully things that will set off the bachelors' conditions.  You can play it where the bachelorette doesn't know what is going on with each bachelor, so "she" has to guess at the end. You can also have the "bachelorette" be an audience member, and then force them to actually go out with the player they choose. Another player has to be the "host" of the show, to keep it running smoothly.	2	13	1	1	\N
40	2013-11-22 10:05:17	2013-11-22 10:05:17	See "Nightmare."  You get a person's day, and then you act it out for them.  I guess the idea is that you throw in the hilarity of an improv comedy group, so it's actually interesting to re-watch the day you literally just lived. Establish one player as the person who's day you're re-enacting.	1	4	1	1	\N
41	2013-11-22 10:09:33	2013-11-22 10:06:47	One player starts this game, and three more enter the scene as walk-ons at some point. Each walk on says a line or two, and then drops dead on stage (the lines could justify why they die, but they don't have to).  The first player then continues the scene, using the "dead" players basically as puppets. Yes, it's kind of creepy, and yes it's kind of tiring for the person who is still "alive."	1	11	1	1	\N
42	2013-11-22 10:09:16	2013-11-22 10:09:16	Two players conduct an interview, with one being an interviewer, and the other being some sort of expert on a topic given by the audience.  A third player interprets the entire conversation for the hearing impaired, using a made-up sign language.	1	11	1	1	\N
43	2013-11-22 10:32:39	2013-11-22 10:32:39	This line game works just like the song "Do Run" where lyrics go, "I met a girl and her name was Jane [do run run run, a do run run].  She took the wings off of her plane [a do run run run, a do run run]. Oh, she had a mane [a huh huh] oh, she was really vane [a huh huh], she had severe back pain [a do run run run a do run run]."  Get a one syllable name or noun from the audience.  Go down the line singing verses that rhyme with that name.  The first person  just has to say the name or word ("I met a girl and her name was Jane."), and every third person has to do three in a row.  When someone fails, they are knocked out and you get a new word.  When only one player is left, that one is the "winner."  You can also do it like a rap (if you hate that song as much as I do).  Say "a-do rap rap rap" instead.	1	4	1	1	\N
44	2013-11-22 10:35:02	2013-11-22 10:35:02	Two or three players do a regular scene of a couple minutes.  Then they (or different players) do the exact same scene, but with an emotion given to them by the audience.  Do a couple replays, with different emotions.	1	5	1	1	\N
45	2013-11-22 10:37:24	2013-11-22 10:37:24	Like "Symphony" or "Bitch Concerto."  The players get in a line and each one gets an emotion (happy, sad, etc).  A "conductor" stands in front of them and conducts them like an orchestra.  Each player conveys that emotion some way that contributes to the chorus, and the conductor conducts it into a sweet song.	1	4	1	1	\N
46	2013-11-22 10:39:19	2013-11-22 10:39:19	Three zones are identified on stage (usually the left, center, and right thirds of the stage).  Each zone is labeled with an emotion.  Some people perform a normal scene, and they convey the emotion that  is identified by whichever zone they are standing in.  When the move around the stage, their emotion has to change.  The players must justify the emotion changes. I guess they don't have to justify the changes, but that's a little cheap, don't you think?	1	5	1	1	\N
48	2013-11-22 10:41:06	2013-11-22 10:41:06	Like the cold, emotionless steel waiting impatiently under my coat, the pitiless cries of contempt from the audience serve only as a reminder that I am and have always been eternally damned.  I watch as a wisp of smoke flows out of my partner's mouth, the half-finished cigarette pinched between stained fingers.  I tell the audience about my pain, describing the never-ending ballet of death that is my fate, and then I realize it.  I'm not a private eye; I'm not a cop.  I'm an improv comedian, and this whole thing was just some sort of sick joke meant to entertain.  Well I don't feel entertained . . . I don't feel anything.	1	5	1	1	\N
49	2013-11-22 10:42:11	2013-11-22 10:42:11	A normal scene is started.  At some point, someone offstage can call "reverse" and the scene moves backwards.  Players don't have to actually talk backwards, just say sentences in reverse order.  The caller can then call "forward" and the scene continues, repeating whatever they just did backwards.  The caller can call forward and reverse at any time, and the scene can even go back in time to before the scene started. Works best if everybody is as active as possible.	1	5	1	1	\N
50	2013-11-22 10:43:15	2013-11-22 10:43:15	One player sits in a chair, and everyone else lines up.  The players go through the line, trying to make the player get up so that they can take the seat.  You can't touch the sitting player; you have to say something or do something that would make sense.	1	5	1	1	\N
51	2013-11-22 10:47:38	2013-11-22 10:47:38	Called "GABAWA" for short, this game works like a talk show.  Three players stand on stage, and each one gets some sort of character from the audience (a historical figure, someone you're afraid of, etc).  The audience asks questions, and the players answer them.  The first player gives good advice, the second player gives bad advice, and the third player gives the worst advice.  This is a game of "one-upping" the other players.  Give advice that would make sense as your character.	1	2	1	1	\N
52	2013-11-22 10:48:58	2013-11-22 10:48:58	Four people tell a story.  This isn't meant to be funny, but it usually ends up being a lot of fun.  Get some sort of event from the audience, and then tell the story like the four of you were there.  Let it happen, collaborate, and enjoy it. This makes for a good set up for longform.	1	12	1	1	\N
53	2013-11-22 10:49:48	2013-11-22 10:49:48	One player leaves the area.  Two players remain.  The audience supplies a famous person, and some ridiculous crime that was committed to the famous person.  The outside player returns; he is the one who committed the crime (which he doesn't know about).  The two other players interrogate him, giving him clues about who he is and what he did.  The player being interrogated has to figure out what he did and to whom.	1	2	1	1	\N
54	2013-11-22 10:50:57	2013-11-22 10:50:57	One player goes outside.  The rest of the players get a suggestion for an historical event.  Each player then gets assigned a famous person from that historical event.  The outside player comes back in,  and everyone on stage performs an interpretive dance for that player, acting out the famous event as the people they are supposed to be.  The player watching then has to guess what the event is and who everybody is supposed to be.  You can also play it where an audience member has to guess what is going on, or do two versions, one for a an audience member, and then one for a player (with the Audience Member included in the second dance).	1	4	1	1	\N
55	2013-11-22 10:52:02	2013-11-22 10:52:02	Players do a regular, ~2 minute scene.  Then they redo the scene (exactly as it was), except styled like various film genres given from the audience. See also "Emotion Replay" or "Countdown."	2	5	1	1	\N
56	2013-11-22 10:53:28	2013-11-22 10:53:28	Players do a regular scene. They break into song, just like in a musical. It works best if you have some sort of musical accomp - acomp - acump . . . somebody who can play music to back you up.	1	5	1	1	\N
57	2013-11-22 10:54:18	2013-11-22 10:54:18	Two people do a normal scene. The twist is that they can only ask questions. You can make it more interesting with a "knockout" feature. If a player fails to ask a question, they are "out" and they switch with someone off-stage. The scene then continues until someone fails to ask a question.	1	5	1	1	\N
3	2014-12-01 19:11:20.184	2014-12-01 19:11:20.184	<p>Two players start a totally regular scene. However, at any point during the scene, after a player says a line (or does an action), somebody off-stage can ring a bell (or yell "ding" or "new choice" or whatever you feel like). When a player gets a "ding," they throw away the last thing they said, and say something entirely different. The scene continues from there, as if the last thing said was what was actually said.</p>\n\n<p>For example, Player A says, "Hey, you sure are late to this meeting."</p>\n\n<p>Player B responds, "I had to tie my shoes - (DING) I had to catch the bus - (DING) A dinosaur attacked me (DING) My rocket ship ran out of plutonium."</p>\n\n<p>Player A might then say, "well I told you to stop at the plutonium station on your way back to your orbital station last hyper-cycle!"</p>\n\n<p>Often, the person ringing the bell will go on a run, "ding"-ing several times in a row. Also, don't limit yourself to just words or phrases - you can "ding" an action, too!</p>	1	11	1	1	\N
59	2013-11-22 10:57:05	2013-11-22 10:57:05	The players stand in a circle, and one by one, each player goes around the entire circle, facing each player. When the center person faces you, you yell a syllable (any syllable or sound) and the player in the middle yells another syllable. Everyone puts them together into a word, and then the player in the center moves to the next player. It helps to add a "do-do-do" after everybody repeats the word to keep a rhythm going. For example, person A goes to person B. Person B yells "Sand" and then person A yells "Which." Everybody yells "SANDWICH (do-do-do)!" and A moves on to the next person in the circle.	2	4	1	1	\N
25	2013-11-12 15:23:01	2013-11-12 15:23:01	<p>Two players leave the stage, and four more players get suggestions for an adverb, a verb, and a noun.  The term "Quickly Running Rabbits" can be used to remember what words are needed.  The two outside players return, and they debate with each other about the suggestions.  They take turns, while someone calls "switch."  The four players who know the suggestions team up and use mime and gibberish for each debater to try to get them to say the three words.  At the end, the "winner" is the first one to say all three suggestion words.</p>\n\n<p>Remember, this is a debate, not just a game of charades. The two "debaters" should do their best to continue the debate, working their guesses and questions to their partners into the "scene."</p>\n\n<p>Instead of a debate, you can play this game in the style of a sermon, or even try a "Home Shopping Network" style infomercial!</p>	1	9	1	1	\N
61	2013-11-22 10:59:18	2013-11-22 10:59:18	Players do a normal scene. However, each one gets a number (between 0 and 12 or so), and can only say that many words at a time. Every time each person speaks in the scene, they have to use exactly that many words.	1	5	1	1	\N
70	2014-12-01 22:30:09.836	2014-12-01 22:30:09.836	Two audience members are interviewed and we establish a handful of facts about their interests, friends, or whatever. Then two players play a scene as the audience members (using the information provided by the audience members) meeting each other for the first time. After a few moments, we jump forward a given period of time to see how their relationship has progressed. We see a few of these time jumps. Try to not just make fun of them, please.	2	5	1	1	\N
62	2014-12-01 21:29:13.184	2014-12-01 21:29:13.184	In this game, three players are putting on a scene. However, during the scene, one of the players must be sitting, another standing, and the last lying down. They can (and should) switch positions throughout the scene, and then justify why such things are happening.	1	2	1	1	\N
64	2014-12-01 21:37:21.962	2014-12-01 21:37:21.962	Two (or whatever) players do a normal scene. However, as the scene progresses, a caller (or the audience, whatever) yells out different TV, Movie, or Whatever genres. The scene then continues as that genre.	1	11	1	1	\N
65	2014-12-01 21:42:33.379	2014-12-01 21:42:33.379	In this warmup game, the players form a circle and choose one player to be "it." The "it" player then confronts the players in the circle and yells "WHERE ARE YOUR PAPERS" in the best German Accent they can muster. The confronted player responds with "ZEY ARE IN MY ATACHÃ©." Meanwhile, as the "it" player is distracted with this daunting task, players behind his back should be making eye contact with other players in the circle. When eye contact is made, the two players should immediately switch places with each other. If the "it" player notices this happening and steals one of the moving players' positions, the player stuck in the middle is now "it."	3	14	1	1	\N
66	2014-12-01 21:53:47.919	2014-12-01 21:53:47.919	Two pairs of players are in this game. The first pair starts a normal scene, but throughout it they say stuff like "I wonder what so-and-so is up to" or "I wonder what happened to those drunk dudes after we left the bar" or "I wonder if I could beat you in a fight." The first pair then switches with the second, who then shows what the first pair was wondering about.	1	7	1	1	\N
67	2014-12-01 22:03:30.716	2014-12-01 22:03:30.716	Two players start a normal scene. However, throughout the scene, a third player on the sidelines narrates what one of the players on stage is thinking. For example, a player on stage might ask "how does this dress look?" The other player might respond, "oh, that's nice." Then the player offstage might say, "that is the most unflattering dress I've ever seen." For more fun, show the inner thoughts of both players on stage!	1	11	1	1	\N
68	2014-12-01 22:21:29.388	2014-12-01 22:21:29.388	A player gets a strange name (Four-finger Pete, Big Greg, Yellow Shirt Guy, whatever). They then have to develop a character based on the name. After a few minutes, hopefully after establishing as much as possible about this strange character, the player gets a new name and creates an entirely new character. Try also throwing the player into the context of simple, every day settings to give them something to work with.	1	4	1	1	\N
69	2014-12-01 22:26:04.641	2014-12-01 22:26:04.641	Two players begin a scene stranded at some given location. They discuss details of how they were stranded, providing clues and tidbits to draw from, such as "I can't believe so-and-so attacked us," or "I don't even remember how you lost your foot." After a few moments of establishing their desperate situation, they start anew, back in time to before whatever happened happened. We then get to see the whatever happening. Other players can enter to provide additional support to the chaos.	2	5	1	1	\N
71	2014-12-01 22:33:25.986	2014-12-01 22:33:25.986	One player sits in a chair, "watching TV." The other players reinact what the first player is watching. The "watcher" can yell "CLICK" or whatever to change the channel, and the players have to change to a completely different thing. Players can switch out on "screen" to vary the programming. You can play "elimination" style by kicking players off stage if they hesitate to provide something on a new channel immediately.	2	4	1	1	\N
72	2014-12-01 22:40:32.211	2014-12-01 22:40:32.211	Three players stand on stage to debate a given topic for a set time limit (usually like 90 seconds). A fourth player moderates the debate and watches the clock. One debater speaks at a time about the topic, and the others can at any time yell "challenge!" The time is paused and the challenger is allowed to explain why the speaker screwed up. If the moderator (and / or audience) deems the challenge valid, the challenger steps up and continues the debate. Whichever debater is speaking when the time runs out wins! They are the master debat - oh, nevermind.	4	15	1	1	\N
73	2014-12-01 22:46:41.139	2014-12-01 22:46:41.139	Two players play this game, a doctor and a patient. First the patient leaves the room and the doctor gets an illness and method of contraction from the audience. The zanier (and less like an actual illness) the better. Then the patient returns and the doctor leaves. The patient gets the cure for the illness and what side-effects it has (hopefully without the audience giving away the illness). The doctor returns, and they conduct a doctor-patient scene (which is apropos since they're a doctor and a patient). The patient first tries to guess their illness and how they got it. Then the doctor has to guess how it's cured and what the side-effects are. For added excitement, time each player and announce how long it took them after they succeed so we can see who is the better guesser or whatever.	2	1	1	1	\N
74	2014-12-01 22:49:37.72	2014-12-01 22:49:37.72	A player starts a scene by getting a phrase from the audience (or other group members, since this is more of an exercise). The player then can only interact in the scene by using that phrase. Try coming up with a few different characters to justify the phrase.	1	4	1	1	\N
75	2014-12-01 22:55:04.813	2014-12-01 22:55:04.813	Each player takes turns telling a small part of a story, the title of which is given by the audience. The trick is that a player doesn't have to tell the chronologically next piece of the story on each turn. On his or her turn, a player stands somewhere along a line across the stage, generally indicating the position of their part of the story. When each player steps forward, the players already in place tell the entire story so the new player can include his or her piece in order. As each player comes out, the story slowly starts to come together and (hopefully) makes more sense. When a player stands between two others, their piece should theoretically or to some extent connect the adjacent parts together.	3	4	1	1	\N
76	2014-12-02 10:07:29.411	2014-12-02 10:07:29.411	Two players stand at the front of the stage as "presenters" (it can be just one player I guess if you're strapped for people). The presenters introduce themselves (as zany characters) and prepare the audience for a slideshow of photos from their recent vacation. The presenters' vacation destination and a famous person they met on their trip are taken as suggestions from the audience. Now the presenters show their slides, which are presented by the rest of the group forming a tableau on stage. The presenters proceed to narrate what is happening in each picture. The presenters should remember to tell the story of how they met the given celebrity. It helps to have control of lighting so the presenters can turn the lights off and on to signify the changing of  the slides.	1	6	1	1	\N
77	2014-12-02 10:14:01.323	2014-12-02 10:14:01.323	Three players start a scene in a car, sitting in four chairs arranged like the front and back seats. Soon a fourth player enters as a hitchhiker, and the car pulls over to pick them up. The hitchhiker takes on a wild and crazy character trait which the other people in the car should adapt and heighten. After all four players have fully embraced this character trait and had some fun with it, the driver of the car leaves and everybody moves up one seat (the passenger becomes the driver, the guy in the back seat moves to the front, and the hitchhiker moves over). Another player then arrives as another hitchhiker, with a different character trait, and the process is repeated. This process continues until everybody has had a chance to come up with a character (the initial three people in the car should go to the back of the line - they will be the last three players to come up with a character).	2	4	1	1	\N
78	2014-12-02 10:21:40.084	2014-12-02 10:21:40.084	One player (the "employee") leaves the room, leaving four players on stage (a "boss" in a chair and three "co-workers" behind his back). These four players get three "excuses" from the audience - the way the employee tried getting to work, something that happened causing that way to fail, and another event that allowed the employee to get to work after all. The employee then returns, excusing himself for being late. The "boss" yells at the employee for being late, and the other three "co-workers" silently act out the excuses to the employee behind the boss's back. The employee must guess the three excuses by interpreting the co-workers.	2	13	1	1	\N
80	2014-12-02 10:32:01.7	2014-12-02 10:32:01.7	Five players play in this scene, but only one starts it. The first player starts a simple one-person scene based on the audience suggestion. When the second person enters, they start an entirely new scene with the two of them. This continues with the rest of the players, starting an entirely new scene with each entrance. After a few moments of all five players on  stage, the fifth leaves the scene (with a proper justification, of course), and we return to the same four person scene that was started earlier. The fourth player leaves, returning us to the three person scene, and so forth until we are back to the first player, who finishes his solo scene.	2	13	1	1	\N
81	2014-12-02 10:37:52.621	2014-12-02 10:37:52.621	This game is played like a goofy infomercial, with a cheesy host introducing each player. The players enter one at a time as inventors to show off their amazing new inventions. Before the game starts, the host gets a handful of nouns, verbs, and international locations. The host then uses those suggestions to introduce the three inventors as being from [LOCATION], and having invented the [NOUN] [VERB]er. For example, if some suggestions were "Plastic," "Wipe," and "Austrailia," the host would say "our next guest is from Australia, and he invented the 'Plastic Wiper!'" The inventor then takes a few minutes to talk to the host about themselves and demonstrate their invention and what it does (don't forget to tell everybody where they can buy it and how much it costs!). The host then says goodbye to the inventor and rouses the audience to all say along with him, "WHAT WILL THEY THINK OF NEXT?!"	2	12	1	1	\N
82	2014-12-02 11:18:27.773	2014-12-02 11:18:27.773	Two or three players do a normal scene, with a twist. Before the scene, collect a bunch of slips of paper and have the audience write phrases on them - movie quotes, things they heard, lines from books, poetry, whatever. Randomly throughout the scene, the players can pull these slips of paper out of their pockets and read the lines aloud, as if they had just said them. They then have to justify why they say such wacky things.	2	1	1	1	\N
84	2014-12-02 11:28:29.236	2014-12-02 11:28:29.236	The players establish a bathroom, one by one. On his or her turn, each player enters a completely imaginary bathroom, completes some action (washing his face, combing his hair, taking a shower, brushing his teeth, etcetera), and then leaves the room. The next player then enters, completely replicates everything that has been done already, and adds another action to the end. By the last player, hopefully a very detailed and well-established bathroom has been created.	2	4	1	1	\N
85	2014-12-02 11:31:48.426	2014-12-02 11:31:48.426	The players form a line and take suggestions for things (literally anything) from the audience. They then take turns showing examples of the worst possible one of those things. For example, if a suggestion was "Breakfast Cereal," a player might step forward and mime eating from a bowl while saying, "mmm, glass!" Once a few things have been done with a suggestion, take a new one.	1	4	1	1	\N
87	2014-12-02 14:31:10.212	2014-12-02 14:31:10.212	This game is an exciting televised sporting competition - well, sort of. You start by getting a mundane, every day activity. That activity is now the cut-throat sport being played in this high-stakes match. Two players act as commentators (to be true to sporting events, one commentator should be a play-by-play announcer and the other should provide color commentary). Another two players are the athletes, competing in a world championship of whatever mundane activity you got. The athletes should operate entirely in slow motion, being careful to match their speeds by shaking hands to start the match. As the match goes on, the mundane, "boring" activity will become much more "full contact" and violent, until basically one of the competitors is physically unable to finish the match, or one of the players is disqualified for doing some ridiculous thing. Feel free to have a ref enter at some point (also in slow motion) to manage things. Also feel free (as the commentators) to pause the action, show replays, zoom in, or otherwise call the shots. 	2	7	1	1	\N
90	2014-12-04 09:52:21.046	2014-12-04 09:52:21.046	The players stand on stage in a line, and get a series of suggestions for basically anything from the audience. Then players take turns stepping forward and giving their best action movie catch phrase (if there was an action movie based on the suggestion). For example, if the suggestion was "hot dog" a player might say "Sorry to be so frank!" Bring out your best Arnold Schwarzenegger impersonations!	1	4	1	1	\N
91	2014-12-14 18:28:46.179	2014-12-14 18:28:46.179	Two pairs of players (that's two teams of two) take turns using props in different, perhaps surprising ways. Each team gets a different prop, and they should be something strange and unrecognizable (but big enough to be seen by the audience). When demonstrating the prop, the players should keep it short, just giving a single line while holding the prop. For example, if the prop were a large cone-shaped object, a player could step forward and hold it in front of their mouth, shouting "go team!" Just watch Whose Line, they do this game all the time.	1	7	1	1	\N
92	2014-12-14 18:36:45.763	2014-12-14 18:36:45.763	Everybody gets in a big, old circle, and then everybody holds up all ten of their fingers (or however many they have - I don't want to be offensive to anybody with missing fingers). Now take turns asking random yes or no questions to the group. Each person gets to ask one question, in whatever order you want. How do you determine who gets to ask a question? I don't know, man, just start somewhere and go around the circle. I'm not the boss of your circle. When you can't (that's CAN NOT) answer "yes" to a question, you drop a finger. The last person with a finger still up wins! What do they win? The ability to flip everybody off, I guess.	1	4	1	1	\N
102	2014-12-15 18:17:25.588	2014-12-15 18:17:25.588	The players form a circle. That is, the players stand in a circle. That is, the players stand around in a circular pattern, all facing inward. Just get in a circle. Now go around the circle and introduce yourself. You have two options, which are as follows: say your name and a word that rhymes with your name ("Karin Starin'"), or say a word that alliterates with your name ("Calamity Karen"). You can also throw a gesture in there too, knock yourself out. Each consecutive person around the circle then repeats the name, alliteration / rhyme, and action of everybody who was before them, and adds their name and whatever to the end. Yes, the last poor sap in the circle has to do everybody.	3	4	1	1	\N
104	2014-12-16 09:56:59.76	2014-12-16 09:56:59.76	It has "Circle" in the name, so you should know what to do (hint: get in a circle). One player starts by pointing at somebody and saying the letter 'A' at him. That player then points to somebody else, and says 'B.' It continues like this, passing letters around, for the entire alphabet. Do it as fast as you can!	1	4	1	1	\N
105	2014-12-16 10:05:40.225	2014-12-16 10:05:40.225	Everybody wanders about the space, just aimlessly milling about. Eventually, everybody should pick somebody at random to be their 'enemy.' Without saying anything to your enemy, keep milling about the space but constantly work to keep your enemy on the other side of the space - stay as far away from that jerk as possible. Now everybody should pick somebody else to be their 'friend.' Keep wandering around, but now work to keep your friend between you and your enemy. Chaos ensues, but in a sort of controlled, interesting way.	4	4	1	1	\N
120	2014-12-17 15:15:56.002	2014-12-17 15:15:56.002	Two or three players start doing a regular scene, each wearing a different hat. At some point a caller will freeze the scene and switch the hats around. Then the scene continues, with each player continuing as the character who last wore the hat. They should justify why they switched around. Try not to make it some weird sci-fi teleportation thing.	1	11	1	1	\N
94	2014-12-14 18:54:16.157	2014-12-14 18:54:16.157	<p>Somebody starts (which really is the case for basically anything that ever happens, I guess), stepping forward and declaring that they are a thing, for example "I am a piece of cheese." Another person joins them and claims to be a complimentary item, for example "I am a piece of bread." Finally, a third person enters and further compliments both existing items, saying something like, "I am a slice of bologna."</p>\n\n<p>Two of the people leave (oh, let's just say the first two), and the remaining person declares their identity again, "I am a slice of bologna." Two other people enter and form a new triad around that thing, perhaps, "I am a slice of ham," and "I am a pimento." Keep doing that for a while, until you get bored or something.</p>	1	4	1	1	\N
95	2014-12-14 18:58:47.046	2014-12-14 18:58:47.046	First, everybody should get all up in a circle. Now somebody turns to their left and faces that person. The first person then does some sort of action (preferrably with a sound effect). The second person then turns to the next and PERFECTLY repeats the action and sound. The second person likewise turns to the next and EXACTLY replicates the action they just saw. The goal here is to try to be as exact and precise (and other synonyms) as possible, so each time the action is done it is exactly the same. Obviously, however, that won't be the case, as everybody adds their own oddities (either intentionally or unintentionally) to the mix. Just focus on repeating the action you just saw, dis-ir-regardless of what has come before. By the end, the action will have mutated into something beautiful.	1	4	1	1	\N
97	2014-12-15 17:36:58.735	2014-12-15 17:36:58.735	Two players start a regular old scene. At some point, however, the scene freezes (maybe somebody offstage calls it, or whatever, you can figure that out), and two different actors replace the ones in the scene. The scene continues with the exact same characters and the exact same situation, just with two different actors. You can keep switching them out occasionally until you get bored or the scene comes to a close or whatever.	1	5	1	1	\N
98	2014-12-15 17:46:18.258	2014-12-15 17:46:18.258	A player starts a solo scene, or two players can start a scene together. At some point, usually after doing some sort of action, someone offstage can ring a bell or clap their hands. When this happens (the ring or the clap), the player has to commit to performing the action they were doing in the absolute most serious, exciting, or interesting way possible. Even if it's something as simple as walking across the stage, they have to walk the house down. This single, specific action continues, without changing to anything else (in other words, if the action is picking something off a shelf, that's the action - you can't go to holding the object or using it). Someone offstage can then  clap or ring that bell again and the scene can continue. Use this to see just how crazy you can make a single, simple action.	1	17	1	1	\N
99	2014-12-15 17:48:58.081	2014-12-15 17:48:58.081	Players do a normal scene, but before they start they get three rules from the audience. The rules can be something like "must be holding hands at all times," or "can't use pronouns," or "must be in some way talking to or about a cat." The players then must obey the rules throughout the scene.	1	1	1	1	\N
100	2014-12-15 17:56:09.757	2014-12-15 17:56:09.757	Get in one of them circles. The entire group then establishes a rhythm by chanting "Ali Baba and the Forty Thieves" over and over, at a nice steady pace. At some point, the starting person (pick somebody to go first, it doesn't matter) does some action to the beat, like wagging their finger with the words or something. As soon as the next chant begins, the next person repeats the action of the first, and the first person does a new, different action. Upon the third chanting of the thing, the third person repeats the first action, the second person repeats the second action, and the first person does another new, different action. This continues for a while, each player always repeating the action performed by their preceding neighbor on each consecutive chant. Try not to pay attention to the group, just focus on the person next to you for your next action and keep the rhythm going.	4	4	1	1	\N
101	2014-12-15 17:59:31.675	2014-12-15 17:59:31.675	Everybody gathers into a circular type arrangement (in that they get into a circle, which is about as circular as you can get). On the count of three, everybody either takes the form of an Alien, a Tiger, or a Cow. The Alien holds two fingers up like antennas and says "beep beep." The Tiger holds up her left hand like a tiger paw and says, "rawr rawr." The Cow holds his right hand to his belly, bending forward, and says "moooo." The goal is for everybody in the circular type arrangement to be the same thing all at once. Keep trying a few times, counting to three, until you're all on the same page.	4	4	1	1	\N
103	2014-12-15 18:23:32.668	2014-12-15 18:23:32.668	Circle up, or down, or whatever direction you want to circle (which is usually laterally unless you are playing this in space or while rock climbing or something). Get a ball and pass it to somebody in the circle. Start passing the ball around the circle, and the person who started has to try saying every word he or she can think of that starts with a given letter. There are no winners or losers, you're just trying to get your mind grapes churning.	4	4	1	1	\N
106	2014-12-16 10:11:35.872	2014-12-16 10:11:35.872	The players should randomly and absently walk about the space. At any moment, a coach or caller, or whatever (it could even just be a cellphone programmed to beep at given intervals or something) signals the group. Just reacting to the "energy of the space" the group forms a tableau. Someone should naturally be the focal point of the tableau, and the others will be supporting him or her. This is a good exercise for getting a feel for "fulfilling your role" - that is, taking on the position the group needs, not the one that you think is fun or will get you attention. Be the hero the team needs, not the one they deserve - or something like that.	3	4	1	1	\N
107	2014-12-16 10:17:09.56	2014-12-16 10:17:09.56	Two or three players start a scene from a simple suggestion. At some point, another player yells "cut!" and enters to give the players wacky direction. The players then continue the scene with the new direction. For example, the director might tell one of the players that their character is missing an arm, so they have to be without an arm for the rest of the scene, or maybe somebody is directed to speak with an accent or something. The director can also turn to the audience for help, prompting for a suggestion by saying something like "this character isn't an American, everybody knows he's actually from . . . where?" Feel free, as the director, to play the director character, being pretentious and insulting or whatever you think would be fun.	1	11	1	1	\N
108	2014-12-16 10:26:17.946	2014-12-16 10:26:17.946	Half the group leaves the space. The other half then plans this hilarious prank on them for when they return (well, it's just a fun example, not a hilarious prank). When the outside group returns, the inside group will explain that they came up with a great story, which the outside group will have to guess by only asking 'yes or no' questions. The inside group didn't come up with any story, of course, and will simply answer 'yes' or 'no' based on some random criteria which they will establish. For example, respond 'yes' to any question that starts with a vowel, or any question with the verb "go" in it, or always say 'yes' after you have said 'no' twice in a row. The outside group returns and everybody splits up so one outsider is paired with one insider, and they come up with a story together. The idea is that this will prove how easy it is to invent a story on the spot, because the person asking the questions is coming up with everything right there. You probably can only play once because then everybody is in on the gimmick.	2	4	1	1	\N
109	2014-12-16 10:31:53.955	2014-12-16 10:31:53.955	This is just like Genre Replay, Emotional Replay, or any other Replay games that work like that. Two players do a normal, quick scene without any real gimmicks. Then they re-play the scene in a series of different time periods, taken from the audience.	2	1	1	1	\N
110	2014-12-16 10:36:42.314	2014-12-16 10:36:42.314	This game works just like Genre Replay, Emotional Replay, or any other Replay style game. Two players do a normal, quick scene. Then two different players do the exact same scene. Choose strong characters, because the fun of this game is in watching other actors trying to replicate each other.	2	6	1	1	\N
111	2014-12-16 10:41:28.213	2014-12-16 10:41:28.213	Two players conduct an interview, talk-show style, about a topic they get from the audience. The gimmick is that the entire conversation happens backwards, starting with the last line "Well, I hate to cut you off there, but that's all the time we have," and then the line before that, and so on. You can play with forcing the other player into certain situations by reacting in certain ways. For example, the interviewer could say, "woah, calm down, this doesn't need to be heated." The person being interviewed then has to get really outraged about something, obviously.	1	1	1	1	\N
112	2014-12-16 10:45:17.345	2014-12-16 10:45:17.345	One player sings a made up ballad about an audience suggestion. The other players act out the content of the song on stage, in slow motion.	1	11	1	1	\N
113	2014-12-16 11:00:00.641	2014-12-16 11:00:00.641	The players generally mill about the space. One player is "it" and can tag other players. When tagged, a player has to hold his or her hand over the tagged spot, like a bandage. When you get tagged a third time (and you have no more "bandages" to spare), you have to freeze in place. Two other players can unfreeze you by both tagging you at the same time and counting to five.	3	4	1	1	\N
114	2014-12-16 11:14:14.014	2014-12-16 11:14:14.014	The players assume the form of a circle (they stand around in a circle). Somebody gets into the middle of the circle and randomly picks a player, pointing at them and giving them a letter of the alphabet. That player then has to come up with a person, an object, and a location that all start with the letter, and yells, "[Person] sells [Object] in [Location]!" For example, if the letter was 'M,' the person could yell "Mike sells Mattresses in Montana!" If they fail to come up with the words, or they don't use the right letter, they replace the person in the middle.	4	4	1	1	\N
115	2014-12-17 11:31:43.504	2014-12-17 11:31:43.504	Each player is given a farm animal (well, they're assigned the name of a farm animal, you aren't handing out like cows and sheep to everybody). Each animal should be given out, in secret, to a few players throughout the group. Once everyone is ready, the players begin wandering about, and without saying any English words, acting as and sounding like their animal. The players should try to find the other players with their animal. The first group to find all of their people and sit down wins! What do they win? Nothing really!	3	14	1	1	\N
116	2014-12-17 11:38:49.237	2014-12-17 11:38:49.237	One player ("it") stands against a wall (no, you aren't in trouble). The other players stand against the opposite wall. Their goal is to get across the room to "it" without "it" seeing them move (my goal is to stop referring to people as "it"). "It" can turn around at any time and look at the players, and if "it" sees any of them moving, they're out. If "it" turns around, you have to freeze.	3	4	1	1	\N
117	2014-12-17 12:10:26.709	2014-12-17 12:10:26.709	All of the players form a line. They make up a rap about a given topic, each player taking turns rapping the next line. The entire group should say the last word of each line with the player whose turn it is. Listen to basically any Beasty Boys track, because they're awesome (also they'll show how this game should sound I guess).	3	4	1	1	\N
118	2014-12-17 12:15:33.474	2014-12-17 12:15:33.474	Announce to the audience that you will now be taking a break from comedy to perform some poetry that some of the group members have written. Get two unrelated suggestions from the audience, and the "poets" (perhaps that word should always be in quotes) have to make up poems about the two suggestions. If the poem fails to incorporate both suggestions or doesn't rhyme (because all good poetry rhymes), the "poet" is shunned by the art community and forced to get a job at a corporate bakery selling cupcakes - I mean, they mime committing suicide on stage.	2	4	1	1	\N
119	2014-12-17 12:18:37.205	2014-12-17 12:18:37.205	The players (or perhaps one player at a time) attempts to "become" a random object given by either a coach or other players (like maybe a sandwich, or a hot dog, or a bag of chips - sorry, it's lunch time). Think about the details of the thing you are trying to be. Embody the thing as much as possible.	2	4	1	1	\N
121	2014-12-17 15:35:11.459	2014-12-17 15:35:11.459	The players get into a circle. Somebody starts as "Big Booty" and then the players count off clockwise, "Number 1," "Number 2," etcetera. Now the players all establish a simple rhythm by clapping or tapping their thighs or whatever. Big Booty starts the game by initiating following chant (everybody should join in): "Aaaawwww Big Booty, Big Booty, Big Booty. Big Booty, uh-huh!" This gets everybody on the same rhythm. Big Booty then sends the "energy" to a player by saying "Big Booty, Number X" on the beat. That player passes it to anther ("Number X, Number X"). The players continue to pass the energy around with the beat (remember you can always say "Number X, Big Booty" too) until somebody misses the beat or otherwise screws up. When a player "goofs," they move to the end of the circle and they are now the highest number, while every player that was higher than them moves one number down, and Big Booty starts it again.	3	4	1	1	\N
122	2014-12-17 16:26:38.91	2014-12-17 16:26:38.91	The players all go into circle mode - that's where everybody stands in a circle, but with a cool name so it seems more fun. Now starting with somebody, the players pass a "fish" around from one player to the player next to them. When you get the "fish" you can do one of two things. Saying "Big Fish" while holding your hands in front of you a few inches apart will pass the "fish" to the next player. Saying "Small Fish" while holding your hands in front of you 20 or so inches apart will change the direction of the fish, and send it back the way it came. Remember, for "Big Fish" you show a small gap between your hands, and for "Small Fish" you show a large one. Go figure. You can play it with elimination by removing the players that mix up the direction or the size of the fish.	3	4	1	1	\N
123	2014-12-18 21:46:05.046	2014-12-18 21:46:05.046	In this exercise, all of the players get in a line or a circle or whatever, and everybody gets a number. A coach or ref or leader or custom phone app randomly picks two numbers. The players with those numbers step forward, and both immediately "offer" an action and a statement of some sort. For example somebody could step forward, mime slicing some bread, and say "I'm worried about taxes this year." The players have to take a few moments to figure out how their actions and lines are related, and what their scene is about.	2	4	1	1	\N
124	2014-12-18 21:57:57.806	2014-12-18 21:57:57.806	Begin by having everybody wander about the space. Then everybody is to line up in order based on some criteria you can make up on the spot. The criteria can range from light, simple stuff like height and hair length to (potentially made up) personal stuff like number of exes or number of times arrested to more etherial and philosophical stuff like style or freedom.	3	4	1	1	\N
125	2014-12-18 22:15:57.705	2014-12-18 22:15:57.705	<p>Players should get into a line (well, I don't want to sound pushy - you can get into a line if you want to). The first player is "on deck." The rest of the players take turns stepping to the "on deck" player and initiating a scene with them. In other words, the next player in line approaches the "deck" and offers one line. The player "on deck" responds with a single line, and hopefully we have the start of a totally awesome scene. The initiating player goes to the back of the line, and the next player in line approaches the "on deck" player. When everybody has gone, it's the next player's turn to be "on deck." This exercise is great for getting the hang of initiating scenes.</p>\n\n<p>An alternative approach would be to have two lines, and the first player in each line starts a scene with one another, then they go to the back of the line.</p>\n\n<p>You can add a bit of challenge by requiring that the two line scenes must be something the rest of the group wants to see more of. If two players initiate a scene that doesn't seem interesting enough, they must keep trying until they interest the group.</p>	2	4	1	1	\N
126	2014-12-18 22:19:36.308	2014-12-18 22:19:36.308	Four players have to try to hide a fifth using only their bodies. I mean, you don't have to get naked, you just can't use props or scenery or whatever. The rest of the group has to try to look for ways to find the hidden player (scraps of clothing sticking out, feet visible, or whathaveyou). Try it with fewer and fewer "hiders" until it's impossible.	3	13	1	1	\N
127	2014-12-18 22:22:55.583	2014-12-18 22:22:55.583	Three players either leave the space or cover their ears and turn around so they can't hear the suggestion. A fourth player (we'll call him 'A') gets a common phrase or expression from the audience. Using only mime and gibberish, 'A' has to convey the expression to 'B' while the other two still don't watch. 'B' then gives the message to 'C' and likewise 'C' to 'D.' At the end, have the four players explain what phrase they thought it was.	1	12	1	1	\N
128	2014-12-18 22:27:51.262	2014-12-18 22:27:51.262	Three (or four) players do a scene, with a DEATH DEFYING TWIST. A bucket is placed on a table to the side of the stage, full of water. At all times, one of the players in the scene must have his or her head in the bucket. The other players must come up with reasons to leave the scene to tag in the player in the bucket and relieve him or her. Don't let anybody die, please.	1	8	1	1	\N
129	2014-12-18 22:33:02.42	2014-12-18 22:33:02.42	So many of these games involve getting everybody all up in a circle. This is one of them. Get everybody all up in a circle. Somebody starts as "it" and gives everybody a moment to ask the names of the people standing on either side of them. Then "it" goes up to a player and yells "[player's name], bumpity bump bump bump." The player has to say the names of the two players on either side of them before "it" finishes saying "bump bump bump." If you fail, you become "it." If you are getting bored, "it" can just generally yell, "bumpity bump bump bump" and all of the players have to scatter, forming an entirely new circle with entirely new neighbors.	3	4	1	1	\N
165	2016-02-02 21:06:14.753241	2016-02-02 21:06:14.753241	<p>Big Circle sure has their rotund fingers in the Improv world. If they got a dollar for every game that starts with getting in a big circle, they would certainly be able to take over the whole world.</p>\n\n<p>Anyway, get in a big circle. Everybody should start by looking at the ground. On a count of three (or some other prompt), everybody looks up, at another person in the circle. If two people make eye contact - if they happened to look right at each other - they both scream as if they were startled by it, and then drop "dead." Continue doing this, looking down and back up, until you only have one or two players left.	1	4	1	1	\N
130	2014-12-19 16:04:46.269	2014-12-19 16:04:46.269	Circle up, circle down, circle over, circle in any preposition you want, as long as it means "gather everybody into a circle." Pick somebody to go first, and he will form a "bunny" with the player on either side of him. To form the bunny, the player in the middle holds his hands to his chest (you know, like a bunny would), and the players on either side holds their hands up in the shape of big rabbit ears on either side of his head. Alternatively, the three players can just each be a bunny all on their own - I don't care. The point is that three players all start saying "bunny" and hopping up and down really fast. The goal is to be as ridiculously manic and crazy as possible. The players keep doing it until the middle player throws the mystical bunny energy to someone across the circle. When the energy is passed to you (or somebody next to you), you had better bunny up.	3	4	1	1	\N
131	2014-12-19 16:38:04.463	2014-12-19 16:38:04.463	I'm running out of funny ways to tell you to get into a circle, so just do it and I'll think about it. Everybody starts chanting "Ooo-chah, ooo-chah" to develop a slow, steady rhythm. Now somebody starts by saying "bunny, bunny," holding their fingers in front of their face like teeth, and then holds their fingers out with the same "front teeth" gesture pointing at somebody across the circle, saying "bunny, bunny" to them. This all happens along with the beat of the underlying chant. The person that was bunny'd at now does it again, passing it to somebody else. Yes, it will look weird and probably creepy if somebody didn't know what was going on. That's okay.	3	4	1	1	\N
1	2013-11-21 17:36:13	2013-11-04 21:05:25	<p>Everybody stand in a line in front of the audience. Good job, that was the hard part.  Now you can get suggestions for basically anything (nouns work best, though), and the group takes turns making jokes about those suggestions.  The jokes all follow the standard structure, "185 [items] walk into a bar. The bartender says 'we don't serve [items] here.' They ask, 'hey, why not?' [punchline]."</p>\n\n<p>Feel free to make variations on the theme of "185 [items] walks into a bar, something happens." For example, you could say "185 Eskimos walk into a bar. They each have their own word for 'beer.'" I don't know.</p>	1	4	1	1	\N
133	2016-01-08 16:32:59.891502	2016-01-08 16:32:59.891502	<p>Start by gathering everyone in a big circle. Now, hand someone an imaginary "red ball" with a specific size, weight, or other physical properties that you can easily distinguish. Hand someone else an imaginary "yellow ball" with a different set of properties. Finally, hand someone an imaginary "green ball" with still different properties. For example, the red ball could be like a volley ball, the yellow ball could be like a big inflatable beach ball, and the green ball could be like one of those super balls you get out of a gumball machine at the supermarket and then have your RA confiscate from you (or was that just me?). Once you establish your balls, you may begin.</p>\n\n<p>Play happens as follows: when you have a "ball" you should hand (or toss) the ball to someone else in the circle (this is all done using the powers of IMAGINATION). Make eye contact and clearly tell them "red ball" (or whatever ball you are handing them) and they will respond with "red ball, thank you" (or, again, whatever type of ball you are handing them). They then pass the ball to someone else.</p>\n\n<p>The point is to listen and pay attention so you know what ball you have, and to make sure the person you are handing the ball is aware that you are handing them a ball (and what ball you are handing them). For bonus points (and trust me, I am keeping track of those bonus points) throw a few more balls in during play, just to make things even more crazy.</p>\n\n<p>For the record, you can make the balls whatever you want. Want a bowling ball in there? How about a paintball? I don't care, dude.</p>	1	4	1	1	\N
134	2016-01-08 17:43:40.081884	2016-01-08 17:43:40.081884	<p>Two people do a normal scene - but wait, there's more! At any time during the scene, one of the players can say "pardon?" The other player then has to repeat the last line they said, but say something different. The scene continues with whatever the last thing they said was.</p>\n\n<p>Person A says, "Hey, I got a new cat!"</p>\n<p>Person 2 responds, "pardon?"</p>\n<p>"Hey, I got bit by a bat!"</p>\n\n<p>Apparently it also has to rhyme. Play it without rhyming if you want, but it's really more fun with rhymes (what isn't). This is very similar to the game "Shoulda' Said" (or "New Choice" or "Ding" or whatever you call it), except you don't need the third party to call for the new lines.</p>	1	1	1	1	\N
140	2016-02-01 22:19:24.957725	2016-02-01 22:19:24.957725	<p>This game works with any number of players, but probably works best with more than two. The group will sing a song together, each player contributing one word at a time. Start with a known song, so that the tune is something everyone is already familiar with, but change the lyrics to match a suggestion of some sort. Go around the group (in a line or circle or whatever order you want to go in) and contribute one word after another. Be mindful of what words make sense in the context of the song.</p>	1	4	1	1	\N
167	2016-02-03 02:07:05.024447	2016-02-03 02:07:05.024447	A Harold with the lights off. That's literally all it is. Apparently people are actually really into this. Have fun!	7	20	1	1	\N
171	2016-02-04 20:14:32.488558	2016-02-04 20:14:32.488558	<p>This is a one-person long form.</p>\n\n<p>We can get more involved in our description, but that's really all you need to know. One person does a series of scenes in which they play every character, and do all of the things.</p>\n\n<p>Typically you'll start with a monologue (technically it's all a monologue, though, isn't it?), and then you'll go into scenes pretty much playing however you feel appropriate playing by yourself.</p>	7	19	1	1	\N
174	2016-02-04 20:56:57.595278	2016-02-04 20:56:57.595278	The group begins by walking about the space, all higglety-pigglety. At some point everybody is prompted to stop walking and begin doing some sort of thing - be it a movement, a gesture, a sound, or whatever they feel like at the time. Everybody explores this thing that they are doing, heightening and broadening it until they figure out what they are. Perhaps they are a dinosaur, perhaps they are a Robocop, or perhaps they are something a little bit less awesome, but still perfectly relevant and acceptable.	1	4	1	1	\N
93	2014-12-14 18:45:58.67	2014-12-14 18:45:58.67	<p>Everybody gets in a big old circle. Starting somewhere, a player points to another player and says basically any word. That person (the person who just got pointed at) points at somebody else and says another word, hopefully following in some sort of pattern to what was said first. This continues until everybody has been pointed at and everybody has a word. As an example, if the first person said, "bologna," the following words could be "ham," "roast beef," or "turkey," thereby following the pattern, "types of deli meats." Anyway, go over your pattern a few times, making sure everybody remembers their word, and the word preceding them.</p>\n\n<p>Now things get interesting. Let the first pattern go (for now), and do another one. Take turns pointing and saying a thing (pick a different thing and a different person to point at this time), creating a new pattern. After you go over the second pattern a couple times, and while the second pattern is still going, start the first pattern again. See how long and how fast you can keep both patterns going at the same time without either dropping one or randomly having two of the same pattern at once (it happens).</p>\n\n<p>Once you get the hang of two, start a third!</p>\n\n<p>It can be good to start with everybody's name for the first pattern, so as to serve as a sort of icebreaker for everybody.</p>\n\n<p>Another option is to just say "you" for the pattern, eliminating any need to come up with words or remember names. Just focus on the pattern. You can get really intense with it, too, and keep doing the pattern until everybody can do it with their eyes closed.</p>	2	4	1	1	\N
135	2016-02-01 20:32:17.221811	2016-02-01 20:32:17.221811	<p>Get a suggestion for some sort of product category (candy bar, dish soap, oatmeal, etcetera). Now players take turns yelling out possible names for new products in that category. As soon as someone takes too long to think of something or repeats a name, they are "out." I've heard of playing this game where when somebody gets out you yell "show us your butt" at them. I don't know where that came from, but I completely support it.</p>\n\n<p>Make it a bit more serious by having a conductor point to someone to put them on the spot.</p>	1	4	1	1	\N
136	2016-02-01 20:36:48.319571	2016-02-01 20:36:48.319571	One player is a zombie! They will start shambling, full on Romero style, to another player. Don't worry, you don't have to destroy their head (a la Brooks) to stop them. To defend yourself from the zombie, you just have to yell the name of another player. The zombie then goes for that player, and it continues thusly. This is a good way to get to know everybody's names.	1	4	1	1	\N
137	2016-02-01 20:51:44.402696	2016-02-01 20:51:44.402696	<p>This is really a whole genre of game. In this, the group stands in a circle and passes energy around from one player to the next. The nature of the passing really depends on you, as long as all of the players are on the same page. This description will outline the basic idea with some made up sounds that you can feel free to use or replace with whatever sounds you want. This description doesn't care.</p>\n\n<p>The basic way to pass the energy is directly to the next person in the circle by waving your arms and saying "whoosh." The energy is thereby for the most part passed in one direction around the circle from one player to the next. Easy Peasy.</p>\n\n<p>Except! At any time a player can hold up a hand to the energy and say "switch!" When this happens, the direction is reversed, and it goes back the other way. The person who was "switch'd" can then "whoosh" on back the other direction. You can also "switch" a "switch" if you are that kind of person.</p>\n\n<p>Also! You can point to a person across the circle and say "zoom" at them. Now the energy is passed to them. They can then "whoosh" in the same direction it was heading before (unless that's too complicated for you, in which case just whoosh whichever way). I don't think it makes sense to "switch" a "zoom" so just don't do that. You can "zoom" a "switch," though, but you can't tune a fish - er...</p>\n\n<p>Concordantly! You can also say "pow" in the direction of the energy flow, moving your arms over the head of the person next to you as if you were throwing a classic hook shot from such basketballs. When you do this, the energy skips the next person and goes to the person after that. It then continues on like normal. If a person gets "pow'd" they can "switch" which would send it to the person who was skipped, if that makes any sense at all.</p>\n\n<p>And lo! Feel free to add any manor of other things, giving them a distinct sound and gesture. You can make a thing send the energy behind you, so you face one person but the energy goes the opposite direction. You can make a thing that makes everybody in the circle do and / or say something. Go crazy!</p>\n\n<p>The idea is to just get into a pattern, getting used to making quick decisions within a set structure and being okay with screwing up (because there are no consequences). Feel free to start with one or just a couple things and work your way up as the players get used to them.</p>	1	4	1	1	\N
138	2016-02-01 21:01:07.663519	2016-02-01 21:01:07.663519	<p>In this game you play a scene. In fact, you play the following scene, exactly as written - no more, no less.</p>\n<blockquote>\n<p><em>(Employee knocks on the door)</em></p>\n<p><em>Boss</em>: Come in. You know why I called you?</p>\n<p><em>(Employee replies, indicating that they do not indeed know.)</em></p>\n<p><em>(BOSS hands EMPLOYEE a piece of paper - this can be mimed.)</em></p>\n<p><em>EMPLOYEE</em>: I thought you wouldn't take that into account.</p>\n<p><em>BOSS</em>: You're fired.</p>\n<p><em>EMPLOYEE</em>: Fine. I hated that stupid job anyway.</p>\n</blockquote>\n<p>The fun then comes from replaying the scene, but with different subtext. The players replay the scene multiple times. You can have a coach secretly give each player something (you just found out that you won the lottery, you have been stealing staplers from the company for years, something like that), have each player pick something for themselves, or discuss it as a group. The idea is to see how subtext can change a scene. This is like real serious acting class stuff!</p>	1	5	1	1	\N
139	2016-02-01 21:04:37.606196	2016-02-01 21:04:37.606196	<p>Get all up in a circle. Someone starts by pointing at another player in the circle and loudly stating, "you." That person then says "yes" and points to another player to say, "you" again. Here's the catch: when you point to someone and they say "yes," you start walking to them to take their spot. Don't hesitate, and don't wait for them to point to someone else. When you hear "yes" you move. Feel free to take your time to make sure they have time to point to someone else, but that shouldn't be too hard. This game should become a cool ballet of people switching around the circle once you get the pattern down and people get over the panic that inevitably sets in when someone starts walking toward you.	1	4	1	1	\N
141	2016-02-01 22:22:32.622907	2016-02-01 22:22:32.622907	<p>Two people do a scene, but they only say one word at a time. They kind of narrate what is happening, instead of actually just talking to each other one word at a time. For example, the two characters can say "We - are - building - spaceships." Now they are building spaceships, and they should be acting that out. "This - spaceship - is - for - cows." Etcetera.</p>	1	1	1	1	\N
168	2016-02-04 19:48:48.475747	2016-02-04 19:48:48.475747	<p>One player pulls an imaginary item out of an imaginary bag, and then names that item (it can be anything at all, really) for the rest of the group. The group then takes turns asking the player questions about the item, trying to establish just what the item means to the player's character and why they have it. Eventually, the player draws another, perhaps completely unrelated item from the bag, and more questions are asked. Continue in this way until you have developed some sort of understanding of just who this character really is.</p>	1	4	1	1	\N
172	2016-02-04 20:18:17.12144	2016-02-04 20:18:17.12144	Someone begins telling a story. At a signal (be it a bell, a command, a clap, or whatever), the player switches seamlessly into or out of gibberish. The story should continue to make sense and clearly have a narrative, whether you can understand it or not. When the storyteller switches back, it should be like they have been telling the story the whole time.	4	1	1	1	\N
4	2013-11-10 16:04:27	2013-11-10 16:04:27	<p>The group splits into two lines, and two members from each line face off, telling a story one word at a time.  When one of the two storytellers makes a mistake - saying more than one word or taking too long - they move to the back of their line, and the next person steps up.  Hopefully the story will continue along a general theme.</p>\n\n<p>As an exercise or warmup game, just have the whole group tell a story in a circle. Each person says one word at a time, and when you feel like a thought is finished, say "Chapter 2" or whatever to start the next scene. There are no winners or losers, you just tell a story!</p>\n\n<p>Another option is to make up an instruction manual for a suggested household product, like a toaster or something. Saying one word at a time, we explain how to use the thing, and then maybe we move on to another chapter, in which we tell warnings about the product or troubleshooting tips.</p>\n\n<p>Yet another variation would be to make up a Proverb in this style. Something like "the early bird gets the worm," but made up and one word at a time. Remember that the best proverbs start with like "the" or "he who" or whatever.</p>\n\n<p>Or why not write a letter, one word at a time? Basically anything you can think of, you can do one word at a time. I just blew your mind, didn't I?</p>	3	5	1	1	\N
58	2013-11-22 10:55:09	2013-11-22 10:55:09	<p>Three players stand in a line. The center player is the "leader." The other two players should try to mimic the center player's stance and actions as closely as possible. The audience asks simple (or not so simple) questions, either on a topic, or just general advice questions. The three "professors" answer the questions, each saying one word at a time. Make sure you make logical sentences and try your best to answer the questions.</p>\n\n<p>An alternate style would be to have an interviewer on stage, like the host of a talk show, and the "expert" is the guest. This would mitigate a dependence on the audience coming up with interesting questions.</p>	1	2	1	1	\N
142	2016-02-01 22:34:52.802179	2016-02-01 22:34:52.802179	<p>Players do a regular scene, but they can't talk. They can make sound effects, but they can't talk to each other. Can you justify why you aren't talking without talking?</p>\n\n<p>Or just throw out all sound altogether. SCENES IN SPACE! (get it, because in space there is no sound . . . ?)</p>	1	1	1	1	\N
143	2016-02-01 22:42:24.388004	2016-02-01 22:42:24.388004	<p>A player leaves the room (or otherwise makes it so they cannot hear the suggestions). You then get a series of suggestions establishing various facts about the player's character. Get the following things:</p>\n<ul>\n<li>Where the scene takes place</li>\n<li>When the scene takes place (could be present day, if you don't want to deal with that)</li>\n<li>Who the player is, whether a famous person in particular or a certain occupation.</li>\n<li>Some sort of distinguishing feature, or handicap that the player has.</li>\n<li>Something that the player is dealing with in the scene, whether it's a problem, a need, or coming up with a third thing.</li>\n</ul>\n<p>Now you play a scene, where one or two other players have to get the first to figure out what all of those details are. Keep in mind the narrative of the scene, try not to break the "plot" just to either show details or to yell out your guess. You get so many bonus points if the player just adopts the various facts into their characterization and moves on with the scene, or calls them out to the other characters in a way that makes some sort of sense.</p>	1	2	1	1	\N
144	2016-02-01 22:46:10.90838	2016-02-01 22:46:10.90838	<p>The entire group chants the classic chant "Who stole the cookies from the cookie jar?"</p>\n\n<p>Someone who starts (It, if we want to be offensive about it) then repeats "[Player] stole the cookies from the cookie jar!" (inserting the name of a player in the group, obviously).</p>\n\n<p>That player responds, keeping the rhythm, "who me?"</p>\n\n<p>"Yes, you!"</p>\n\n<p>"Couldn't be!"</p>\n\n<p>"Then who?!"</p>\n\n<p>The player then targets another player by saying, "[Player] stole the cookies from the cookie jar!"</p>\n\n<p>Play continues until everyone has gone or you get bored or some other thing happens I don't know whatever.</p>	1	4	1	1	\N
145	2016-02-01 22:49:11.964253	2016-02-01 22:49:11.964253	<p>Single one player out, and then the whole group discusses what that player would be if he or she was a car, a coffee drink, an animal, a cloud, or whatever you can think of. Discuss your answers and have a grand old time. You probably want to do it for everybody in the class then so that first person doesn't feel terrible.</p>	1	4	1	1	\N
146	2016-02-02 14:46:26.232396	2016-02-02 14:46:26.232396	<p>Two players observe each other closely, trying to remember details about each other. Taking turns, they secretly change three things about themselves (unbutton a button, tuck or untuck, adjust a tie, whatever), while the other player doesn't look. The other player must then figure out what was changed.</p>	1	1	1	1	\N
147	2016-02-02 14:50:47.927901	2016-02-02 14:50:47.927901	<p>One player gets into the middle of a circle. Somebody then tells the player in the middle some sort of task to perform, which the player then mimes. After completing the task, the player asks "what happens next?" Players in the circle can shout additional tasks for the player in the middle to perform, hopefully forming together to make some sort of narrative. Don't just yell out random tasks, come up with things that make sense together.</p>	1	4	1	1	\N
169	2016-02-04 19:56:56.428177	2016-02-04 19:56:56.428177	This is a style of cutting or editing scenes in which a scene is cut by a player tagging one of the players in the scene, and taking their place. A new scene begins with the new player and the other player that was in the scene before. Most likely the staying player is the same character as they were before, and the new scene takes place later in time from the scene before.	8	5	1	1	\N
173	2016-02-04 20:53:36.653521	2016-02-04 20:53:36.653521	Do a normal scene with four to six players. At the end of the scene, the audience picks one of the players to be "voted off the island" like the popular reality TV show. The remaining players then redo the scene exactly as it was, without one of the players. Continue doing this until only one player remains, who then has to do the entire scene on their own. How do you do the scene exactly without one or more of the characters? That's for you to figure out.	2	21	1	1	\N
33	2013-11-22 09:53:31	2013-11-22 09:53:31	Everybody gets in two lines. The front person in each line steps forward. Player 1 (figure out which line is 1, and which line is 2) starts performing an action, just using mime. Player 2 approaches Player 1 and asks, "what are you doing?"</p>\n\n<p>Player 1 responds by naming some sort of activity that has <em>nothing to do</em> with what they are actually doing. Player 2 then starts to mime the activity that Player 1 named. At this point Player 1 moves to the back of the line, and the next player in that line steps forward to ask Player 2, "what are you doing?"</p>\n\n<p>It keeps going back and forth like this until everyone has gone or you get bored, or some other thing happens.</p>\n\n<p>To make it a challenge, give the players that are up a letter of the alphabet. They then go back and forth, naming actions that begin with that letter, until one of them hesitates or otherwise can't think of a thing. That player then goes to the back (or is eliminated), and another player steps forward. For super extra double challenge, get two letters and come up with actions that begin with both letters (for "A" and "F" you might say "Acting Foolish").</p>	1	5	1	1	\N
148	2016-02-02 15:02:08.479223	2016-02-02 15:02:08.479223	<p>The group walks about the space, just wandering aimlessly. They begin to imagine that they are in a big warehouse, full of all sorts of random stuff packed in boxes and stacked up on shelves or whatever. As a group, everyone should stop, pick an imaginary thing off an imaginary shelf, and name the thing, before putting it back down and continuing on their way. Either have a third party cue the group to grab an item, or do it one at a time, or whatever works for you.</p>	1	4	1	1	\N
79	2014-12-02 10:24:45.801	2014-12-02 10:24:45.801	Three or four players each get a word from the audience. They then play a scene, and any time their word is said they have to either enter or exit the scene (depending on if they were already in it or not). The players have to justify why the characters leave and return. All of the players don't have to start the scene on-stage.	1	12	1	1	\N
149	2016-02-02 15:09:10.585442	2016-02-02 15:09:10.585442	The group spreads out in the space, making sure that they can see everyone reasonably well. At some point the exercise begins, and someone starts walking. One and only one person can walk at any time, and as soon as they stop, someone else has to start. If two or more people start walking, they have to stop so that only one is walking. Try to free your mind and listen to the energy of the group (let go, Luke). It seems hokey, but it is actually pretty sweet. Once you have mastered one person walking at once, start increasing the number.	1	4	1	1	\N
150	2016-02-02 15:16:01.758392	2016-02-02 15:16:01.758392	The players all start at one end of the room. Yell out basically any word, and the players should all begin, to themselves, coming up with a list of words that associate with that word. When a player comes up with a word, they take a step, until they are at the other end of the room. The point is to go at your own pace, trying to come up with words and seeing how long it takes you to get across the room. When everyone has reached the other side, they turn around and you give them a new word.	1	4	1	1	\N
151	2016-02-02 15:21:36.971946	2016-02-02 15:21:36.971946	<p>Four players get suggestions for occupations from the audience, or otherwise establishes who they are - or, rather, who they <em>were</em>.</p>\n\n<p>For you see, they have all DIED! It's nothing sinister, they are just a random group of people that all happened to die together, and they're going to tell us how it happened, in three rounds. Each round each player gets a turn to add a bit of narrative to their individual story. By the end of the third round we should know how they all died, and how they all ended up in heaven together.</p>\n\n<p>The first round should be just establishing who you are and what you were doing the day you died, which presumably was a pretty normal day (until you died, of course). This increases the challenge, because then you only have two rounds to get with the Ghost Dad Protocol.</p>	1	12	1	1	\N
23	2013-11-11 21:47:47	2013-11-11 21:47:47	<p>Send one player outside (or at least make sure he or she can't hear the suggestions, you know the drill). The second player then gets a suggestion for some sort of item and something wrong with it (for example, a skateboard that keeps bursting into flame). Once the suggestions are established, the first player returns. That player is a customer trying to return the item for the suggestion reason. The other player is a store clerk accommodating the request. The challenge is for the clerk to get the customer to actually say what the item is and what's wrong with it (without giving the suggestions away, obviously).</p>\n\n<p>You can also try this where the customer knows what the thing is and what's wrong with it, and the clerk has to guess. It can be a little awkward starting the scene where the clerk enters, but I'm sure you'll figure it out - I believe in you!</p>\n\n<p>If a generic "store" isn't interesting enough for you, you can also set this game in a Repair Shop (hence the alternate name), where a player is trying to get the suggested item repaired for the suggested reason. Also, you can use weird pets and weird pet ailments and have this game take place inside a vet's office. For that matter, you can probably go ahead and set this game wherever you want, as long as it would make sense to have someone is bringing in X item for Y reason.</p>	1	1	1	1	\N
152	2016-02-02 15:50:53.677596	2016-02-02 15:50:53.677596	<p>Randomly select one of the group, somehow, without everybody knowing who it is (have a third party tap someone on the shoulder while you all have your eyes closed, or something). The selected person is a murderer (or a vampire, or werewolf, or whatever other symbolic thing you want to use)! The group then begins wandering about the space, and the murderer can secretly begin murdering people. How does that happen? There are a few variations you can go with, which are specified below. The goal is for the non-murderers to figure out who the murderer is. When you are murdered, though, you are out and you can't tell everybody who killed you - I mean duh.</p>\n\n<p>The simplest option is to have the murderer make eye contact and wink at people to murder them. This form can be easy for someone to spot, but it also encourages making eye contact, which is always useful as a warmup exercise.</p>\n\n<p>Another option is to have everyone shake hands as they wander about. The murderer uses his or her middle finger to tap or scratch or whatever to the other person's palm, indicating that they have been murdered.</p>	1	4	1	1	\N
170	2016-02-04 20:10:08.646138	2016-02-04 20:10:08.646138	Get in one of those big group circles with which you should be accustomed to by now. The "starting player" makes eye contact with someone else in the circle, and they both clap their hands at the same time. Then that player finds a new one, and they clap at the same time. Continue this way for a while, until you can get the rhythm down. The point is to get the whole group in sync and see how perfectly two people can clap at exactly the same time, just by making eye contact. It should be pretty sweet to watch when it gets going.	4	4	1	1	\N
181	2016-11-28 16:16:20.637924	2016-11-28 16:16:20.637924	First, get two volunteers from the audience. Assign each of them to an improviser. The improvisers cannot move, and the audience volunteers need to pose them like action figures. The improvisers can still speak, and have to attempt to do a normal scene with the audience volunteers moving them in whatever way they need to move. 	1	1	1	1	\N
153	2016-02-02 15:58:25.110011	2016-02-02 15:58:25.110011	<p>The group gets split into two smaller groups. One group gets in the middle of the room, and the other spreads out around the walls or boundaries. The outside group is effectively not in this game, but they are observing the inside group to make sure they stay without the bounds and don't run into the walls or anything (since the inside group has their eyes closed, you see).</p>\n\n<p>Secretly pick someone in the inside group to be a vampire (or werewolf or patient zero or whatever other symbolic thing you want them to be). When the game starts, the players begin wandering about the space, with their eyes closed. When the vampire bumps into another player, he or she can squeeze the player's arm to murder them (they better scream and die in a very dramatic way). The game ends when all players are killed.</p>\n\n<p>You can also play this where the vampire transforms his victims into other vampires. This game ends when all the players are vampires. However, if two vampires bump into each other and touch their arms, they are both "cured" and are no longer vampires. The group around the outside will have to pay attention to try to determine when the game is actually over.</p>\n\n	1	4	1	1	\N
154	2016-02-02 16:10:53.108903	2016-02-02 16:10:53.108903	<p>One player starts by pretending to type out a story on a typewriter. They read aloud what they write, beginning to tell a story. Once a sort of narrative is established, the rest of the group steps out onto the stage and picks up the story, acting it out. Eventually the scene can end and the narrator goes back to reading what is being typed, to start a new scene or chapter or whatever. The narrator can also interrupt the scene by adding crazy elements that mix things up - new characters, new settings, meteor strikes, etcetera.</p>	2	11	1	1	\N
86	2014-12-02 11:41:12.769	2014-12-02 11:41:12.769	Four players stand in a square, with two players upstage and two downstage. A caller sits nearby and can rotate the square by calling "left" and "right" thereby making a different pair of players the ones in front. Go through a full rotation of the square, getting a suggestion from the audience for each pair (there should be four). Now begin a scene with the front pair. At any point the caller can rotate the square, and whichever pair of players is in front plays their scene. Each player is therefore in two different scenes. When a particular scene returns to the front, it can either continue right where they left off, or from some point in the future. However, the two players should continue to be the same characters they were before.	2	16	1	1	\N
155	2016-02-02 16:16:55.168915	2016-02-02 16:16:55.168915	The entire group stands in a big ol' circle, and everyone turns to their left, and starts running, making the circle rotate in a clockwise direction. At any point someone can yell "go!" and the entire group turns around, switching the rotation of the circle.	1	4	1	1	\N
156	2016-02-02 16:31:00.69598	2016-02-02 16:31:00.69598	<p>Define four gestures, each numbered one through four. For example, they can be:</p>\n<ol>\n<li>Put your hands on your head.</li>\n<li>Put your hands on your shoulders.</li>\n<li>Put your hands on your hips.</li>\n<li>Lift your foot and touch it with your hand.</li>\n</ol>\n<p>Now as a group you rhythmically go through the following steps:</p>\n\n<ol>\n<li>Say aloud "one, two, three, four" twice, establishing the rhythm. Continue chanting the four numbers through the rest of the steps.</li>\n<li>On "one" do the first gesture. Do this twice, doing nothing on the other numbers yet.</li>\n<li>Add the second gesture on "two." Do one and two twice, again doing nothing on three and four.</li>\n<li>Add the third gesture, going through the first three twice.</li>\n<li>Finally, add the fourth gesture, doing all four gestures twice.</li>\n<p>Do it a few times, increasing the speed each time.</p>	1	4	1	1	\N
157	2016-02-02 16:45:01.095886	2016-02-02 16:45:01.095886	Mime a tug of war with the group, forming teams on each side of an imaginary rope. The goal is to see if you can establish the length of the rope and never change it, and get everybody to work as a cohesive whole. Can one team win somehow?	1	4	1	1	\N
158	2016-02-02 17:03:34.776881	2016-02-02 17:03:34.776881	<p>This long form style begins with collecting a list of five suggestions from the audience. They can be themes, ideas, objects, locations, whatever. Feel free to use whatever method you want for collecting long form inspiration.</p>\n\n<p>The format takes place over five rounds. As the title suggests, the first round has five scenes, and each consecutive round has fewer scenes until you work down to just one. In the first round, the scenes should have no relation to one another, except perhaps a common exploration of a theme, or a set of themes. As the rounds progress, connections start to be made between the different scenes, and we might see characters from one scene appearing in another. Which scenes or characters continue is entirely up to you.</p>	6	18	1	1	\N
159	2016-02-02 17:16:53.519473	2016-02-02 17:16:53.519473	Get in one of those big group circles. Start with any player, who turns to his or her left and says a gibberish word to the next player. That next player translates the word into English (or whatever language you speak, I guess). Try to translate it logically, saying a word based on how it sounds or feels, or the first word that pops into your head. When you translate a word, turn to the next player and give them a new gibberish word for them to translate. Continue around the circle thusly.	1	4	1	1	\N
160	2016-02-02 17:21:36.977007	2016-02-02 17:21:36.977007	Two (or more) players do a normal scene, with a twist. They can only speak when they are touching the other player.	1	1	1	1	\N
161	2016-02-02 17:56:03.387484	2016-02-02 17:56:03.387484	A standard scene begins. Occasionally throughout the scene the time period changes to different periods suggested by the audience. The scene should continue with the same characters and narrative, but in the new time period. You can also get a series of time periods and play them chronologically, so we see the evolution of time take place throughout the scene.	1	1	1	1	\N
162	2016-02-02 20:08:01.575302	2016-02-02 20:08:01.575302	A single player plays a three line scene with two different characters. He or she plays both characters, doing a whole scene in three lines. Run through a few at high speed!	1	19	1	1	\N
163	2016-02-02 20:10:37.783353	2016-02-02 20:10:37.783353	Player A gets two lines, and Player B gets one. They then do a scene using only those lines (A, B, A). How quickly and easily can you establish who, what, and where you are?	1	1	1	1	\N
164	2016-02-02 20:56:34.943	2016-02-02 20:56:34.943	Start in a big circle (or don't, the circle isn't actually necessary, it's just something that we're all used to at this point). One player starts and makes an offer, saying "let's [activity]" while miming that activity. The next player adds to what the first player was doing, by saying "let's [another activity]" and miming that. Both players join in the new activity and say "yes, let's do that!" Each player then adds their own activity, building on the ones before, until everyone has made an offer.	1	4	1	1	\N
166	2016-02-03 02:00:05.169079	2016-02-03 02:00:05.169079	One player takes a position as if they were a statue of some sort. Another player, without looking, feels the "statue" to get an impression of what it looks like. Try not to turn this into a grope session. The "blind" player should try to get an impression of what the statue looks like to the point where she can assume the same position. See how close you can get without being able to see the pose you are trying to replicate.	4	1	1	1	\N
83	2014-12-02 11:23:42.421	2014-12-02 11:23:42.421	<p>First, get some sort of crisis from the audience (we ran out of somebody's favorite food, maybe), and some sort of object (anything, really). A player then starts a scene in which they are confronted by the given crisis. To save the day, the starting player decides to call upon the help of [suggestion] man (or woman). The second player enters the scene as [suggestion] man (so if the suggestion was "coffee cup" the player is "Coffee Cup Woman" or something). Using the powers customary to someone with the given name, the player attempts to solve the crisis only to make things worse. This means they need to call in their colleague (perhaps "doorknob man" or "The Human Tire"), who gets an equally absurd name (that the first "hero" makes up on the spot).</p>\n\n<p>This continues through two more heroes (for a total of three, plus the non-hero who starts the scene). Finally the last hero manages to solve the problem, or to make things more fun (in my opinion) the non-hero who started the scene can solve it somehow. With the problem solved, the heroes can leave with as much bluster as they arrived.</p>\n\n<p>There are two things to consider in this game. The first is the idea that you are "pimping" these super heroes with crazy names that they have to live up to. You can have each hero named by random audience suggestions if you must. The second thing to play with is the concept of status. As a hero, you might enter with the highest of high status, but when you fail to solve the problem (or more likely make it much worse) you will fall to the lowest of the low. These are the things that funny situations are made of.</p>	2	12	1	1	\N
175	2016-02-04 23:19:13.647811	2016-02-04 23:19:13.647811	Two players do a normal scene, preferably one in which lots of action might be likely. At any point when a player needs to do something "dangerous" they are tagged out by a third player, who is the stunt double, doing the action instead. Afterwards, the normal player tags back in and the scene continues.	1	2	1	1	\N
60	2013-11-22 10:57:59	2013-11-22 10:57:59	<p>Everybody stands in a circle, with one player in the middle. This player in the middle, we'll call them "It," randomly steps up to players in the circle and throws challenges at them (we'll call the challenged player "At"). Any time a player slips up and does something they aren't supposed to, "It" takes their place, and they become the new "It."</p>\n\n<p>The first challenge is for "It" to simply yell <strong>"Bibbity Bibbity Bop!"</strong> When this happens, the goal is for "At" to say "Bop" before "It" does.</p>\n\n<p>With that mastered, increase the challenge by adding <strong>"Miggity Miggity Mack."</strong> When "It" says this, the goal is for "At" to say nothing.</p>\n\n<p>Once you get the hang of all that, you can throw in the fun ones. For these, "It" will yell a word at "At" and then count to 10 as quickly as possible. Before "It" reaches ten, "At" and the player on each side of "At" have to build whatever thing "It" yelled. Agree on the words and forms that you will use ahead of time. There's no limit to what things you can use, so you can mix it up to keep people on their toes. There are some old standards which you can use or take inspiration from.</p>\n\n<p>The first is <strong>"Elephant."</strong> When "Elephant" is called, "At" forms a trunk by holding one hand on their nose and sticking their other arm out in front (making an elephant noise is highly encouraged). The player to the left of "At" forms the left ear by holding her arms up to "At's" head (like you're three-fourths of the way through the YMCA song). The player on the right of "At" forms the right ear in the same way.</p>\n\n<p>For <strong>"Toaster"</strong> the two players on either side of "At" hold their arms together, forming a "slot" for "At" to pop out of like a piece of toast. I don't know what kind of sound toast makes, but feel free to figure that out.</p>\n\n<p>Another fun one would be <strong>"Flamingos."</strong> For this one, the three players ("At" and the player on either side of her) all pretend to be a flock of flamingoes. This is pretty simple, you just hold your hands under your arms (as if you felt like chicken tonight) and stand with one foot on your other knee (this is a thing flamingoes do a lot, because they don't have anything better to do).</p>\n\n<p>Yet another option is <strong>"Star Wars."</strong> For this the three players will form the classic image on the original Star Wars poster. "At" becomes Luke, and holds his "copyright non-infringing generic laser sword" up in the air over his head. The player on the right becomes Han, and stands with his back to "At" holding a "unspecified handheld shoot blaster" at the ready. Finally, the player on the left becomes Leia, and kneels at Luke's feet in that awkward, subservient sort of pose that we never talk about. As a reminder, remember that <em>Left</em> is <em>Leia</em>.</p>\n\n<p>Use any combination of these things, or come up with your own challenges. Start with just one or two options, and add more as you master them. The point is to keep people on their feet, reacting quickly, and working together. Have fun!</p>	2	4	1	1	\N
31	2013-11-22 09:50:15	2013-11-22 09:50:15	<p>This is a basic scene exercise, meant to distill a scene down to its most basic elements. This exercise is a good way to practice establishing the foundation of a scene. Three people, whom we will call Circle, Square, and Triangle, do a scene.  Circle starts, doing some sort of action on stage.  Square enters the scene and initiates as much as possible in a single sentence. Square should establish what Circle is doing, who they are, what their relationship is, and why they are doing what they are doing.  Circle counters by "raising the stakes" or building on what Square established. Finally, Triangle enters and solves the problem. You only have three lines, so it will be a very basic scene.</p>\n\n<p>Here's an example:</p>\n\n<p><em>Circle slices bread.</em></p>\n\n<p>Square: "Honey, that fresh bread smells so good, but I hate that you always take it all to work and never leave me any."</p>\n\n<p>Circle: "When you are in charge of paying my salary, then I will be more inclined to bribe you with fresh bread."</p>\n\n<p>Triangle: "I was just strolling through the neighborhood and I couldn't help but smell that delicious bread baking. I would gladly pay you for a loaf."</p>\n\n<p><em>Scene</em></p>\n\n<p>You can also play this with just two people, and have Square supply the resolution at the end.</p>	4	2	1	1	\N
182	2016-11-28 16:36:47.118814	2016-11-28 16:36:47.118814	Have everybody wander aimlessly around the space. Have each player imagine a different status "high, low, or something in-between," and then interact with each other. Explore how status informs your behavior and how you interact with other people. Keep in mind that status isn't necessarily about social rank, but how you behave. Also, explore more than just "high" and "low" status, seeing how more subtle levels change your behavior.	1	4	1	1	\N
178	2016-10-05 14:28:25.948833	2016-10-05 14:28:25.948833	<p>In this scenic exercise, players explore the effects of status on character and relationships. Start with two or three players. If using three, consider tagging one of them to start the scene off-stage. Before the scene begins, each player should (secretly in their own heads) pick a number between one and the number of players. If two players pick the same number, that's fine. This number informs the player of their "status" in the scene. One is the lowest status, and two or three (or however many players there are) is the highest. Obviously, you can reverse that and make one the highest - just as long as everybody agrees as to what is "high" and what is "low." With the numbers established (secretly, of course), the players then do a normal scene, with that number informing their character's status in the scene.</p>\n\n<p>This can be a challenging exercise, because it can prove difficult to drive a "good" scene and keep your status in mind. It can be helpful to pause the scene at some point and ask the audience (if this is during a practice or exercise) what they think each character's number is - this can help the players get an idea of how well they are conveying their status. You'll have more fun if you fully commit to your status. It can get really crazy (in a good way) if two players are "competing" over the same status, trying to outdo each other in being the lowest, highest, or most middlest status possible.</p>\n\n<p>Another technique you can use is to have each player draw a playing card and hold it to their forehead. This informs everybody else in the scene what everyone's status is, but each player doesn't know themselves. See how quickly and accurately you can figure out what your status is. If the old forehead thing is a little too silly, just draw a card and let it establish your status or your partner's status.</p>	1	5	1	1	\N
24	2013-11-12 15:20:11	2013-11-12 15:20:11	<p>This game is played entirely using mime and gibberish.  Three players leave the room (or two players an an audience member).  One player remains on stage, and gets suggestions for a Location, an Occupation, and a Weapon (easily remembered as "LOW") which were involved in a murder.  Now the players each come inside one at a time, and (starting with the player on stage), convey to the next player what they think the three suggestions were. Take each thing one at a time, so everybody knows that you're trying to convey the Location first, then move on to the Occupation only when the guesser signifies that they have figured out the clue. This game works like the game "telephone" so the last player will hopefully be way off the mark.  When a player thinks he has all three things, everyone yells "Murder Murder Murder!" and he "murders" the first player.</p>\n\n<p>Once you've mastered the game, try a challenge mode, where each player only gets 30 seconds (or so) to convey each of the clues (Location, Occupation, Weapon). They move on, whether they get the clue or not.</p>	1	8	1	1	\N
47	2013-11-22 10:39:51	2013-11-22 10:39:51	<p>Two players perform a scene.  One of the players in the scene has an "evil twin."  Someone off stage will yell "evil twin" and everyone on stage freezes.  A third player runs out, tags out the "good twin" and the scene resumes.  Then someone yells "good twin" and the good twin returns.  While the evil twin is on stage, he should try to do everything he can to make life miserable (or otherwise be "evil") to the other character (called the "patsy").  When the good twin returns, he has to justify what the evil twin did, as if both twins were one person.</p>\n\n<p>You can have the evil twin (and good twin) call the switches, so the twins have control over "taking over" the scene.</p>	1	2	1	1	\N
96	2014-12-14 19:04:53.958	2014-12-14 19:04:53.958	<p>Gather the group into a circle. One at a time, starting anywhere in the circle and continuing clockwise, each player will introduce themselves by saying their name (first names are fine) and doing a gesture of some sort. The gesture doesn't have to be anything specific or make any sense. You could do a jumping jack, salute, or abstractly wave your arms about - it doesn't matter. The point is to just get on your feet and do a thing. After each player demonstrates their name and gesture, the entire group repeats it in unison. Try your best to replicate the gesture as closely as the person who created it.</p>\n\n<p>After everyone has had a chance to give their gesture, inform the group that you are going to raise the stakes. Consider your level of commitment and enthusiasm a "1" and go through the process again, raising it to a "10." Starting with the first player again and repeat the process with the same names and gestures. Each player demonstrates their name and gesture, this time increasing the intensity all the way to 10. The group repeats it in unison, copying that level of intensity. What does it feel like to commit more fully to an action? How does your gesture evolve? Does it go from a simple hop to a giant leap? Does a simple salute become a full-body exercise?</p>\n\n<p>After doing all of the gestures again, repeat the process a third time. Consider this new level of commitment a "1" and extrapolate that all the way to "10." How can you make your gesture that much more intense?</p>\n\n<p>Now endeavor to do everything with that level of commitment and enthusiasm. Why not just start at maximum intensity?</p>\n\n<p><em>You can apply two modifications to this game. First, instead of having the entire group repeat each gesture in unison, have each player repeat all of the names and gestures of every player that came before them. Yes, this means that the last player in the circle will be doing everybody's gesture. Also, instead of just doing one gesture, you can have each player do a different gesture for each syllable in their name. For example, if my name was "Alyson," I would do a gesture for "al," a gesture for "ih," and a gesture for "son."</em></p>	1	4	1	1	\N
180	2016-11-28 16:00:25.302101	2016-11-28 16:00:25.302101	<p>This is probably the most classic Improv warmup exercise. First, everybody gets in a circle, facing inside. Someone starts, and passes energy randomly across the circle, with the pattern "Zip, Zap, Zup" saying the words one at a time. The first player passes "Zip" across the circle to someone, then that person passes "Zap" to someone else, and then that player passes "Zup" to someone, who starts the pattern all over again.</p>\n\n<p>Make eye contact, and be clear and direct when you pass the energy. Make sure there can be no confusion about what your intentions are. Point your finger and enunciate loudly and clearly. If you aren't clear about who you are passing to, or what syllable you have passed, it could lead to confusion about what happens next. Every player in this game is a link in a chain - don't be the link that breaks the chain.</p>\n\n<p>You can do whatever you want when someone messes up (either by missing the pattern, saying the wrong word, taking too long, or thinking they have the pattern when they don't). Most people simply eliminate everyone until only two people are left. This isn't very fun, though, because nobody likes to feel like they failed a warmup exercise. An alternative is to make the people who have little accidents switch to a different pattern. For example, while everybody stays on "Zip Zap Zup" the person who missed their turn will be on "Kip, Kap, Kup" instead, so the pattern might go, "Zip, Kap, Zup, Zip, Zap, Kup" and so-on. If they mess up "Kip Kap Kup," they can switch to "Tip, Tap, Tup," or "Wip, Wap, Wup," or whatever else you want.</p>\n\n<p>Start the pattern slowly enough for everybody to get into it. Let the players, especially if they've never played before, get used to the pattern and with passing energy across the circle. As you get more into it, increase the speed and intensity. See how quickly and smoothly you can fire off the pattern. Missing the pattern doesn't mean you failed, it just means you get to have a new way to play.</p>	1	6	1	1	\N
132	2015-03-14 13:02:13.69	2015-03-14 13:02:13.69	<p>To start this warmup, everybody should get a quick rhythm going by tapping on their thighs or whatever. This isn't a rhythm to follow or anything, it's more of a steady drum roll to keep the energy up. You don't have to all be in a circle, but it probably makes sense.</p>\n\n<p>Somebody in the group starts by picking somebody at random and saying, "hey [name of person]!"</p>\n\n<p>That person might respond, "what's up, [name of other person]?" The banter doesn't really matter, just have fun with it.</p>\n\n<p>The first person then asks for five things of some category, like "What are five things you could find in your shoe?" or "What are five things that can fly?"</p>\n\n<p>The person then comes up with five things that fit the category. There are no right or wrong answers here, just say whatever. After each thing, the group will count them together, chanting "One!" and "two!" and so on until you get five things (hence the name of the game). After the last one, everybody says "these are five things!" The person who just listed things calls somebody else out, and prompts them with another category. Keep going until everybody has gone, saving the person who asked the first question for last.</p>	1	4	1	1	\N
\.


--
-- TOC entry 2651 (class 0 OID 0)
-- Dependencies: 175
-- Name: game_GameID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"game_GameID_seq"', 182, true);


--
-- TOC entry 2602 (class 0 OID 3398642)
-- Dependencies: 176
-- Data for Name: name; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY name ("NameID", "GameID", "Name", "Weight", "DateAdded", "DateModified", "AddedUserID", "ModifiedUserID") FROM stdin;
1	1	185	1	2013-11-04 21:05:28	2013-11-04 21:05:28	1	1
2	2	Freeze	2	2013-11-04 21:08:37	2013-11-04 21:08:37	1	1
3	2	Freeze Tag	1	2013-11-04 21:15:38	2013-11-04 21:15:38	1	1
261	176	Infomercial	1	2016-09-19 19:48:49.886733	2016-09-19 19:48:49.886733	1	1
6	5	3 Things	1	2013-11-10 16:08:03	2013-11-10 16:08:03	1	1
7	6	Alphabet Scene	1	2013-11-10 16:09:56	2013-11-10 16:09:56	1	1
8	7	Pet-peeve Rant	1	2013-11-10 21:52:27	2013-11-10 21:52:27	1	1
9	8	Press Conference	1	2013-11-10 22:04:38	2013-11-10 22:04:38	1	1
10	9	Blind Date	1	2013-11-10 22:09:51	2013-11-10 22:09:51	1	1
11	10	Blind Freeze	1	2013-11-10 22:12:21	2013-11-10 22:12:21	1	1
12	11	Anti Freeze	1	2013-11-11 18:04:30	2013-11-11 18:04:30	1	1
18	17	Arms	1	2013-11-11 18:14:51	2013-11-11 18:14:51	1	1
20	19	Before or After	1	2013-11-11 18:19:10	2013-11-11 18:19:10	1	1
21	20	Blindfold Scene	1	2013-11-11 18:25:31	2013-11-11 18:25:31	1	1
22	21	Nightmare	1	2013-11-11 21:42:43	2013-11-11 21:42:43	1	1
23	22	First Line / Last Line	1	2013-11-11 21:45:36	2013-11-11 21:45:36	1	1
25	24	Chain Murder Mystery	1	2013-11-12 15:20:12	2013-11-12 15:20:12	1	1
26	25	Sideline Debate	1	2013-11-12 15:23:01	2013-11-12 15:23:01	1	1
27	26	Continuation	1	2013-11-21 15:29:59	2013-11-21 15:29:59	1	1
28	27	Foreign Film Dubbing	1	2013-11-22 09:19:39	2013-11-22 09:19:39	1	1
29	28	Party Quirks	1	2013-11-22 09:28:16	2013-11-22 09:28:16	1	1
30	29	Secrets	1	2013-11-22 09:38:22	2013-11-22 09:38:22	1	1
31	30	Triggers	1	2013-11-22 09:45:50	2013-11-22 09:45:50	1	1
33	32	Green Ghost	1	2013-11-22 09:51:15	2013-11-22 09:51:15	1	1
34	33	What are you doing?	1	2013-11-22 09:53:31	2013-11-22 09:53:31	1	1
35	34	Bitch Concerto	1	2013-11-22 09:54:53	2013-11-22 09:54:53	1	1
38	37	B Movie	1	2013-11-22 09:58:08	2013-11-22 09:58:08	1	1
39	38	Death Pendulum	1	2013-11-22 09:59:38	2013-11-22 09:59:38	1	1
40	39	Dating Game	1	2013-11-22 10:03:47	2013-11-22 10:03:47	1	1
41	40	Day in the Life	1	2013-11-22 10:05:17	2013-11-22 10:05:17	1	1
42	41	Dead Monkeys	1	2013-11-22 10:06:47	2013-11-22 10:06:47	1	1
44	43	Do Run / Do Rap	1	2013-11-22 10:32:39	2013-11-22 10:32:39	1	1
45	44	Emotion Replay	1	2013-11-22 10:35:02	2013-11-22 10:35:02	1	1
46	45	Emotion Symphony	1	2013-11-22 10:37:24	2013-11-22 10:37:24	1	1
47	46	Emotion Zones	1	2013-11-22 10:39:19	2013-11-22 10:39:19	1	1
48	47	Evil Twin	1	2013-11-22 10:39:51	2013-11-22 10:39:51	1	1
49	48	Film Noire	1	2013-11-22 10:41:06	2013-11-22 10:41:06	1	1
50	49	Forward / Reverse	1	2013-11-22 10:42:11	2013-11-22 10:42:11	1	1
51	50	Get out of that Chair	1	2013-11-22 10:43:15	2013-11-22 10:43:15	1	1
53	52	History	1	2013-11-22 10:48:58	2013-11-22 10:48:58	1	1
54	53	Interrogation	1	2013-11-22 10:49:48	2013-11-22 10:49:48	1	1
55	54	Interpretive Dance	1	2013-11-22 10:50:57	2013-11-22 10:50:57	1	1
57	56	Musical Theatre	1	2013-11-22 10:53:28	2013-11-22 10:53:28	1	1
60	59	Electric Company	1	2013-11-22 10:57:05	2013-11-22 10:57:05	1	1
61	60	Bibbity Bibbity Bop	1	2013-11-22 10:57:59	2013-11-22 10:57:59	1	1
62	61	N-Word Scenes	1	2013-11-22 10:59:18	2013-11-22 10:59:18	1	1
64	62	Sit, Stand, Lie Down	1	2014-12-01 21:29:13.202	2014-12-01 21:29:13.202	1	1
66	64	Changing Genres	1	2014-12-01 21:37:21.981	2014-12-01 21:37:21.981	1	1
67	65	Where are your Papers?	1	2014-12-01 21:42:33.38	2014-12-01 21:42:33.38	1	1
68	66	I Wonder	1	2014-12-01 21:53:47.936	2014-12-01 21:53:47.936	1	1
75	68	Character Relay	1	2014-12-01 22:21:29.404	2014-12-01 22:21:29.404	1	1
76	69	Life Boat	1	2014-12-01 22:26:04.642	2014-12-01 22:26:04.642	1	1
77	70	Serendipity	1	2014-12-01 22:30:09.853	2014-12-01 22:30:09.853	1	1
78	71	Channel Changer	1	2014-12-01 22:33:25.989	2014-12-01 22:33:25.989	1	1
79	72	Challenge!	1	2014-12-01 22:40:32.212	2014-12-01 22:40:32.212	1	1
80	73	I'm not a Doctor	1	2014-12-01 22:46:41.155	2014-12-01 22:46:41.155	1	1
81	74	Buzzard Symphony	1	2014-12-01 22:49:37.723	2014-12-01 22:49:37.723	1	1
82	75	Beads on a String	1	2014-12-01 22:55:04.828	2014-12-01 22:55:04.828	1	1
83	76	Vacation	1	2014-12-02 10:07:29.436	2014-12-02 10:07:29.436	1	1
85	78	Excuses	1	2014-12-02 10:21:40.108	2014-12-02 10:21:40.108	1	1
87	80	Onion Peel	1	2014-12-02 10:32:01.729	2014-12-02 10:32:01.729	1	1
88	81	What Will They Think of Next? (TM)	1	2014-12-02 10:37:52.622	2014-12-02 10:37:52.622	1	1
90	83	Super Heroes	1	2014-12-02 11:23:42.437	2014-12-02 11:23:42.437	1	1
91	84	Bathroom	1	2014-12-02 11:28:29.237	2014-12-02 11:28:29.237	1	1
92	85	World's Worst	1	2014-12-02 11:31:48.443	2014-12-02 11:31:48.443	1	1
94	87	Slo-mo Sports	2	2014-12-02 14:31:10.214	2014-12-02 14:31:10.214	1	1
17	16	Animals	2	2013-11-11 18:13:11	2014-12-03 11:35:40.582	1	1
84	77	Hitchhiker	2	2014-12-02 10:14:01.325	2014-12-03 11:43:58.246	1	1
69	67	Inner Thoughts	2	2014-12-01 22:03:30.718	2014-12-03 11:44:30.662	1	1
63	3	Shoulda' Said	2	2014-12-01 19:40:06.896	2014-12-03 11:46:04.678	1	1
59	58	Professor Know-it-all	2	2013-11-22 10:55:09	2014-12-03 11:47:36.016	1	1
37	36	Countdown	2	2013-11-22 09:57:34	2014-12-04 09:32:43.057	1	1
58	57	Questions Only	2	2013-11-22 10:54:18	2014-12-04 09:54:43.551	1	1
32	31	Circle, Square, Triangle	2	2013-11-22 09:50:15	2014-12-14 18:37:14.106	1	1
16	15	Air Traffic Control	2	2013-11-11 18:11:34	2014-12-15 17:49:22.647	1	1
19	18	Movie Critics	2	2013-11-11 18:16:16	2014-12-16 10:19:29.525	1	1
89	82	Blind Line	2	2014-12-02 11:18:27.797	2014-12-18 22:25:11.071	1	1
36	35	Conduct a Story	2	2013-11-22 09:55:30	2015-01-03 13:08:09.582	1	1
93	86	Four Square	2	2014-12-02 11:41:12.771	2015-02-02 09:15:42.489	1	1
98	2	Freeze and Justify	1	2014-12-02 21:14:12.123	2014-12-02 21:14:12.123	1	1
104	57	Questions	1	2014-12-02 21:22:17.364	2014-12-02 21:22:17.364	1	1
105	67	Innerminds	1	2014-12-02 21:23:29.86	2014-12-02 21:23:29.86	1	1
106	87	Wide Wide World of Everyday Life	1	2014-12-02 21:26:40.735	2014-12-02 21:26:40.735	1	1
107	18	Weak Previews	1	2014-12-02 21:28:05.801	2014-12-02 21:28:05.801	1	1
108	27	Foreign Movies	1	2014-12-02 21:29:49.479	2014-12-02 21:29:49.479	1	1
109	35	Story Story Die	1	2014-12-02 21:31:14.096	2014-12-02 21:31:14.096	1	1
110	13	Emotional Hurdles	1	2014-12-02 21:31:55.479	2014-12-02 21:31:55.479	1	1
111	58	Expert	1	2014-12-02 21:33:44.915	2014-12-02 21:33:44.915	1	1
112	16	Animal Crackers	1	2014-12-02 21:34:02.597	2014-12-02 21:34:02.597	1	1
113	3	New Choice	1	2014-12-02 21:36:07.112	2014-12-02 21:36:07.112	1	1
114	36	Instant Replay	1	2014-12-02 21:43:02.284	2014-12-02 21:43:02.284	1	1
115	77	Taxi Cab	1	2014-12-03 11:43:54.858	2014-12-03 11:43:54.858	1	1
116	90	Action Hero	1	2014-12-04 09:52:21.07	2014-12-04 09:52:21.07	1	1
86	79	Entrances and Exits	2	2014-12-02 10:24:45.822	2016-02-02 15:05:35.709388	1	1
24	23	Complaint Department	2	2013-11-11 21:47:47	2016-02-02 15:23:50.797158	1	1
43	42	Deaf Interpreter	2	2013-11-22 10:09:16	2016-02-02 17:08:32.644615	1	1
56	55	Genre Replay	2	2013-11-22 10:52:02	2016-02-02 17:50:35.822373	1	1
52	51	Good Advice, Bad Advice, Worst Advice	2	2013-11-22 10:47:38	2016-02-03 02:00:43.338393	1	1
117	91	Props	1	2014-12-14 18:28:46.227	2014-12-14 18:28:46.227	1	1
119	31	Three Lines	1	2014-12-14 18:37:11.488	2014-12-14 18:37:11.488	1	1
121	93	3 Series	1	2014-12-14 18:46:43.768	2014-12-14 18:46:43.768	1	1
120	93	Pattern Circle	2	2014-12-14 18:45:58.697	2014-12-14 18:46:45.313	1	1
122	92	10 Fingers	1	2014-12-14 18:46:56.526	2014-12-14 18:46:56.526	1	1
118	92	Ten Fingers	2	2014-12-14 18:36:45.764	2014-12-14 18:46:59.109	1	1
123	94	Three Some	1	2014-12-14 18:54:16.178	2014-12-14 18:54:16.178	1	1
124	95	Accepting Circle	1	2014-12-14 18:58:47.068	2014-12-14 18:58:47.068	1	1
125	95	Energy Circle	1	2014-12-14 18:59:01.603	2014-12-14 18:59:01.603	1	1
126	96	Action Names	1	2014-12-14 19:04:53.976	2014-12-14 19:04:53.976	1	1
127	97	Understudy	1	2014-12-15 17:36:58.821	2014-12-15 17:36:58.821	1	1
129	98	Advancing and Expanding	1	2014-12-15 17:46:18.277	2014-12-15 17:46:18.277	1	1
130	99	Three Rules	1	2014-12-15 17:48:58.083	2014-12-15 17:48:58.083	1	1
131	15	Airplane	1	2014-12-15 17:49:16.068	2014-12-15 17:49:16.068	1	1
132	15	Blind Lead	1	2014-12-15 17:49:20.367	2014-12-15 17:49:20.367	1	1
133	100	Ali Baba and the Forty Thieves	1	2014-12-15 17:56:09.773	2014-12-15 17:56:09.773	1	1
134	101	Alien Tiger Cow	1	2014-12-15 17:59:31.682	2014-12-15 17:59:31.682	1	1
135	102	Alliteration Introduction	1	2014-12-15 18:17:25.61	2014-12-15 18:17:25.61	1	1
136	103	Alliteration	1	2014-12-15 18:23:32.691	2014-12-15 18:23:32.691	1	1
137	104	Alphabet Circle	1	2014-12-16 09:56:59.762	2014-12-16 09:56:59.762	1	1
138	67	Asides	1	2014-12-16 09:58:12.103	2014-12-16 09:58:12.103	1	1
139	105	Friends and Enemies	1	2014-12-16 10:05:40.227	2014-12-16 10:05:40.227	1	1
140	106	Tableaus	1	2014-12-16 10:11:35.873	2014-12-16 10:11:35.873	1	1
142	107	Feature Film	1	2014-12-16 10:17:32.875	2014-12-16 10:17:32.875	1	1
143	107	At the Movies	1	2014-12-16 10:17:40.389	2014-12-16 10:17:40.389	1	1
141	107	Director	2	2014-12-16 10:17:09.582	2014-12-16 10:17:41.754	1	1
144	108	Automatic Storytelling	1	2014-12-16 10:26:17.969	2014-12-16 10:26:17.969	1	1
146	110	Actor Replay	1	2014-12-16 10:36:42.317	2014-12-16 10:36:42.317	1	1
147	111	Backwards Interview	1	2014-12-16 10:41:28.214	2014-12-16 10:41:28.214	1	1
148	36	Half Life	1	2014-12-16 10:42:32.348	2014-12-16 10:42:32.348	1	1
149	112	Baladeer	1	2014-12-16 10:45:17.362	2014-12-16 10:45:17.362	1	1
150	113	Bandaid Tag	1	2014-12-16 11:00:00.657	2014-12-16 11:00:00.657	1	1
151	114	Barney	1	2014-12-16 11:14:14.035	2014-12-16 11:14:14.035	1	1
152	115	Barnyard	1	2014-12-17 11:31:43.506	2014-12-17 11:31:43.506	1	1
153	116	Catch 'Em	1	2014-12-17 11:38:49.238	2014-12-17 11:38:49.238	1	1
154	117	Beasty Rap	1	2014-12-17 12:10:26.71	2014-12-17 12:10:26.71	1	1
155	118	Beatnik Poet	1	2014-12-17 12:15:33.487	2014-12-17 12:15:33.487	1	1
156	119	Become	1	2014-12-17 12:18:37.212	2014-12-17 12:18:37.212	1	1
157	120	Hat Continuation	1	2014-12-17 15:15:56.023	2014-12-17 15:15:56.023	1	1
158	121	Big Booty	1	2014-12-17 15:35:11.464	2014-12-17 15:35:11.464	1	1
159	122	Big Fish Small Fish	1	2014-12-17 16:26:38.927	2014-12-17 16:26:38.927	1	1
160	123	Blind Line Offers	1	2014-12-18 21:46:05.047	2014-12-18 21:46:05.047	1	1
161	124	Group Order	1	2014-12-18 21:57:57.825	2014-12-18 21:57:57.825	1	1
163	125	Goalie	1	2014-12-18 22:16:18.98	2014-12-18 22:16:18.98	1	1
162	125	Scene Gauntlet	1	2014-12-18 22:15:57.721	2014-12-18 22:16:21.471	1	1
164	126	Body Hide	1	2014-12-18 22:19:36.317	2014-12-18 22:19:36.317	1	1
165	127	Bong Bong Bong	1	2014-12-18 22:22:55.602	2014-12-18 22:22:55.602	1	1
166	31	Boom Chicago	1	2014-12-18 22:23:59.094	2014-12-18 22:23:59.094	1	1
167	82	Bucket	1	2014-12-18 22:25:09.585	2014-12-18 22:25:09.585	1	1
168	128	Bucket of Death	1	2014-12-18 22:27:51.284	2014-12-18 22:27:51.284	1	1
169	129	Bumpity Bump	1	2014-12-18 22:33:02.441	2014-12-18 22:33:02.441	1	1
170	130	Bunny	1	2014-12-19 16:04:46.287	2014-12-19 16:04:46.287	1	1
171	131	Bunny Chant	1	2014-12-19 16:38:04.485	2014-12-19 16:38:04.485	1	1
172	86	Shift Left	1	2015-02-02 09:15:02.111	2015-02-02 09:15:02.111	1	1
176	132	5 Things	1	2015-03-14 13:02:31.867	2015-03-14 13:02:31.867	1	1
175	132	Five Things	2	2015-03-14 13:02:13.776	2015-03-14 13:02:33.531	1	1
177	133	Red Ball	1	2016-01-08 16:33:01.611001	2016-01-08 16:33:01.611001	1	1
178	134	Pardon	1	2016-01-08 17:43:40.086298	2016-01-08 17:43:40.086298	1	1
179	24	Murder, Murder, Die	1	2016-01-08 17:44:39.640465	2016-01-08 17:44:39.640465	1	1
180	93	You	1	2016-02-01 20:28:05.446157	2016-02-01 20:28:05.446157	1	1
182	135	Show us your Butt!	1	2016-02-01 20:32:35.234619	2016-02-01 20:32:35.234619	1	1
181	135	Zulu	1	2016-02-01 20:32:17.2333	2016-02-01 20:32:38.959842	1	1
183	136	Zombie Name	1	2016-02-01 20:36:48.328545	2016-02-01 20:36:48.328545	1	1
184	137	Whoosh	1	2016-02-01 20:51:44.410148	2016-02-01 20:51:44.410148	1	1
185	138	You're Fired	1	2016-02-01 21:01:07.668768	2016-02-01 21:01:07.668768	1	1
186	139	Yes, You	1	2016-02-01 21:04:37.615988	2016-02-01 21:04:37.615988	1	1
187	93	Word Ball	1	2016-02-01 21:05:23.303231	2016-02-01 21:05:23.303231	1	1
14	13	Changing Emotions	2	2013-11-11 18:08:27	2016-02-01 21:48:53.509927	1	1
188	140	Word at a Time Song	1	2016-02-01 22:19:24.967287	2016-02-01 22:19:24.967287	1	1
189	141	Word at a time Scene	1	2016-02-01 22:22:32.631754	2016-02-01 22:22:32.631754	1	1
190	4	Instruction Manual	1	2016-02-01 22:30:23.330808	2016-02-01 22:30:23.330808	1	1
191	4	Word at a time Proverb	1	2016-02-01 22:30:31.472301	2016-02-01 22:30:31.472301	1	1
5	4	Word at a time Story	2	2013-11-10 16:04:27	2016-02-01 22:30:33.939231	1	1
192	4	Word at a time	1	2016-02-01 22:31:42.760283	2016-02-01 22:31:42.760283	1	1
193	58	Word at a Time Expert	1	2016-02-01 22:33:17.676177	2016-02-01 22:33:17.676177	1	1
194	142	Without Words	1	2016-02-01 22:34:52.807918	2016-02-01 22:34:52.807918	1	1
195	142	Without Sound	1	2016-02-01 22:36:14.659464	2016-02-01 22:36:14.659464	1	1
196	142	No Talking	1	2016-02-01 22:36:19.196668	2016-02-01 22:36:19.196668	1	1
197	143	Who Where Why Am I	1	2016-02-01 22:42:24.394838	2016-02-01 22:42:24.394838	1	1
198	144	Who Stole the Cookies	1	2016-02-01 22:46:10.915686	2016-02-01 22:46:10.915686	1	1
200	145	What Would He Be If	1	2016-02-01 22:53:31.564133	2016-02-01 22:53:31.564133	1	1
205	79	Walkout	1	2016-02-02 15:05:33.754634	2016-02-02 15:05:33.754634	1	1
199	145	What Would She Be If	2	2016-02-01 22:49:11.972135	2016-02-01 22:53:49.626971	1	1
201	146	What has Changed	1	2016-02-02 14:46:26.237319	2016-02-02 14:46:26.237319	1	1
202	147	What Happens Next	1	2016-02-02 14:50:47.931939	2016-02-02 14:50:47.931939	1	1
203	147	And Then	1	2016-02-02 14:51:20.333017	2016-02-02 14:51:20.333017	1	1
204	148	Warehouse	1	2016-02-02 15:02:08.489066	2016-02-02 15:02:08.489066	1	1
206	79	Exit Game	1	2016-02-02 15:05:40.980636	2016-02-02 15:05:40.980636	1	1
207	149	Walking by Numbers	1	2016-02-02 15:09:10.589909	2016-02-02 15:09:10.589909	1	1
208	150	Walk-over Association	1	2016-02-02 15:16:01.76264	2016-02-02 15:16:01.76264	1	1
209	151	Voices From Heaven	1	2016-02-02 15:21:36.977442	2016-02-02 15:21:36.977442	1	1
210	23	Repair Shop	1	2016-02-02 15:23:39.411751	2016-02-02 15:23:39.411751	1	1
211	23	Veterinarian Endowment	1	2016-02-02 15:23:48.855989	2016-02-02 15:23:48.855989	1	1
212	152	Murderer	1	2016-02-02 15:50:53.682416	2016-02-02 15:50:53.682416	1	1
213	153	Scorpion	1	2016-02-02 15:58:25.129335	2016-02-02 15:58:25.129335	1	1
215	153	Blind Hunt	1	2016-02-02 15:58:57.803563	2016-02-02 15:58:57.803563	1	1
216	153	Screamers	1	2016-02-02 15:59:01.922969	2016-02-02 15:59:01.922969	1	1
128	97	Changing Actors	2	2014-12-15 17:37:44.944	2016-02-02 16:05:55.121711	1	1
145	109	Historical Replay	2	2014-12-16 10:31:53.956	2016-02-02 17:49:12.104431	1	1
217	153	Haunted House	1	2016-02-02 15:59:07.617086	2016-02-02 15:59:07.617086	1	1
263	178	Pecking Order	1	2016-10-05 14:28:25.955119	2016-10-05 14:28:25.955119	1	1
264	95	Exaggeration Circle	1	2016-10-10 19:49:17.324474	2016-10-10 19:49:17.324474	1	1
218	153	Blind Stalker	1	2016-02-02 15:59:15.371101	2016-02-02 15:59:15.371101	1	1
265	34	Complaint Concerto	2	2016-10-24 18:29:06.742721	2016-10-24 18:29:08.258948	1	1
266	3	Ding	1	2016-11-27 13:40:20.227624	2016-11-27 13:40:20.227624	1	1
267	179	Pillars	1	2016-11-28 15:25:11.290718	2016-11-28 15:25:11.290718	1	1
268	179	Tap for a Word	1	2016-11-28 15:31:45.410613	2016-11-28 15:31:45.410613	1	1
269	179	Help a Brother Out	1	2016-11-28 15:31:52.800967	2016-11-28 15:31:52.800967	1	1
270	25	Sideline Sermon	1	2016-11-28 15:47:55.530776	2016-11-28 15:47:55.530776	1	1
271	25	Sideline Infomercial	1	2016-11-28 15:48:02.390442	2016-11-28 15:48:02.390442	1	1
272	30	Wacky Reactions	1	2016-11-28 15:48:31.033484	2016-11-28 15:48:31.033484	1	1
273	5	5 Things	1	2016-11-28 15:48:50.127431	2016-11-28 15:48:50.127431	1	1
274	5	Three Things	1	2016-11-28 15:48:54.881556	2016-11-28 15:48:54.881556	1	1
275	5	Guess the Thing	1	2016-11-28 15:49:04.221554	2016-11-28 15:49:04.221554	1	1
276	24	Chain Death Murder	1	2016-11-28 15:49:44.012651	2016-11-28 15:49:44.012651	1	1
277	80	Space Case	1	2016-11-28 15:50:10.019441	2016-11-28 15:50:10.019441	1	1
278	180	Zip Zap Zup	1	2016-11-28 16:00:35.670175	2016-11-28 16:00:35.670175	1	1
279	181	Moving People	1	2016-11-28 16:16:26.497495	2016-11-28 16:16:26.497495	1	1
280	181	Gumby	1	2016-11-28 16:16:32.452116	2016-11-28 16:16:32.452116	1	1
281	182	Status Mixer	1	2016-11-28 16:37:06.263998	2016-11-28 16:37:06.263998	1	1
282	180	Zip Zap Zoop	1	2016-11-28 16:53:10.889954	2016-11-28 16:53:10.889954	1	1
283	180	Zip Zap Zop	1	2016-11-28 16:53:21.796104	2016-11-28 16:53:21.796104	1	1
284	24	Location Career Death	1	2016-11-28 16:58:14.468463	2016-11-28 16:58:14.468463	1	1
285	96	Name and Gesture	1	2017-01-11 20:16:25.209955	2017-01-11 20:16:25.209955	1	1
214	153	Vampire	2	2016-02-02 15:58:52.328876	2016-02-02 15:59:30.724846	1	1
219	97	Continuation	1	2016-02-02 16:05:38.085992	2016-02-02 16:05:38.085992	1	1
220	97	Actor Switch	1	2016-02-02 16:05:48.266935	2016-02-02 16:05:48.266935	1	1
221	154	Typewriter	1	2016-02-02 16:10:53.116665	2016-02-02 16:10:53.116665	1	1
222	58	Two-headed Professor	1	2016-02-02 16:11:54.69955	2016-02-02 16:11:54.69955	1	1
223	58	Oracle	1	2016-02-02 16:11:59.105473	2016-02-02 16:11:59.105473	1	1
224	86	Revolver	1	2016-02-02 16:14:54.30866	2016-02-02 16:14:54.30866	1	1
225	86	Pan Left Pan Right	1	2016-02-02 16:15:00.368014	2016-02-02 16:15:00.368014	1	1
226	86	Turntable	1	2016-02-02 16:15:05.757051	2016-02-02 16:15:05.757051	1	1
227	86	Diamond	1	2016-02-02 16:15:09.568464	2016-02-02 16:15:09.568464	1	1
228	155	Turning Circle	1	2016-02-02 16:16:55.173569	2016-02-02 16:16:55.173569	1	1
229	156	Turkish Army Drill	1	2016-02-02 16:31:00.704064	2016-02-02 16:31:00.704064	1	1
230	157	Tug of War	1	2016-02-02 16:45:01.111178	2016-02-02 16:45:01.111178	1	1
231	158	5 - 4 - 3 - 2 - 1	1	2016-02-02 17:03:34.781508	2016-02-02 17:03:34.781508	1	1
232	158	Triptych	1	2016-02-02 17:05:12.008779	2016-02-02 17:05:12.008779	1	1
233	158	Tapestry	1	2016-02-02 17:05:19.024667	2016-02-02 17:05:19.024667	1	1
234	42	Translation for the Deaf	1	2016-02-02 17:08:30.199477	2016-02-02 17:08:30.199477	1	1
236	159	Gibberish Dictionary	1	2016-02-02 17:17:38.054931	2016-02-02 17:17:38.054931	1	1
235	159	Translate Gibberish	2	2016-02-02 17:16:53.52747	2016-02-02 17:17:41.967262	1	1
237	160	Touch to Talk	1	2016-02-02 17:21:36.984111	2016-02-02 17:21:36.984111	1	1
238	109	Through the Ages	1	2016-02-02 17:49:09.905969	2016-02-02 17:49:09.905969	1	1
239	55	Style Replay	1	2016-02-02 17:50:33.102724	2016-02-02 17:50:33.102724	1	1
241	161	Timeline	1	2016-02-02 17:56:13.912314	2016-02-02 17:56:13.912314	1	1
240	161	Changing Periods	1	2016-02-02 17:56:03.39175	2016-02-02 17:56:16.109338	1	1
242	16	Totems	1	2016-02-02 17:58:21.53625	2016-02-02 17:58:21.53625	1	1
243	162	Three Line Solo	1	2016-02-02 20:08:01.583402	2016-02-02 20:08:01.583402	1	1
244	163	Three Line Environment	1	2016-02-02 20:10:37.787655	2016-02-02 20:10:37.787655	1	1
245	164	Yes Let's	1	2016-02-02 20:56:34.946623	2016-02-02 20:56:34.946623	1	1
246	165	The Scream	1	2016-02-02 21:06:14.757214	2016-02-02 21:06:14.757214	1	1
247	166	The Magnet	1	2016-02-03 02:00:05.175259	2016-02-03 02:00:05.175259	1	1
248	51	The Good, The Bad, and the Ugly Advice	1	2016-02-03 02:00:40.635016	2016-02-03 02:00:40.635016	1	1
249	167	The Bat	1	2016-02-03 02:07:05.030015	2016-02-03 02:07:05.030015	1	1
250	168	The Bag	1	2016-02-04 19:48:48.482475	2016-02-04 19:48:48.482475	1	1
251	158	Five Four Three Two One	1	2016-02-04 19:50:34.123782	2016-02-04 19:50:34.123782	1	1
252	169	Tag Out	1	2016-02-04 19:56:56.433347	2016-02-04 19:56:56.433347	1	1
253	170	Synchro Clap	1	2016-02-04 20:10:08.655149	2016-02-04 20:10:08.655149	1	1
254	171	Sybil	1	2016-02-04 20:14:32.494004	2016-02-04 20:14:32.494004	1	1
255	97	Switcheroo	1	2016-02-04 20:15:29.781857	2016-02-04 20:15:29.781857	1	1
256	172	Switch Gibberish	1	2016-02-04 20:18:17.14304	2016-02-04 20:18:17.14304	1	1
257	173	Survivor	1	2016-02-04 20:53:36.660516	2016-02-04 20:53:36.660516	1	1
258	174	Surprise Movement	1	2016-02-04 20:56:57.606819	2016-02-04 20:56:57.606819	1	1
259	27	Subtitles	1	2016-02-04 23:09:53.908207	2016-02-04 23:09:53.908207	1	1
260	175	Stunt Double	1	2016-02-04 23:19:13.653337	2016-02-04 23:19:13.653337	1	1
\.


--
-- TOC entry 2652 (class 0 OID 0)
-- Dependencies: 177
-- Name: name_NameID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"name_NameID_seq"', 285, true);


--
-- TOC entry 2604 (class 0 OID 3398647)
-- Dependencies: 178
-- Data for Name: note; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY note ("NoteID", "GameID", "Description", "Public", "DateAdded", "DateModified", "AddedUserID", "ModifiedUserID", "TagID", "DurationID", "PlayerCountID") FROM stdin;
2	82	Please don't just pull a note out of your pocket and say "well, my grandma always said, 'herp derp plerp whatever.'" That's a cop-out and super lame. Own the lines, because having to justify them is the fun part.	1	2014-12-03 12:34:23.933	2014-12-03 12:34:23.933	1	1	\N	\N	\N
4	\N	Don't be afraid! If nobody else is stepping forward, just do it - whether you have an idea or not. Just make something up! It's always better in these line-up games to have an awkward non-joke than an awkward silence.	1	2014-12-03 18:06:41.325	2014-12-03 18:06:41.325	1	1	13	\N	\N
6	\N	Don't wait until you have a good idea for a scene, because that will never work out. Just wait for a high moment in a scene, or for somebody in the scene to have a crazy position - then freeze it. You'll come up with something once you get into position.	1	2014-12-03 18:22:11.38	2014-12-03 18:22:11.38	1	1	29	\N	\N
7	11	Anti-Freeze is a good way to "ease into" doing long form.	1	2014-12-03 18:24:10.514	2014-12-03 18:24:10.514	1	1	\N	\N	\N
8	\N	Feel free to "walk on" to a scene to support (if it needs support), turning a two-person scene into a three-, four-, five-, or whatever-person one. When you freeze a scene with more than two people, you can tag as many people as you want to get rid of to bring it back down. Get a feel for the pace, and keep it reasonable - there's no reason to have tons of people on stage for long.	1	2014-12-03 18:31:42.209	2014-12-03 18:31:42.209	1	1	29	\N	\N
9	57	This game is dumb. Honestly, I hate it. Most people will tell you to avoid questions in improv, but here we'll play a game entirely made of questions? It never ends well.	1	2014-12-04 09:53:34.605	2014-12-04 09:53:34.605	1	1	\N	\N	\N
10	95	Alternatively, you can play up the "mutation" by having each person heighten the action like crazy, so as it goes around it just becomes more and more ridiculous and chaotic.	1	2014-12-14 18:59:45.376	2014-12-14 18:59:45.376	1	1	\N	\N	\N
11	82	You don't have to play this with lines from the audience. Give each actor a different book or script or whatever, and they can open to a random page and read a sentence from there. That's super fun and helps you avoid the inevitable audience member who thinks writing "look at my penis" or something is the funniest thing (pro tip: it isn't).	1	2014-12-15 17:39:22.959	2014-12-15 17:39:22.959	1	1	\N	\N	\N
12	49	The trick here is to really repeat everything that has happened, exactly as it happened. When 'reverse' is called, the exact same lines should be said in reverse order, and then 'forward' will play the scene exactly as it just happened. We're watching a video played backwards and forwards - it's always the same thing.	1	2014-12-16 10:33:39.329	2014-12-16 10:33:39.329	1	1	\N	\N	\N
1	2	A good way to practice editing and scene development at the same time.  Try mixing several of the variations for extreme challenge.	1	2013-11-05 11:57:51	2015-02-02 10:38:00.456	1	1	\N	\N	\N
14	4	This would be a fun way to start a show, by just getting a suggestion from the audience (maybe even ahead of time before the show starts) and telling proverbs, one word at a time, based on that suggestion. It's simple enough that it needs no explanation, and it would be a fun way to get the ball rolling, instead of just saying the boring old "welcome to the show, who has seen Improv before, blah blah."	1	2016-02-01 22:27:14.132589	2016-02-01 22:27:14.132589	1	1	\N	\N	\N
15	169	EDITORS NOTE: I'm not sure if this is really relevant to be included in the database, since it isn't really a game on its own. This might be more appropriate for more of a Wiki style "dictionary" of Improv concepts.	1	2016-02-04 19:58:26.412735	2016-02-04 19:58:26.412735	1	1	\N	\N	\N
16	60	This is a classic warmup game which can really be played in a variety of ways. Described here is but one style, but you should feel free to modify it however you see fit to work with you and your group. I suppose that's true of anything on here.\r\n<br /><br />\nPractice how well you can enunciate those words and still say them quickly and clearly for the entire group to hear. Mix up your challenges, throwing a bunch of "bops" out and then a "mack" to trick the players on the outside to respond when they shouldn't.	1	2016-09-27 18:29:05.415951	2016-09-27 18:29:05.415951	1	1	\N	\N	\N
\.


--
-- TOC entry 2653 (class 0 OID 0)
-- Dependencies: 179
-- Name: note_NoteID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"note_NoteID_seq"', 16, true);


--
-- TOC entry 2606 (class 0 OID 3398655)
-- Dependencies: 180
-- Data for Name: permissionkey; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY permissionkey ("Name", "PermissionKeyID") FROM stdin;
note_group	1
note_public	2
name_submit	3
name_vote	4
group_create	5
group_edit	6
group_users	7
user_lock	8
user_edit	9
user_promote	10
game_create	11
game_edit	12
game_delete	13
name_update	15
name_delete	16
user_delete	17
meta_create	18
meta_delete	19
meta_update	20
\.


--
-- TOC entry 2654 (class 0 OID 0)
-- Dependencies: 181
-- Name: permissionkey_PermissionKeyID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"permissionkey_PermissionKeyID_seq"', 20, true);


--
-- TOC entry 2608 (class 0 OID 3398660)
-- Dependencies: 182
-- Data for Name: permissionkeyuserlevel; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY permissionkeyuserlevel ("PermissionKeyUserLevelID", "PermissionKeyID", "UserLevelID") FROM stdin;
1	1	1
2	3	1
3	4	1
4	5	1
5	6	2
6	7	2
7	8	3
8	2	3
9	11	3
10	12	3
11	13	3
12	9	4
13	10	4
14	15	4
15	16	4
16	17	3
17	18	3
18	19	4
19	20	4
\.


--
-- TOC entry 2655 (class 0 OID 0)
-- Dependencies: 183
-- Name: permissionkeyuserlevel_PermissionKeyUserLevelID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"permissionkeyuserlevel_PermissionKeyUserLevelID_seq"', 19, true);


--
-- TOC entry 2610 (class 0 OID 3398665)
-- Dependencies: 184
-- Data for Name: playercount; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY playercount ("PlayerCountID", "Name", "Description", "Min", "Max", "DateAdded", "DateModified", "AddedUserID", "ModifiedUserID") FROM stdin;
1	Pair	Perfect for a pair of improvisers. That's two, if you're not great at words.	2	2	2013-11-04 18:13:59	2013-11-04 18:13:59	1	1
2	Three	Three is the number of people who can play this game, and the number of players shall be "three."	3	3	2013-11-04 18:19:41	2013-11-04 18:19:41	1	1
4	Any	It really doesn't matter how many people you have. Player count not important only life important.	\N	\N	2013-11-04 20:18:38	2013-11-04 20:18:38	1	1
5	At least Two	They say one is the loneliest number. I agree, because hey - one isn't even enough to play this game.	1	\N	2013-11-04 20:20:56	2013-11-04 20:20:56	1	1
6	More than 2	You'll need more than two to tango for this one.	2	\N	2013-11-04 21:06:59	2013-11-04 21:06:59	1	1
7	2 and 2	Two players are in this game. Oh yeah, also there are two other players in this game. I guess that makes four, but they're sort of in teams.	2	2	2013-11-12 15:10:13	2013-11-12 15:10:13	1	1
8	3 or 4	You can use three players, or your can use four. It's your choice - but beware! You could . . . eh, nothing bad will happen. It doesn't really matter.	3	4	2013-11-12 15:12:21	2013-11-12 15:12:21	1	1
9	Two Teams of 3	It's like Gus Macker, except it's less dumb because it isn't basketball. I would apologize for offending you, but if you like basketball you probably didn't notice anyway.	6	6	2013-11-12 15:17:39	2013-11-12 15:17:39	1	1
10	Two teams of at least Two	All that matters is that you have two even teams here. How big the teams are is up to you, but maybe you should take it easy, yeah?	4	\N	2013-11-21 15:29:48	2013-11-21 15:29:48	1	1
11	At least 2 plus 1	Some would just say three, but I'm not one of those.	3	\N	2013-11-21 17:45:48	2013-11-21 17:45:48	1	1
12	Four	A game with four players in it! Not one or two or three but four! Four players!	4	4	2013-11-22 09:28:14	2013-11-22 09:28:14	1	1
13	Five	All of the best teams have five people. The Beatles, Monty Python, The Marx Brothers, the list goes on and on. What do you mean none of those had five people?	5	5	2013-11-22 10:03:11	2013-11-22 10:03:11	1	1
14	Probably at least 8	This will require a good, sizable group to work well, so you'll have to make some more friends. Jeez, it's just like high school all over again.	8	30	2014-12-01 21:42:30.737	2014-12-01 21:44:56.551	1	1
15	Three plus One	My grandma always said you should never have an odd number of boys in a room together. Always have a referee.	4	4	2014-12-01 22:40:20.674	2014-12-01 22:40:20.674	1	1
16	Four plus One	Four people play this game. Also another person plays this game, but in a different capacity. It's like a barbershop quartet with some annoying tone-deaf dude that always follows them around.	5	5	2014-12-02 11:41:04.926	2014-12-02 11:41:04.926	1	1
17	One or Two	If somebody on your team is really stinky or something you can make them do this by themsevles.	1	2	2014-12-15 17:46:13.467	2014-12-15 17:46:13.467	1	1
18	Four to Twelve	It takes a village to raise a child. I guess this game is basically a child, then. Take care of it.	4	12	2016-02-02 17:03:30.387106	2016-02-02 17:03:30.387106	1	1
19	Solo	Solo, dewana-wanga!	1	1	2016-02-02 20:08:00.098966	2016-02-02 20:08:00.098966	1	1
20	Six	Is it true in Germany they pronounce it "sex?"	6	6	2016-02-03 02:07:03.304728	2016-02-03 02:07:03.304728	1	1
21	Four to Six	Just like the production company behind hit 90's sitcom Dharma & Greg, except without the terrible 90's sitcom Dharma & Greg.	4	6	2016-02-04 20:53:33.24518	2016-02-04 20:53:33.24518	1	1
\.


--
-- TOC entry 2656 (class 0 OID 0)
-- Dependencies: 185
-- Name: playercount_PlayerCountID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"playercount_PlayerCountID_seq"', 21, true);


--
-- TOC entry 2612 (class 0 OID 3398673)
-- Dependencies: 186
-- Data for Name: suggestion; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY suggestion ("SuggestionID", "SuggestionTypeID", "Name", "DateAdded", "DateModified", "AddedUserID", "ModifiedUserID") FROM stdin;
\.


--
-- TOC entry 2657 (class 0 OID 0)
-- Dependencies: 187
-- Name: suggestion_SuggestionID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"suggestion_SuggestionID_seq"', 1, false);


--
-- TOC entry 2614 (class 0 OID 3398678)
-- Dependencies: 188
-- Data for Name: suggestiontype; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY suggestiontype ("SuggestionTypeID", "Name", "Description", "DateAdded", "DateModified", "AddedUserID", "ModifiedUserID") FROM stdin;
\.


--
-- TOC entry 2658 (class 0 OID 0)
-- Dependencies: 189
-- Name: suggestiontype_SuggestionTypeID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"suggestiontype_SuggestionTypeID_seq"', 1, false);


--
-- TOC entry 2616 (class 0 OID 3398686)
-- Dependencies: 190
-- Data for Name: suggestiontypegame; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY suggestiontypegame ("SuggestionTypeGameID", "SuggestionTypeID", "GameID", "Description", "DateAdded", "AddedUserID") FROM stdin;
\.


--
-- TOC entry 2659 (class 0 OID 0)
-- Dependencies: 191
-- Name: suggestiontypegame_SuggestionTypeGameID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"suggestiontypegame_SuggestionTypeGameID_seq"', 1, false);


--
-- TOC entry 2618 (class 0 OID 3398694)
-- Dependencies: 192
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY tag ("TagID", "Name", "Description", "DateAdded", "AddedUserID", "ModifiedUserID") FROM stdin;
1	Show	This game would be appropriate in a show, or maybe it wouldn't be appropriate, depending on what type of show you're doing.	2013-11-04 21:58:24	1	1
4	Longform	\N	2013-11-11 17:44:23	1	1
6	Scenic	\N	2013-11-11 18:08:18	1	1
7	Audience	\N	2013-11-11 21:42:13	1	1
8	Group	\N	2013-11-11 21:42:30	1	1
9	Gibberish	\N	2013-11-11 21:44:12	1	1
10	Guessing	\N	2013-11-11 21:46:40	1	1
11	Teams	\N	2013-11-12 15:22:39	1	1
12	Character	\N	2013-11-21 15:28:22	1	1
13	Stand and Deliver	\N	2013-11-21 15:57:22	1	1
14	Trust	\N	2013-11-21 16:08:09	1	1
15	Conductor	\N	2013-11-22 09:54:28	1	1
16	Timed	\N	2013-11-22 09:56:02	1	1
17	Round	\N	2013-11-22 09:59:53	1	1
18	Game Show	\N	2013-11-22 10:02:00	1	1
19	Solo	\N	2013-11-22 10:05:57	1	1
20	Mime	\N	2013-11-22 10:08:40	1	1
21	Rhyming	\N	2013-11-22 10:32:31	1	1
22	Replay	\N	2013-11-22 10:33:06	1	1
23	Singing	\N	2013-11-22 10:53:13	1	1
24	Warmup	\N	2013-11-22 10:55:23	1	1
25	Opener	\N	2013-11-22 11:00:34	1	1
26	Circle	\N	2014-12-01 21:40:35.286	1	1
27	Energy	\N	2014-12-01 21:40:43.492	1	1
28	Gifts	\N	2014-12-01 21:48:59.537	1	1
29	Freeze	\N	2014-12-01 21:57:01.503	1	1
30	Narration	\N	2014-12-01 22:03:01.8	1	1
31	Story	\N	2014-12-01 22:25:37.04	1	1
32	Relationship	\N	2014-12-01 22:25:47.455	1	1
33	Debate	\N	2014-12-01 22:38:12.809	1	1
34	Competition	\N	2014-12-01 22:38:25.45	1	1
35	No Wrong Answers	\N	2014-12-01 22:55:58.888	1	1
36	Be 100%	\N	2014-12-02 10:13:18	1	1
37	Justify	\N	2014-12-02 10:25:09.553	1	1
38	Give and Take	\N	2014-12-02 10:28:33.648	1	1
39	Accents	\N	2014-12-02 10:37:10.896	1	1
40	Talk Show	\N	2014-12-02 10:37:18.015	1	1
41	Host	\N	2014-12-02 10:37:30.756	1	1
42	Objects	\N	2014-12-02 10:37:40.491	1	1
43	Yes And	\N	2014-12-02 11:28:02.695	1	1
44	Caller	\N	2014-12-02 11:38:49.952	1	1
45	Memory	\N	2014-12-02 11:45:06.598	1	1
46	Slow-mo	\N	2014-12-02 14:30:36.296	1	1
47	Commentators	\N	2014-12-02 14:30:49.707	1	1
3	Exercise	\N	2013-11-11 17:41:04	1	1
48	Props	\N	2014-12-14 18:08:59.154	1	1
49	Icebreaker	\N	2014-12-14 18:36:23.162	1	1
50	Limitations	\N	2014-12-15 17:48:40.944	1	1
51	Alphabet	\N	2014-12-16 09:56:42.426	1	1
52	Pointing and Passing	\N	2014-12-16 09:56:53.604	1	1
53	Walk About	\N	2014-12-16 10:04:20.279	1	1
54	Emergence	\N	2014-12-16 10:04:39.262	1	1
55	Tableaus	\N	2014-12-16 10:11:13.552	1	1
56	Be Trustworthy	\N	2014-12-16 10:11:22.14	1	1
57	Two Lines	\N	2014-12-16 10:19:07.46	1	1
58	History	\N	2014-12-16 10:31:24.617	1	1
59	Backwards	\N	2014-12-16 10:41:03.171	1	1
60	Animals	\N	2014-12-17 11:30:45.377	1	1
61	It	\N	2014-12-17 11:38:30.9	1	1
62	Rap	\N	2014-12-17 12:10:07.054	1	1
63	Rhythm	\N	2014-12-17 15:31:45.546	1	1
64	Passing Energy	\N	2014-12-18 21:35:04.575	1	1
65	Actions	\N	2014-12-18 21:45:52.472	1	1
66	Initiation	\N	2014-12-18 21:45:58.059	1	1
67	Drama	\N	2015-03-25 10:08:56.994	1	1
68	Reverse	\N	2015-03-25 10:14:41.3	1	1
69	Listening	\N	2016-01-08 16:28:07.513295	1	1
70	There is no Try	\N	2016-01-08 16:28:25.409334	1	1
71	Duo	\N	2016-01-08 17:43:37.057324	1	1
72	There are no Wrong Answers	\N	2016-02-01 20:31:53.625154	1	1
73	On the Spot	\N	2016-02-01 20:32:05.704518	1	1
74	Zombie	\N	2016-02-01 20:36:25.456386	1	1
75	Names	\N	2016-02-01 20:36:28.688955	1	1
76	Structures	\N	2016-02-01 20:51:18.757273	1	1
77	Acting	\N	2016-02-01 20:59:57.375152	1	1
78	Subtext	\N	2016-02-01 20:59:58.941097	1	1
79	Scripted	\N	2016-02-01 21:00:05.01625	1	1
80	Zones	\N	2016-02-01 21:48:13.400337	1	1
81	Emotion	\N	2016-02-01 21:48:16.872347	1	1
82	Changing	\N	2016-02-01 21:48:49.353451	1	1
83	Sound Effects	\N	2016-02-01 22:34:37.880029	1	1
84	Gimmick	\N	2016-02-01 23:03:31.468955	1	1
85	Elimination	\N	2016-02-01 23:06:53.803489	1	1
86	Observation	\N	2016-02-02 14:46:15.054487	1	1
87	Concentration	\N	2016-02-02 14:46:21.221633	1	1
88	Word Association	\N	2016-02-02 15:14:32.868668	1	1
89	Edit Style	\N	2016-02-04 19:53:16.0043	1	1
90	Modifier	\N	2016-02-04 19:53:57.490898	1	1
91	Eye Contact	\N	2016-02-04 20:08:04.809655	1	1
92	Status	\N	2016-02-04 21:15:24.798219	1	1
93	Patterns	\N	2016-09-12 17:18:47.960644	1	1
94	Movement	\N	2016-09-12 18:20:37.198307	1	1
95	Low-stakes	\N	2016-09-12 18:30:17.087197	1	1
96	Individual	\N	2016-09-12 18:30:28.095953	1	1
97	Focus	\N	2016-09-12 18:31:19.039172	1	1
98	Spidey-sense	\N	2016-09-12 18:33:35.970236	1	1
99	Awareness	\N	2016-09-12 18:33:54.826193	1	1
100	Group Mind	\N	2016-09-12 18:34:09.53033	1	1
101	Pay Attention	\N	2016-09-12 18:37:34.097931	1	1
102	Details	\N	2016-09-12 18:37:36.647223	1	1
103	Music	\N	2016-09-12 18:46:15.790254	1	1
104	Make an Offer	\N	2016-09-19 19:48:35.024155	1	1
105	Heighten	\N	2016-09-19 19:48:37.140861	1	1
106	Raise the Stakes	\N	2016-09-19 19:48:43.250797	1	1
107	Advanced	\N	2016-10-05 13:49:41.920915	1	1
108	Team Building	\N	2016-10-24 18:27:38.25312	1	1
109	Walk	\N	2016-11-28 16:37:17.928545	1	1
110	Word at a Time	\N	2017-01-07 22:44:00.558783	1	1
111	Commitment	\N	2017-01-25 16:46:41.840416	1	1
112	Ice	\N	2017-01-25 16:47:39.058239	1	1
\.


--
-- TOC entry 2660 (class 0 OID 0)
-- Dependencies: 193
-- Name: tag_TagID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"tag_TagID_seq"', 112, true);


--
-- TOC entry 2620 (class 0 OID 3398702)
-- Dependencies: 194
-- Data for Name: taggame; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY taggame ("TagGameID", "TagID", "GameID", "DateAdded", "AddedUserID", "ModifiedUserID") FROM stdin;
1	1	2	2013-11-04 21:58:26	1	1
2	1	20	2013-11-11 18:25:31	1	1
3	6	20	2013-11-11 18:25:31	1	1
4	7	21	2013-11-11 21:42:43	1	1
5	1	21	2013-11-11 21:42:43	1	1
6	8	21	2013-11-11 21:42:43	1	1
7	1	22	2013-11-11 21:45:36	1	1
8	6	22	2013-11-11 21:45:36	1	1
9	1	23	2013-11-11 21:47:47	1	1
10	10	23	2013-11-11 21:47:47	1	1
14	11	25	2013-11-12 15:23:01	1	1
15	9	25	2013-11-12 15:23:01	1	1
16	10	25	2013-11-12 15:23:01	1	1
17	10	24	2013-11-21 14:39:13	1	1
18	9	24	2013-11-21 14:39:13	1	1
19	7	24	2013-11-21 14:39:13	1	1
20	1	1	2013-11-21 15:11:07	1	1
32	6	26	2013-11-21 15:29:59	1	1
33	12	26	2013-11-21 15:29:59	1	1
34	1	26	2013-11-21 15:29:59	1	1
35	3	26	2013-11-21 15:29:59	1	1
36	13	1	2013-11-21 15:57:22	1	1
37	1	5	2013-11-21 15:58:58	1	1
38	10	5	2013-11-21 15:59:08	1	1
39	9	5	2013-11-21 15:59:19	1	1
40	6	6	2013-11-21 16:07:53	1	1
41	3	15	2013-11-21 16:08:01	1	1
42	14	15	2013-11-21 16:08:09	1	1
43	6	16	2013-11-21 16:08:21	1	1
44	6	11	2013-11-21 16:09:03	1	1
45	1	11	2013-11-21 16:09:05	1	1
48	1	17	2013-11-21 16:15:06	1	1
49	1	19	2013-11-21 16:32:08	1	1
50	7	19	2013-11-21 16:32:10	1	1
51	7	9	2013-11-21 16:33:27	1	1
52	1	9	2013-11-21 16:33:28	1	1
53	6	13	2013-11-21 16:33:41	1	1
57	9	27	2013-11-22 09:19:39	1	1
58	6	27	2013-11-22 09:19:39	1	1
59	11	27	2013-11-22 09:19:40	1	1
63	1	28	2013-11-22 09:28:16	1	1
64	12	28	2013-11-22 09:28:16	1	1
65	10	28	2013-11-22 09:28:17	1	1
69	1	29	2013-11-22 09:38:22	1	1
70	10	29	2013-11-22 09:38:22	1	1
71	6	29	2013-11-22 09:38:22	1	1
72	1	30	2013-11-22 09:45:50	1	1
73	6	30	2013-11-22 09:45:50	1	1
74	6	31	2013-11-22 09:50:15	1	1
75	3	31	2013-11-22 09:50:15	1	1
76	3	32	2013-11-22 09:51:15	1	1
77	3	33	2013-11-22 09:53:32	1	1
78	15	34	2013-11-22 09:54:53	1	1
79	8	34	2013-11-22 09:54:53	1	1
80	1	34	2013-11-22 09:54:53	1	1
81	8	35	2013-11-22 09:55:30	1	1
82	15	35	2013-11-22 09:55:30	1	1
83	1	35	2013-11-22 09:55:30	1	1
84	16	36	2013-11-22 09:57:34	1	1
85	6	36	2013-11-22 09:57:34	1	1
86	1	36	2013-11-22 09:57:34	1	1
87	13	37	2013-11-22 09:58:08	1	1
88	1	37	2013-11-22 09:58:08	1	1
89	8	37	2013-11-22 09:58:08	1	1
90	1	38	2013-11-22 09:59:38	1	1
91	17	38	2013-11-22 09:59:53	1	1
92	18	39	2013-11-22 10:03:47	1	1
93	10	39	2013-11-22 10:03:47	1	1
94	12	39	2013-11-22 10:03:47	1	1
95	1	39	2013-11-22 10:03:47	1	1
96	7	40	2013-11-22 10:05:17	1	1
97	1	40	2013-11-22 10:05:17	1	1
98	19	41	2013-11-22 10:06:47	1	1
99	6	41	2013-11-22 10:06:47	1	1
100	6	10	2013-11-22 10:07:27	1	1
101	1	10	2013-11-22 10:07:29	1	1
102	1	42	2013-11-22 10:09:16	1	1
103	20	42	2013-11-22 10:09:16	1	1
104	8	43	2013-11-22 10:32:39	1	1
105	21	43	2013-11-22 10:32:39	1	1
106	22	44	2013-11-22 10:35:03	1	1
107	6	44	2013-11-22 10:35:03	1	1
108	1	44	2013-11-22 10:35:03	1	1
109	8	45	2013-11-22 10:37:24	1	1
110	15	45	2013-11-22 10:37:24	1	1
111	6	46	2013-11-22 10:39:19	1	1
112	1	46	2013-11-22 10:39:19	1	1
113	6	47	2013-11-22 10:39:51	1	1
114	1	48	2013-11-22 10:41:06	1	1
115	6	48	2013-11-22 10:41:06	1	1
116	6	49	2013-11-22 10:42:11	1	1
117	8	50	2013-11-22 10:43:15	1	1
118	3	50	2013-11-22 10:43:15	1	1
119	1	51	2013-11-22 10:47:38	1	1
120	7	51	2013-11-22 10:47:38	1	1
121	1	52	2013-11-22 10:48:58	1	1
122	10	53	2013-11-22 10:49:48	1	1
123	1	53	2013-11-22 10:49:48	1	1
124	1	54	2013-11-22 10:50:57	1	1
125	10	54	2013-11-22 10:50:57	1	1
126	6	55	2013-11-22 10:52:02	1	1
127	22	55	2013-11-22 10:52:02	1	1
128	1	55	2013-11-22 10:52:02	1	1
129	23	56	2013-11-22 10:53:28	1	1
130	1	56	2013-11-22 10:53:28	1	1
131	6	56	2013-11-22 10:53:28	1	1
132	1	57	2013-11-22 10:54:18	1	1
133	6	57	2013-11-22 10:54:18	1	1
134	3	57	2013-11-22 10:54:18	1	1
135	1	58	2013-11-22 10:55:09	1	1
136	7	58	2013-11-22 10:55:09	1	1
137	24	59	2013-11-22 10:57:05	1	1
138	3	59	2013-11-22 10:57:05	1	1
139	3	60	2013-11-22 10:57:59	1	1
140	24	60	2013-11-22 10:57:59	1	1
141	1	61	2013-11-22 10:59:19	1	1
142	6	61	2013-11-22 10:59:19	1	1
143	25	7	2013-11-22 11:00:34	1	1
144	1	7	2013-11-22 11:00:38	1	1
145	10	8	2013-11-22 11:00:51	1	1
146	8	8	2013-11-22 11:00:52	1	1
147	8	7	2013-11-22 11:01:09	1	1
148	1	4	2013-11-22 11:04:58	1	1
149	3	4	2013-11-22 11:04:59	1	1
150	24	4	2013-11-22 11:05:00	1	1
151	1	18	2013-11-22 11:06:09	1	1
152	8	18	2013-11-22 11:10:45	1	1
153	1	16	2013-11-22 11:14:10	1	1
154	3	16	2013-11-22 11:14:15	1	1
155	3	6	2013-11-22 11:14:33	1	1
156	1	6	2013-11-22 11:14:34	1	1
157	1	24	2013-11-22 11:14:55	1	1
158	1	13	2013-11-22 11:15:20	1	1
159	1	47	2013-11-22 11:18:39	1	1
160	1	49	2013-11-22 11:19:01	1	1
161	1	3	2014-12-01 21:19:09.3	1	1
162	6	3	2014-12-01 21:19:14.392	1	1
163	6	62	2014-12-01 21:34:32.249	1	1
164	1	62	2014-12-01 21:34:36.207	1	1
165	6	64	2014-12-01 21:37:21.983	1	1
166	1	64	2014-12-01 21:37:21.985	1	1
167	24	65	2014-12-01 21:42:33.382	1	1
168	26	65	2014-12-01 21:42:33.383	1	1
169	27	65	2014-12-01 21:42:33.384	1	1
170	6	66	2014-12-01 21:53:47.938	1	1
171	1	66	2014-12-01 21:53:47.94	1	1
172	28	66	2014-12-01 21:53:47.94	1	1
173	29	11	2014-12-01 21:57:01.529	1	1
174	29	10	2014-12-01 21:57:09.653	1	1
175	6	2	2014-12-01 21:57:22.213	1	1
176	29	2	2014-12-01 21:57:23.795	1	1
177	6	67	2014-12-01 22:03:30.719	1	1
178	1	67	2014-12-01 22:03:30.727	1	1
179	30	67	2014-12-01 22:03:30.728	1	1
180	6	68	2014-12-01 22:03:30.731	1	1
182	30	68	2014-12-01 22:03:30.742	1	1
186	6	70	2014-12-01 22:03:30.772	1	1
187	1	70	2014-12-01 22:03:30.772	1	1
188	30	70	2014-12-01 22:03:30.772	1	1
195	3	68	2014-12-01 22:21:29.406	1	1
196	12	68	2014-12-01 22:21:29.409	1	1
197	1	69	2014-12-01 22:26:04.643	1	1
198	6	69	2014-12-01 22:26:04.647	1	1
199	28	69	2014-12-01 22:26:04.648	1	1
200	31	69	2014-12-01 22:26:04.649	1	1
201	32	69	2014-12-01 22:26:04.65	1	1
202	7	70	2014-12-01 22:30:09.857	1	1
203	1	70	2014-12-01 22:30:09.862	1	1
204	12	70	2014-12-01 22:30:09.864	1	1
205	32	70	2014-12-01 22:30:09.865	1	1
206	24	71	2014-12-01 22:33:25.992	1	1
207	3	71	2014-12-01 22:33:25.997	1	1
208	27	71	2014-12-01 22:33:26	1	1
209	12	71	2014-12-01 22:33:26.001	1	1
210	33	72	2014-12-01 22:40:32.214	1	1
211	1	72	2014-12-01 22:40:32.216	1	1
212	34	72	2014-12-01 22:40:32.217	1	1
213	1	73	2014-12-01 22:46:41.156	1	1
214	10	73	2014-12-01 22:46:41.159	1	1
215	34	73	2014-12-01 22:46:41.159	1	1
216	6	74	2014-12-01 22:49:37.725	1	1
217	3	74	2014-12-01 22:49:37.727	1	1
218	12	74	2014-12-01 22:49:37.728	1	1
219	31	75	2014-12-01 22:55:04.829	1	1
220	1	75	2014-12-01 22:55:04.831	1	1
221	13	75	2014-12-01 22:55:04.832	1	1
224	12	76	2014-12-02 10:07:29.458	1	1
225	31	76	2014-12-02 10:07:29.458	1	1
226	28	76	2014-12-02 10:07:29.459	1	1
223	1	76	2014-12-02 10:07:29.439	1	1
227	12	77	2014-12-02 10:14:01.326	1	1
228	3	77	2014-12-02 10:14:01.329	1	1
229	27	77	2014-12-02 10:14:01.33	1	1
230	36	77	2014-12-02 10:14:01.331	1	1
231	1	78	2014-12-02 10:21:40.11	1	1
232	10	78	2014-12-02 10:21:40.112	1	1
233	20	78	2014-12-02 10:21:40.113	1	1
234	6	79	2014-12-02 10:24:45.824	1	1
235	1	79	2014-12-02 10:24:45.826	1	1
236	37	47	2014-12-02 10:25:09.565	1	1
237	6	80	2014-12-02 10:32:01.731	1	1
238	38	80	2014-12-02 10:32:01.734	1	1
239	1	80	2014-12-02 10:32:01.735	1	1
240	12	81	2014-12-02 10:37:52.624	1	1
241	39	81	2014-12-02 10:37:52.627	1	1
242	28	81	2014-12-02 10:37:52.629	1	1
243	40	81	2014-12-02 10:37:52.629	1	1
244	41	81	2014-12-02 10:37:52.63	1	1
245	42	81	2014-12-02 10:37:52.631	1	1
246	6	82	2014-12-02 11:18:27.799	1	1
247	1	82	2014-12-02 11:18:27.804	1	1
248	7	82	2014-12-02 11:18:27.805	1	1
249	37	82	2014-12-02 11:18:27.806	1	1
250	6	83	2014-12-02 11:23:42.439	1	1
251	12	83	2014-12-02 11:23:42.442	1	1
252	28	83	2014-12-02 11:23:42.443	1	1
253	3	84	2014-12-02 11:28:29.239	1	1
254	42	84	2014-12-02 11:28:29.241	1	1
255	43	84	2014-12-02 11:28:29.241	1	1
256	13	85	2014-12-02 11:31:48.444	1	1
257	1	85	2014-12-02 11:31:48.446	1	1
258	6	86	2014-12-02 11:41:12.773	1	1
259	1	86	2014-12-02 11:41:12.775	1	1
260	44	86	2014-12-02 11:41:12.776	1	1
261	45	38	2014-12-02 11:45:06.626	1	1
262	1	87	2014-12-02 14:31:10.215	1	1
263	42	87	2014-12-02 14:31:10.221	1	1
264	46	87	2014-12-02 14:31:10.222	1	1
265	47	87	2014-12-02 14:31:10.223	1	1
266	28	87	2014-12-02 14:31:10.223	1	1
267	36	87	2014-12-02 14:31:10.226	1	1
268	43	87	2014-12-02 14:31:10.227	1	1
273	31	35	2014-12-02 21:30:46.518	1	1
274	4	11	2014-12-03 18:23:10.368	1	1
275	13	90	2014-12-04 09:52:21.092	1	1
276	1	90	2014-12-04 09:52:21.1	1	1
278	1	91	2014-12-14 18:28:46.271	1	1
277	48	91	2014-12-14 18:28:46.258	1	1
279	24	92	2014-12-14 18:36:45.765	1	1
280	49	92	2014-12-14 18:36:45.767	1	1
281	49	93	2014-12-14 18:45:58.7	1	1
282	26	93	2014-12-14 18:45:58.702	1	1
283	24	93	2014-12-14 18:45:58.703	1	1
284	24	94	2014-12-14 18:54:16.183	1	1
285	3	94	2014-12-14 18:54:16.183	1	1
286	26	95	2014-12-14 18:58:47.069	1	1
287	24	95	2014-12-14 18:58:47.071	1	1
288	24	96	2014-12-14 19:04:53.979	1	1
289	49	96	2014-12-14 19:04:53.981	1	1
290	45	96	2014-12-14 19:04:53.982	1	1
291	6	97	2014-12-15 17:36:58.867	1	1
292	12	97	2014-12-15 17:36:58.88	1	1
293	3	98	2014-12-15 17:46:18.278	1	1
294	42	98	2014-12-15 17:46:18.282	1	1
295	44	98	2014-12-15 17:46:18.283	1	1
296	6	99	2014-12-15 17:48:58.084	1	1
297	50	99	2014-12-15 17:48:58.087	1	1
298	24	100	2014-12-15 17:56:09.777	1	1
299	26	100	2014-12-15 17:56:09.782	1	1
300	26	101	2014-12-15 17:59:31.685	1	1
301	24	101	2014-12-15 17:59:31.693	1	1
302	8	101	2014-12-15 17:59:31.694	1	1
303	49	102	2014-12-15 18:17:25.613	1	1
304	24	102	2014-12-15 18:17:25.62	1	1
305	8	102	2014-12-15 18:17:25.622	1	1
306	26	102	2014-12-15 18:17:25.623	1	1
307	24	103	2014-12-15 18:23:32.694	1	1
308	26	103	2014-12-15 18:23:32.7	1	1
309	8	103	2014-12-15 18:23:32.701	1	1
310	26	104	2014-12-16 09:56:59.764	1	1
311	24	104	2014-12-16 09:56:59.768	1	1
312	51	104	2014-12-16 09:56:59.769	1	1
313	52	104	2014-12-16 09:56:59.77	1	1
314	3	105	2014-12-16 10:05:40.228	1	1
315	24	105	2014-12-16 10:05:40.232	1	1
316	53	105	2014-12-16 10:05:40.233	1	1
317	54	105	2014-12-16 10:05:40.234	1	1
318	53	106	2014-12-16 10:11:35.875	1	1
319	54	106	2014-12-16 10:11:35.883	1	1
320	3	106	2014-12-16 10:11:35.883	1	1
321	24	106	2014-12-16 10:11:35.884	1	1
322	55	106	2014-12-16 10:11:35.885	1	1
323	56	106	2014-12-16 10:11:35.886	1	1
324	44	106	2014-12-16 10:11:35.886	1	1
325	6	107	2014-12-16 10:17:09.584	1	1
326	28	107	2014-12-16 10:17:09.589	1	1
327	44	107	2014-12-16 10:17:09.59	1	1
328	55	76	2014-12-16 10:18:43.343	1	1
329	24	33	2014-12-16 10:18:59.952	1	1
330	57	33	2014-12-16 10:19:07.471	1	1
331	31	108	2014-12-16 10:26:17.971	1	1
332	11	108	2014-12-16 10:26:17.975	1	1
333	3	108	2014-12-16 10:26:17.976	1	1
334	54	108	2014-12-16 10:26:17.976	1	1
335	6	109	2014-12-16 10:31:53.957	1	1
336	22	109	2014-12-16 10:31:53.961	1	1
337	58	109	2014-12-16 10:31:53.962	1	1
338	44	49	2014-12-16 10:33:59.981	1	1
339	22	110	2014-12-16 10:36:42.319	1	1
340	6	110	2014-12-16 10:36:42.323	1	1
341	59	111	2014-12-16 10:41:28.215	1	1
342	40	111	2014-12-16 10:41:28.222	1	1
343	1	111	2014-12-16 10:41:28.223	1	1
344	28	111	2014-12-16 10:41:28.224	1	1
345	23	112	2014-12-16 10:45:17.363	1	1
346	1	112	2014-12-16 10:45:17.366	1	1
347	24	113	2014-12-16 11:00:00.659	1	1
348	53	113	2014-12-16 11:00:00.661	1	1
349	26	114	2014-12-16 11:14:14.037	1	1
350	24	114	2014-12-16 11:14:14.04	1	1
351	51	114	2014-12-16 11:14:14.041	1	1
352	24	115	2014-12-17 11:31:43.507	1	1
353	53	115	2014-12-17 11:31:43.511	1	1
354	60	115	2014-12-17 11:31:43.512	1	1
355	11	115	2014-12-17 11:31:43.522	1	1
356	24	116	2014-12-17 11:38:49.24	1	1
357	61	116	2014-12-17 11:38:49.242	1	1
358	62	117	2014-12-17 12:10:26.712	1	1
359	21	117	2014-12-17 12:10:26.716	1	1
360	13	117	2014-12-17 12:10:26.717	1	1
361	1	117	2014-12-17 12:10:26.718	1	1
362	21	118	2014-12-17 12:15:33.489	1	1
363	1	118	2014-12-17 12:15:33.491	1	1
364	12	118	2014-12-17 12:15:33.492	1	1
365	3	119	2014-12-17 12:18:37.214	1	1
366	1	120	2014-12-17 15:15:56.025	1	1
367	44	120	2014-12-17 15:15:56.028	1	1
368	6	120	2014-12-17 15:15:56.029	1	1
369	12	120	2014-12-17 15:15:56.03	1	1
370	24	121	2014-12-17 15:35:11.465	1	1
371	26	121	2014-12-17 15:35:11.47	1	1
372	63	121	2014-12-17 15:35:11.471	1	1
373	24	122	2014-12-17 16:26:38.929	1	1
374	26	122	2014-12-17 16:26:38.934	1	1
375	61	114	2014-12-18 21:34:37.975	1	1
376	61	60	2014-12-18 21:34:48.226	1	1
377	64	122	2014-12-18 21:35:04.58	1	1
378	64	95	2014-12-18 21:35:34.914	1	1
379	64	59	2014-12-18 21:36:02.526	1	1
380	52	93	2014-12-18 21:36:17.108	1	1
381	61	65	2014-12-18 21:36:44.893	1	1
382	61	4	2014-12-18 21:36:59.232	1	1
383	6	123	2014-12-18 21:46:05.049	1	1
384	3	123	2014-12-18 21:46:05.051	1	1
385	65	123	2014-12-18 21:46:05.053	1	1
386	66	123	2014-12-18 21:46:05.054	1	1
387	26	123	2014-12-18 21:46:20.113	1	1
388	44	123	2014-12-18 21:46:21.613	1	1
390	3	124	2014-12-18 21:57:57.827	1	1
391	24	124	2014-12-18 21:57:57.83	1	1
392	53	124	2014-12-18 21:57:57.831	1	1
393	49	124	2014-12-18 21:57:57.832	1	1
394	44	124	2014-12-18 21:57:57.833	1	1
395	6	125	2014-12-18 22:15:57.723	1	1
396	3	125	2014-12-18 22:15:57.725	1	1
397	66	125	2014-12-18 22:15:57.726	1	1
398	24	126	2014-12-18 22:19:36.319	1	1
399	49	126	2014-12-18 22:19:36.321	1	1
400	1	127	2014-12-18 22:22:55.604	1	1
401	9	127	2014-12-18 22:22:55.606	1	1
402	20	127	2014-12-18 22:22:55.607	1	1
403	10	127	2014-12-18 22:22:55.608	1	1
404	6	128	2014-12-18 22:27:51.287	1	1
405	37	128	2014-12-18 22:27:51.29	1	1
406	56	128	2014-12-18 22:27:51.29	1	1
407	1	128	2014-12-18 22:27:51.291	1	1
408	24	129	2014-12-18 22:33:02.443	1	1
409	61	129	2014-12-18 22:33:02.445	1	1
410	49	129	2014-12-18 22:33:02.446	1	1
411	26	130	2014-12-19 16:04:46.288	1	1
412	24	130	2014-12-19 16:04:46.29	1	1
413	27	130	2014-12-19 16:04:46.291	1	1
414	64	130	2014-12-19 16:04:46.291	1	1
415	24	131	2014-12-19 16:38:04.487	1	1
416	26	131	2014-12-19 16:38:04.491	1	1
417	64	131	2014-12-19 16:38:04.492	1	1
418	63	131	2014-12-19 16:38:04.493	1	1
419	24	133	2016-01-08 16:36:47.220581	1	1
420	26	133	2016-01-08 16:36:54.659206	1	1
421	64	133	2016-01-08 16:36:56.0357	1	1
422	70	133	2016-01-08 16:36:59.51769	1	1
423	56	133	2016-01-08 16:37:05.045639	1	1
424	6	134	2016-01-08 17:44:07.606995	1	1
425	71	134	2016-01-08 17:44:09.012178	1	1
426	72	3	2016-02-01 21:46:22.054333	1	1
427	37	3	2016-02-01 21:46:26.013109	1	1
428	72	134	2016-02-01 21:47:46.581967	1	1
429	37	134	2016-02-01 21:47:50.463031	1	1
430	80	46	2016-02-01 21:48:13.45807	1	1
431	81	46	2016-02-01 21:48:16.9416	1	1
432	37	46	2016-02-01 21:48:25.438831	1	1
433	81	13	2016-02-01 21:48:36.422653	1	1
434	37	13	2016-02-01 21:48:43.334966	1	1
435	82	13	2016-02-01 21:48:49.413454	1	1
436	12	110	2016-02-01 21:49:04.81123	1	1
437	36	110	2016-02-01 21:49:47.946504	1	1
438	84	17	2016-02-01 23:03:31.527624	1	1
439	37	17	2016-02-01 23:03:40.570952	1	1
440	36	119	2016-02-01 23:04:57.110338	1	1
441	56	20	2016-02-01 23:05:18.165443	1	1
442	56	23	2016-02-01 23:06:01.095564	1	1
443	63	43	2016-02-01 23:06:41.77017	1	1
444	85	43	2016-02-01 23:06:53.852778	1	1
445	36	42	2016-02-01 23:07:10.899203	1	1
446	82	64	2016-02-01 23:07:25.840393	1	1
447	85	33	2016-02-02 14:58:51.785227	1	1
448	20	33	2016-02-02 14:58:54.231238	1	1
449	51	33	2016-02-02 14:58:56.764281	1	1
450	72	33	2016-02-02 14:59:00.65401	1	1
451	37	79	2016-02-02 15:04:44.679642	1	1
452	56	79	2016-02-02 15:04:49.260231	1	1
453	3	147	2016-02-02 15:05:03.220622	1	1
454	26	147	2016-02-02 15:05:05.635883	1	1
455	61	147	2016-02-02 15:05:07.062349	1	1
456	20	147	2016-02-02 15:05:12.097706	1	1
457	12	16	2016-02-02 17:57:53.654351	1	1
458	19	162	2016-02-02 20:08:33.142157	1	1
459	6	162	2016-02-02 20:08:36.799355	1	1
460	3	162	2016-02-02 20:08:38.368865	1	1
461	12	162	2016-02-02 20:08:41.352252	1	1
462	24	165	2016-02-02 21:06:27.51222	1	1
463	26	165	2016-02-02 21:06:33.324519	1	1
464	8	165	2016-02-02 21:06:34.761137	1	1
465	82	161	2016-02-02 21:06:52.692957	1	1
466	6	161	2016-02-02 21:06:54.138375	1	1
467	1	161	2016-02-02 21:06:56.797497	1	1
468	37	161	2016-02-02 21:07:00.261503	1	1
469	24	132	2016-02-02 21:07:12.351455	1	1
470	72	132	2016-02-02 21:07:15.33144	1	1
471	24	152	2016-02-02 21:07:37.54956	1	1
472	53	152	2016-02-02 21:07:39.656357	1	1
473	6	142	2016-02-03 01:49:00.68747	1	1
474	3	142	2016-02-03 01:49:03.334642	1	1
475	4	167	2016-02-03 02:07:23.569018	1	1
476	6	167	2016-02-03 02:07:25.091995	1	1
477	1	167	2016-02-03 02:07:26.657232	1	1
478	3	168	2016-02-04 19:48:48.48874	1	1
479	61	168	2016-02-04 19:48:48.497361	1	1
480	12	168	2016-02-04 19:48:48.503031	1	1
481	72	168	2016-02-04 19:48:48.507203	1	1
482	37	168	2016-02-04 19:48:48.506861	1	1
483	4	158	2016-02-04 19:50:42.587647	1	1
484	1	158	2016-02-04 19:50:47.944594	1	1
485	6	158	2016-02-04 19:50:49.448764	1	1
486	89	169	2016-02-04 19:56:56.438328	1	1
487	4	169	2016-02-04 19:56:56.4438	1	1
488	6	169	2016-02-04 19:56:56.448494	1	1
489	90	169	2016-02-04 19:56:56.454365	1	1
490	8	170	2016-02-04 20:10:08.664319	1	1
491	24	170	2016-02-04 20:10:08.677444	1	1
492	26	170	2016-02-04 20:10:08.686734	1	1
493	64	170	2016-02-04 20:10:08.688954	1	1
494	91	170	2016-02-04 20:10:08.691393	1	1
495	63	170	2016-02-04 20:10:08.69473	1	1
496	19	171	2016-02-04 20:14:32.499621	1	1
497	4	171	2016-02-04 20:14:32.51221	1	1
498	6	171	2016-02-04 20:14:32.517672	1	1
499	3	172	2016-02-04 20:18:17.149054	1	1
500	9	172	2016-02-04 20:18:17.154221	1	1
501	31	172	2016-02-04 20:18:17.158777	1	1
502	6	173	2016-02-04 20:53:36.667298	1	1
503	1	173	2016-02-04 20:53:36.675222	1	1
504	85	173	2016-02-04 20:53:36.680026	1	1
505	38	173	2016-02-04 20:53:36.690395	1	1
506	53	174	2016-02-04 20:56:57.611441	1	1
507	3	174	2016-02-04 20:56:57.616151	1	1
508	20	174	2016-02-04 20:56:57.631603	1	1
509	72	174	2016-02-04 20:56:57.636389	1	1
510	1	83	2016-02-04 21:15:20.554821	1	1
511	92	83	2016-02-04 21:15:24.879449	1	1
512	6	175	2016-02-04 23:19:13.658349	1	1
513	1	175	2016-02-04 23:19:13.663946	1	1
514	84	175	2016-02-04 23:19:13.668542	1	1
515	93	104	2016-09-12 17:18:48.025779	1	1
516	93	103	2016-09-12 17:18:54.278997	1	1
517	93	84	2016-09-12 17:22:52.39564	1	1
518	93	105	2016-09-12 17:31:32.755428	1	1
519	3	166	2016-09-12 17:35:30.965335	1	1
520	93	24	2016-09-12 17:43:40.584835	1	1
521	3	163	2016-09-12 18:19:01.745504	1	1
522	6	163	2016-09-12 18:19:03.304869	1	1
523	50	163	2016-09-12 18:19:13.077629	1	1
524	93	94	2016-09-12 18:19:54.608888	1	1
525	6	160	2016-09-12 18:20:26.056847	1	1
526	50	160	2016-09-12 18:20:28.283535	1	1
527	37	160	2016-09-12 18:20:30.920432	1	1
528	94	160	2016-09-12 18:20:37.246396	1	1
529	72	94	2016-09-12 18:20:57.94444	1	1
530	24	159	2016-09-12 18:24:28.905669	1	1
531	26	159	2016-09-12 18:24:30.99619	1	1
532	9	159	2016-09-12 18:24:36.58912	1	1
533	72	159	2016-09-12 18:24:39.31595	1	1
534	37	30	2016-09-12 18:24:49.829731	1	1
535	3	157	2016-09-12 18:25:00.895115	1	1
536	20	157	2016-09-12 18:25:03.125623	1	1
537	24	157	2016-09-12 18:25:04.770863	1	1
538	24	156	2016-09-12 18:26:54.486573	1	1
539	94	156	2016-09-12 18:26:56.094756	1	1
540	63	156	2016-09-12 18:27:01.093518	1	1
541	24	155	2016-09-12 18:27:10.364384	1	1
542	26	155	2016-09-12 18:27:12.043672	1	1
543	56	155	2016-09-12 18:27:14.593197	1	1
544	6	154	2016-09-12 18:27:26.642145	1	1
545	30	154	2016-09-12 18:27:38.270733	1	1
546	4	154	2016-09-12 18:27:46.096273	1	1
547	24	153	2016-09-12 18:28:32.771242	1	1
548	53	153	2016-09-12 18:28:34.516248	1	1
549	1	151	2016-09-12 18:29:26.030556	1	1
550	72	151	2016-09-12 18:29:30.123457	1	1
551	12	151	2016-09-12 18:29:32.453129	1	1
552	31	151	2016-09-12 18:29:36.319834	1	1
553	3	150	2016-09-12 18:30:02.566385	1	1
554	88	150	2016-09-12 18:30:05.147801	1	1
555	95	150	2016-09-12 18:30:17.140974	1	1
556	96	150	2016-09-12 18:30:28.141074	1	1
557	3	52	2016-09-12 18:30:59.611235	1	1
558	70	52	2016-09-12 18:31:03.202997	1	1
559	31	52	2016-09-12 18:31:05.705132	1	1
560	37	32	2016-09-12 18:31:17.443267	1	1
561	97	32	2016-09-12 18:31:19.094976	1	1
562	3	149	2016-09-12 18:33:29.703168	1	1
563	24	149	2016-09-12 18:33:31.199302	1	1
564	53	149	2016-09-12 18:33:33.183458	1	1
566	99	149	2016-09-12 18:33:54.891886	1	1
567	100	149	2016-09-12 18:34:09.576416	1	1
568	3	148	2016-09-12 18:35:43.039599	1	1
569	53	148	2016-09-12 18:35:44.519392	1	1
570	72	148	2016-09-12 18:35:46.031289	1	1
571	96	148	2016-09-12 18:35:55.109034	1	1
572	95	148	2016-09-12 18:35:56.749641	1	1
573	3	146	2016-09-12 18:37:20.864876	1	1
574	99	146	2016-09-12 18:37:23.008392	1	1
575	101	146	2016-09-12 18:37:34.172866	1	1
576	102	146	2016-09-12 18:37:36.753434	1	1
577	71	146	2016-09-12 18:38:37.155029	1	1
578	1	81	2016-09-12 18:38:58.157385	1	1
579	3	145	2016-09-12 18:39:18.971811	1	1
580	1	154	2016-09-12 18:39:43.073725	1	1
581	1	160	2016-09-12 18:39:52.73299	1	1
582	1	99	2016-09-12 18:39:59.400787	1	1
583	24	144	2016-09-12 18:40:33.655653	1	1
584	26	144	2016-09-12 18:40:35.145027	1	1
585	64	144	2016-09-12 18:40:37.233207	1	1
586	61	144	2016-09-12 18:40:40.417405	1	1
587	63	144	2016-09-12 18:40:47.66548	1	1
588	1	143	2016-09-12 18:41:28.817187	1	1
589	6	143	2016-09-12 18:41:30.348375	1	1
590	37	143	2016-09-12 18:41:32.449061	1	1
591	10	143	2016-09-12 18:41:33.953719	1	1
592	12	143	2016-09-12 18:41:35.457997	1	1
593	24	137	2016-09-12 18:42:16.533471	1	1
594	26	137	2016-09-12 18:42:18.025257	1	1
595	64	137	2016-09-12 18:42:19.442453	1	1
596	1	141	2016-09-12 18:45:41.585633	1	1
597	6	141	2016-09-12 18:45:43.024819	1	1
598	71	141	2016-09-12 18:46:00.089311	1	1
599	1	140	2016-09-12 18:46:09.900306	1	1
600	103	140	2016-09-12 18:46:15.834086	1	1
601	24	164	2016-09-12 18:47:16.657713	1	1
602	3	164	2016-09-12 18:47:18.052515	1	1
603	72	164	2016-09-12 18:47:20.66453	1	1
604	20	164	2016-09-12 18:47:22.673702	1	1
605	65	164	2016-09-12 18:47:25.377641	1	1
606	24	139	2016-09-12 18:47:40.521087	1	1
607	26	139	2016-09-12 18:47:42.108136	1	1
608	64	139	2016-09-12 18:47:44.152758	1	1
609	3	138	2016-09-12 18:47:51.210882	1	1
610	79	138	2016-09-12 18:47:52.702962	1	1
611	78	138	2016-09-12 18:48:51.701042	1	1
612	24	136	2016-09-12 18:49:07.096566	1	1
613	49	136	2016-09-12 18:49:08.537981	1	1
614	75	136	2016-09-12 18:49:10.001469	1	1
615	74	136	2016-09-12 18:49:13.068705	1	1
616	72	135	2016-09-12 18:49:20.946951	1	1
617	3	135	2016-09-12 18:49:23.032087	1	1
618	24	135	2016-09-12 18:49:24.944088	1	1
619	61	135	2016-09-12 18:49:27.907891	1	1
620	93	93	2016-09-12 19:00:45.596463	1	1
621	3	176	2016-09-19 19:48:49.901593	1	1
622	1	176	2016-09-19 19:48:49.922533	1	1
623	43	176	2016-09-19 19:48:49.932385	1	1
624	6	176	2016-09-19 19:48:49.9342	1	1
625	104	176	2016-09-19 19:48:49.93931	1	1
626	105	176	2016-09-19 19:48:49.939788	1	1
627	106	176	2016-09-19 19:48:49.940271	1	1
628	63	100	2016-09-27 14:59:06.529813	1	1
629	69	60	2016-10-03 18:21:45.073282	1	1
630	69	121	2016-10-03 18:21:57.499207	1	1
631	72	59	2016-10-03 18:22:33.704457	1	1
632	86	152	2016-10-03 18:23:03.572909	1	1
633	99	152	2016-10-03 18:25:23.874855	1	1
634	72	75	2016-10-03 19:31:25.234301	1	1
635	72	123	2016-10-03 19:31:54.71981	1	1
640	6	178	2016-10-05 14:28:25.95888	1	1
641	92	178	2016-10-05 14:28:25.967773	1	1
642	3	178	2016-10-05 14:28:25.971585	1	1
643	12	178	2016-10-05 14:28:25.972279	1	1
644	107	178	2016-10-05 14:28:25.974242	1	1
645	36	95	2016-10-10 17:11:05.683518	1	1
646	108	101	2016-10-24 18:27:38.302535	1	1
647	44	97	2016-10-24 18:29:36.074701	1	1
648	1	179	2016-11-28 15:25:33.285934	1	1
649	6	179	2016-11-28 15:25:36.932033	1	1
650	7	179	2016-11-28 15:25:42.765152	1	1
651	37	179	2016-11-28 15:26:23.078933	1	1
652	24	180	2016-11-28 16:00:50.007719	1	1
653	26	180	2016-11-28 16:00:57.467449	1	1
654	64	180	2016-11-28 16:01:02.461803	1	1
655	6	181	2016-11-28 16:16:43.037978	1	1
656	7	181	2016-11-28 16:16:46.489661	1	1
657	37	181	2016-11-28 16:16:49.818377	1	1
658	84	181	2016-11-28 16:16:55.586073	1	1
659	1	181	2016-11-28 16:21:52.091682	1	1
660	24	182	2016-11-28 16:37:15.94136	1	1
662	53	182	2016-11-28 16:37:20.877372	1	1
663	92	182	2016-11-28 16:39:04.712741	1	1
664	110	140	2017-01-07 22:44:00.571734	1	1
665	111	96	2017-01-25 16:46:41.850478	1	1
666	27	96	2017-01-25 16:46:47.376623	1	1
667	105	96	2017-01-25 16:46:51.885071	1	1
669	49	180	2017-01-25 16:47:46.1811	1	1
670	91	180	2017-01-25 16:53:17.126917	1	1
671	27	132	2017-01-25 16:59:19.973675	1	1
\.


--
-- TOC entry 2661 (class 0 OID 0)
-- Dependencies: 195
-- Name: taggame_TagGameID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"taggame_TagGameID_seq"', 671, true);


--
-- TOC entry 2662 (class 0 OID 0)
-- Dependencies: 197
-- Name: userLevel_UserLevelID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"userLevel_UserLevelID_seq"', 4, true);


--
-- TOC entry 2622 (class 0 OID 3398707)
-- Dependencies: 196
-- Data for Name: userlevel; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY userlevel ("UserLevelID", "Name") FROM stdin;
1	Standard
2	Group Leader
3	Admin
4	Super Admin
\.


--
-- TOC entry 2624 (class 0 OID 3398712)
-- Dependencies: 198
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: pynrwwmwncytsi
--

COPY users ("UserID", "FirstName", "LastName", "Gender", "Email", "URL", "DateAdded", "DateModified", "Password", "UserLevel", "Locked", "Description") FROM stdin;
2	Testly	McTestington	M	t@mctestingtons.com	\N	2015-02-01 14:11:36.531	2015-02-01 14:11:36.531	$2a$10$FmvGP6YkOyTs3gDkBDaA5eXYpD5oUm96A07s4b2BgPVF.c55801ye	{1}	f	
5	Checkin	McTestington	F	check@mctestingtons.com	\N	2015-02-01 16:16:38.785	2015-02-01 16:16:38.785	$2a$10$4bkuolnzTt7rFW8Dt8Ufoek5p0ECWZM/RoWZlhHRLwPREyqPeNv3i	{1}	f	
1	Shauvon	McGill	M	smcgill@denyconformity.com	http://www.denyconformity.com	2014-12-01 12:06:35.098	2016-04-18 21:17:05.300254	$2a$10$igTl9KjolWLuMjy1mN87rO/BDXjHax/qb5tXz1uILxLW.91RcyV1e	{1,2,3,4}	f	A really quite cool dude.
\.


--
-- TOC entry 2663 (class 0 OID 0)
-- Dependencies: 199
-- Name: users_UserID_seq; Type: SEQUENCE SET; Schema: public; Owner: pynrwwmwncytsi
--

SELECT pg_catalog.setval('"users_UserID_seq"', 5, true);


--
-- TOC entry 2458 (class 2606 OID 3398740)
-- Name: duration_Name_key; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY duration
    ADD CONSTRAINT "duration_Name_key" UNIQUE ("Name");


--
-- TOC entry 2460 (class 2606 OID 5734074)
-- Name: duration_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY duration
    ADD CONSTRAINT duration_pkey PRIMARY KEY ("DurationID");


--
-- TOC entry 2462 (class 2606 OID 3398744)
-- Name: game_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY game
    ADD CONSTRAINT game_pkey PRIMARY KEY ("GameID");


--
-- TOC entry 2456 (class 2606 OID 3398746)
-- Name: group_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY comedygroup
    ADD CONSTRAINT group_pkey PRIMARY KEY ("GroupID");


--
-- TOC entry 2464 (class 2606 OID 3398748)
-- Name: name_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY name
    ADD CONSTRAINT name_pkey PRIMARY KEY ("NameID");


--
-- TOC entry 2466 (class 2606 OID 3398750)
-- Name: note_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY note
    ADD CONSTRAINT note_pkey PRIMARY KEY ("NoteID");


--
-- TOC entry 2468 (class 2606 OID 5734085)
-- Name: permissionkey_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY permissionkey
    ADD CONSTRAINT permissionkey_pkey PRIMARY KEY ("PermissionKeyID");


--
-- TOC entry 2470 (class 2606 OID 5734092)
-- Name: permissionkeyuserlevel_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY permissionkeyuserlevel
    ADD CONSTRAINT permissionkeyuserlevel_pkey PRIMARY KEY ("PermissionKeyUserLevelID");


--
-- TOC entry 2472 (class 2606 OID 3398756)
-- Name: playercount_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY playercount
    ADD CONSTRAINT playercount_pkey PRIMARY KEY ("PlayerCountID");


--
-- TOC entry 2474 (class 2606 OID 3398758)
-- Name: suggestion_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY suggestion
    ADD CONSTRAINT suggestion_pkey PRIMARY KEY ("SuggestionID");


--
-- TOC entry 2476 (class 2606 OID 3398760)
-- Name: suggestiontype_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY suggestiontype
    ADD CONSTRAINT suggestiontype_pkey PRIMARY KEY ("SuggestionTypeID");


--
-- TOC entry 2478 (class 2606 OID 3398762)
-- Name: suggestiontypegame_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY suggestiontypegame
    ADD CONSTRAINT suggestiontypegame_pkey PRIMARY KEY ("SuggestionTypeGameID");


--
-- TOC entry 2480 (class 2606 OID 3398764)
-- Name: tag_Name_key; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY tag
    ADD CONSTRAINT "tag_Name_key" UNIQUE ("Name");


--
-- TOC entry 2482 (class 2606 OID 3398766)
-- Name: tag_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY ("TagID");


--
-- TOC entry 2484 (class 2606 OID 3398768)
-- Name: taggame_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY taggame
    ADD CONSTRAINT taggame_pkey PRIMARY KEY ("TagGameID");


--
-- TOC entry 2486 (class 2606 OID 5734107)
-- Name: userLevel_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY userlevel
    ADD CONSTRAINT "userLevel_pkey" PRIMARY KEY ("UserLevelID");


--
-- TOC entry 2488 (class 2606 OID 5734116)
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: pynrwwmwncytsi; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT user_pkey PRIMARY KEY ("UserID");


--
-- TOC entry 2632 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: pynrwwmwncytsi
--

GRANT ALL ON SCHEMA public TO pynrwwmwncytsi;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2017-01-29 16:19:30

--
-- PostgreSQL database dump complete
--

