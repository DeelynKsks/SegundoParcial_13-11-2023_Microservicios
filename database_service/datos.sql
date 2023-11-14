CREATE DATABASE IF NOT EXISTS personas;

USE personas;

CREATE TABLE IF NOT EXISTS personas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Apellidos VARCHAR(255),
    Nombres VARCHAR(255),
    dni VARCHAR(8)
);

INSERT INTO personas (Apellidos, Nombres, dni) VALUES
    ('Paredes', 'Milena', 45816585),
    ('Caceres', 'Ayrton', 41277281),
    ('Jacquemin', 'Sheila', 42425244);