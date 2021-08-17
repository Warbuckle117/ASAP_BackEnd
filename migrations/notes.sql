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

SELECT (
  s.status_id, 
  s.status_tail_number, 
  a.aircraft_name,
  b.base_name,
  s.status_is_flyable, 
  s.status_description, 
  s.status_priority, 
  s.updated_at) 
  FROM status AS s
  INNER JOIN aircraft AS a ON a.aircraft_id = s.aircraft_id
  INNER JOIN base AS b ON b.base_id = s.base_id;