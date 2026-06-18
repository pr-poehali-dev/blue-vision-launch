CREATE TABLE t_p30360196_blue_vision_launch.requests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  duct_type TEXT NOT NULL DEFAULT '',
  dimensions TEXT NOT NULL DEFAULT '',
  area TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);
