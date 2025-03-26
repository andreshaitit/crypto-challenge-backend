CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(255) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE criptomonedas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    ticker VARCHAR(10) NOT NULL,
    precio_compra DECIMAL NOT NULL,
    cantidad_comprada DECIMAL NOT NULL,
    cantidad_invertida DECIMAL
);