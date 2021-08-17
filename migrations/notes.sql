CREATE TABLE status (
status_id serial,
status_tail_number text UNIQUE,
status_aircraft_id int REFERENCES aircraft(aircraft_id),
status_base_id int REFERENCES base(base_id),
status_status boolean NOT NULL DEFAULT true,
status_description text,
status_priority int,
created_at timestamp
);