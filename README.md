# crypto-backend

Este es el backend del proyecto Crypto Challenge, desarrollado con Node.js. Proporciona una API para gestionar criptomonedas, incluyendo funcionalidades como agregar, editar y eliminar criptomonedas. También incluye autenticación de usuarios.

## Estructura del Proyecto

crypto-backend/
├── database/
│   └── crypto.sql       # Archivo SQL para restaurar la base de datos
├── src/
│   ├── config/
│   │   └── data-source.js # Configuración de la conexión a la base de datos
│   ├── entities/        # Entidades de la base de datos
│   │   ├── User.js       # Entidad para la tabla de usuarios
│   │   └── Crypto.js     # Entidad para la tabla de criptomonedas
│   ├── middleware/
│   │   └── auth.js       # Middleware de autenticación
│   ├── routes/          # Rutas de la API
│   │   ├── users.js      # Rutas para usuarios
│   │   ├── cryptos.js    # Rutas para criptomonedas
│   │   └── auth.js       # Rutas para autenticación
│   └── app.js           # Archivo principal de configuración de la aplicación
├── .env                 # Variables de entorno
├── .gitignore           # Archivos ignorados por Git
├── index.js             # Punto de entrada del servidor
├── package.json         # Dependencias y scripts del proyecto
└── README.md            # Documentación del proyecto

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (versión 20 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- [PostgreSQL](https://www.postgresql.org/) (versión 15 o superior)

## Configuración del Proyecto

### 1. Clonar el Repositorio

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/andreshaitit/crypto-challenge-backend.git
cd crypto-challenge-backend
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=crypto
NODE_ENV=development
```

Asegúrate de reemplazar tu_contraseña con la contraseña de tu usuario de PostgreSQL.


### 3. Instalar Dependencias

Instala las dependencias del proyecto ejecutando:

npm install


### 4. Configurar la Base de Datos

Crea una base de datos en PostgreSQL llamada crypto 

### Restaurar la Base de Datos

Restaura la base de datos desde el archivo crypto.sql incluido en este proyecto en la carpeta database

### 5. Iniciar el Servidor

Inicia el servidor ejecutando:
npm start

El backend estará disponible en http://localhost:3000 (o el puerto configurado en el archivo .env).