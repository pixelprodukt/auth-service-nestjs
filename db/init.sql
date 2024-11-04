CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- sample data
INSERT INTO users (name, email, password)
VALUES 
    ('John Doe', 'john.doe@example.com', 'password123'),
    ('Jane Smith', 'jane.smith@example.com', 'securepass456'),
    (NULL, 'alex.jones@example.com', 'pass789'),
    ('Emily Brown', 'emily.brown@example.com', 'mypassword101');
