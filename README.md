# crypto-backend

Este es el backend del proyecto **Crypto Challenge**, desarrollado con **Node.js** y **PostgreSQL**. Proporciona una API para gestionar criptomonedas, incluyendo funcionalidades como agregar, editar y eliminar criptomonedas. También incluye autenticación de usuarios.

---

## Estructura del Proyecto

```
crypto-backend/
├── database/
│   └── crypto.sql       # Archivo SQL para restaurar la base de datos
├── src/
│   ├── config/
│   │   └── data-source.ts # Configuración de la conexión a la base de datos
│   ├── entities/        # Entidades de la base de datos
│   │   ├── User.ts       # Entidad para la tabla de usuarios
│   │   └── Crypto.ts     # Entidad para la tabla de criptomonedas
│   ├── middleware/
│   │   └── auth.ts       # Middleware de autenticación
│   ├── routes/          # Rutas de la API
│   │   ├── users.ts      # Rutas para usuarios
│   │   ├── cryptos.ts    # Rutas para criptomonedas
│   │   └── auth.ts       # Rutas para autenticación
│   └── index.ts         # Archivo principal de configuración de la aplicación
├── .env                 # Variables de entorno
├── .gitignore           # Archivos ignorados por Git
├── package.json         # Dependencias y scripts del proyecto
├── tsconfig.json        # Configuración de TypeScript
└── README.md            # Documentación del proyecto
```

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (versión 20 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- [PostgreSQL](https://www.postgresql.org/) (versión 15 o superior)

---

## Configuración del Proyecto

### 1. Clonar el Repositorio

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/andreshaitit/crypto-challenge-backend.git
cd crypto-challenge-backend
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno:

```properties
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=crypto
NODE_ENV=development
```

> **Nota:** Reemplaza `tu_contraseña` con la contraseña de tu usuario de PostgreSQL

### 3. Instalar Dependencias

Instala las dependencias del proyecto ejecutando:

```bash
npm install
```

### 4. Configurar la Base de Datos

#### Crear la Base de Datos

Crea una base de datos en PostgreSQL llamada `crypto`:

```bash
createdb -h localhost -p 5432 -U postgres crypto
```

#### Restaurar la Base de Datos

Restaura la base de datos desde el archivo `crypto.sql` incluido en este proyecto en la carpeta `database`:

```bash
psql -h localhost -p 5432 -U postgres -d crypto -f crypto.sql
```

### 5. Compilar el Proyecto

Antes de ejecutar el servidor, compila el código TypeScript a JavaScript:

```bash
npx tsc
```

Esto generará la carpeta `dist/` con los archivos compilados.

### 6. Iniciar el Servidor

Ejecuta el servidor desde la carpeta `dist`:

```bash
npm start
```

El backend estará disponible en [http://localhost:3000](http://localhost:3000) (o el puerto configurado en el archivo `.env`).

## Endpoints de la API

### Autenticación

- `POST /auth/login`: Inicia sesión con un usuario y contraseña.
- `POST /auth/register`: Registra un usuario y contraseña.

### Gestión de Usuarios

- `GET /users`: Obtiene todos los usuarios.
- `POST /users`: Crea un nuevo usuario.
- `PUT /users/:id`: Actualiza un usuario existente.
- `DELETE /users/:id`: Elimina un usuario.

### Gestión de Criptomonedas

- `GET /cryptos`: Obtiene todas las criptomonedas.
- `POST /cryptos`: Agrega una nueva criptomoneda.
- `PUT /cryptos/:id`: Edita una criptomoneda existente.
- `DELETE /cryptos/:id`: Elimina una criptomoneda.
