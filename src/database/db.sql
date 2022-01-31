create table images (
	id serial primary key,
	name varchar(255) not null,
	url varchar(255) not null,
	save_type save_type not null,
	key varchar(255) not null
);

CREATE TYPE save_type AS ENUM (
	's3',
	'server');
