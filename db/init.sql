CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- sample data
INSERT INTO users (name, email, password, created_at, updated_at)
VALUES 
    ('John Doe', 'john.doe@example.com', crypt('password123', gen_salt('bf')), NOW(), NOW()),
    ('Jane Smith', 'jane.smith@example.com', crypt('securepass456', gen_salt('bf')), NOW(), NOW()),
    (NULL, 'alex.jones@example.com', crypt('pass789', gen_salt('bf')), NOW(), NOW()),
    ('Emily Brown', 'emily.brown@example.com', crypt('mypassword101', gen_salt('bf')), NOW(), NOW());
