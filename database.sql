DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  contact_number VARCHAR(30) NOT NULL,
  company_name VARCHAR(150),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);