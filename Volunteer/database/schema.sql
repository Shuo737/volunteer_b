DROP TABLE IF EXISTS members_events CASCADE;
DROP TABLE IF EXISTS members_locations CASCADE;
DROP TABLE IF EXISTS events_locations CASCADE;
DROP TABLE IF EXISTS management CASCADE;
DROP TABLE IF EXISTS locations CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS sponsors CASCADE;
DROP TABLE IF EXISTS events CASCADE;



CREATE TABLE members (
	mbid numeric(5,0) NOT NULL,
	mbacronym varchar(5) NOT NULL,
	mbname varchar(50) NOT NULL,
	mbphone numeric(10,0),
	mbemail varchar(50),
	mbmdesc varchar(500),
	PRIMARY KEY (mbid, mbacronym)
);

CREATE TABLE events (
	evename varchar(100) NOT NULL,
	evstime timestamp NOT NULL,
	evetime timestamp NOT NULL,
	evedesc varchar(3000) NOT NULL,
	CHECK(evstime < evetime),
	PRIMARY KEY (evename, evstime)
);

CREATE TABLE sponsors (
	spsname varchar(100) NOT NULL,
	spsdesc varchar(3000) NOT NULL,
	spacronym varchar(20),
	spphone numeric(10,0),
	spemail varchar(50),
	spfax varchar(50),
	PRIMARY KEY (spsname)
);


CREATE TABLE locations (
	spsname varchar(100) NOT NULL,
	locaddr varchar(500) NOT NULL,
	loccity varchar(50) NOT NULL,
	locprov varchar(50) NOT NULL,
	locnation varchar(50) NOT NULL,
	FOREIGN KEY (spsname) 
		REFERENCES sponsors(spsname) 
			ON UPDATE CASCADE 
			ON DELETE NO ACTION,
	PRIMARY KEY (spsname, locaddr, loccity)
);

CREATE TABLE management (
	mbid numeric(5,0) NOT NULL,
	mbacronym varchar(5) NOT NULL,
	mtpassword varchar(16) NOT NULL,
	mtposition varchar(50) NOT NULL,
	mbphoto varchar(50),
	FOREIGN KEY fk_mamb(mbid, mbacronym) 
		REFERENCES members(mbid, mbacronym) 
			ON UPDATE CASCADE 
			ON DELETE NO ACTION,
	PRIMARY KEY (mbid, mbacronym)
);

CREATE TABLE members_events (
	mbid numeric(5,0) NOT NULL,
	mbacronym varchar(5) NOT NULL,
	evename varchar(100) NOT NULL,
	evstime timestamp NOT NULL,
	meetime timestamp NOT NULL,
	FOREIGN KEY (mbid, mbacronym) 
		REFERENCES members(mbid, mbacronym) 
			ON UPDATE CASCADE
			ON DELETE NO ACTION,
	FOREIGN KEY (evename, evstime)
		REFERENCES events (evename, evstime)
			ON UPDATE CASCADE
			ON DELETE NO ACTION,
	CHECK (evstime < meetime),
	PRIMARY KEY (mbid, mbacronym, evename, evstime)
);

CREATE TABLE members_locations (
	mbid numeric(5,0) NOT NULL,
	mbacronym varchar(5) NOT NULL,
	spsname varchar(100) NOT NULL,
	locaddr varchar(500) NOT NULL,
	loccity varchar(50) NOT NULL,
	mlstime timestamp NOT NULL,
	mletime timestamp NOT NULL,
	FOREIGN KEY (mbid, mbacronym)
		REFERENCES members(mbid, mbacronym)
			ON UPDATE CASCADE
			ON DELETE NO ACTION,
	FOREIGN KEY (spsname, locaddr, loccity)
		REFERENCES locations(spsname, locaddr, loccity)
			ON UPDATE CASCADE
			ON DELETE NO ACTION,
	CHECK (mlstime < mletime),
	PRIMARY KEY (mbid, mbacronym, spsname, locaddr, loccity, mlstime)
);

CREATE TABLE events_locations (
	evename varchar(100) NOT NULL,
	evstime timestamp NOT NULL,
	spsname varchar(100) NOT NULL,
	locaddr varchar(500) NOT NULL,
	loccity varchar(50) NOT NULL,
	eletime timestamp NOT NULL,
	FOREIGN KEY (evename, evstime)
		REFERENCES events(evename, evstime)
			ON UPDATE CASCADE
			ON DELETE NO ACTION,
	FOREIGN KEY (spsname, locaddr, loccity) 
		REFERENCES locations(spsname, locaddr, loccity)
			ON UPDATE CASCADE
			ON DELETE NO ACTION,
	CHECK (evstime < eletime),
	PRIMARY KEY (evename, evstime, spsname, locaddr, loccity)
);