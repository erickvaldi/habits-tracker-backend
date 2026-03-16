# Habits Tracker - Semana 1 y Semana 2

Proyecto dividido en:
- **backend/**: Node.js + Express + MongoDB (Atlas) para gestionar hábitos (CRUD).
- **frontend/**: Next.js + Redux Toolkit consumiendo el endpoint GET del backend.

## Requisitos
- Node.js
- npm
- MongoDB Atlas (o MongoDB local)

---

## Backend (Express + MongoDB)


## Instalación

```bash
npm install

```

## Variables de entorno (.env)

1) Copia el archivo .env.example y renómbralo a .env

2) En .env configura tus valores:

    - PORT=3001
    - MONGO_URI=TU_MONGO_URI_AQUI

```bash
npm start

```

## Endpoints

Base URL: http://localhost:3001

    - GET /habits -> listar hábitos
    - POST /habits -> crear hábito
    - PUT /habits/:id -> actualizar hábito
    - DELETE /habits/:id -> eliminar hábito

## Ejemplo Body (POST /habits)

```JSON
{
  "title": "Habito para hacer ejercicio",
  "description": "Salir a caminar 5 minutos diarios"
}
```

## Frontend (Next.js + Redux Toolkit)

Instalación

```Bash

cd ../frontend
npm install

```

Ejecutar

```Bash

npm run dev

```

Frontend corriendo en: http://localhost:3000

## Integración con Backend (GET)

El frontend realiza un request GET al backend para obtener todos los hábitos desde:

http://localhost:3001/habits

---

## Semana 4 (Auth + Rachas + Done + Progreso dinámico)

### Backend (Express)
1) Instalar dependencias:

```bash

cd backend
npm install

```

2) Configurar variables de entorno:

- Crea backend/.env basado en backend/.env.example

- Agrega/ajusta:

    PORT=3001
    MONGO_URI=TU_MONGO_URI_AQUI
    JWT_SECRET=TU_SECRETO_AQUI

3) Ejecutar backend:

```Bash

npm start

```

### Endpoints de Auth

    POST /auth/register
    POST /auth/login → devuelve { token }

### Endpoints de Hábitos (Protegidos con JWT)

Requieren header: Authorization: Bearer TU_TOKEN

GET /habits → lista hábitos del usuario (y resetea racha si se perdió)
POST /habits → crea hábito para el usuario logueado
PUT /habits/:id
DELETE /habits/:id
POST /habits/:id/done → marca hábito como realizado (maneja racha)

## Frontend (Next.js + Redux + Tailwind)

1) Instalar dependencias:

```Bash

cd frontend
npm install

```

2) Ejecutar frontend:

```Bash

npm run dev

```

Frontend corre en: http://localhost:3000

Token (para probar en el navegador)

Como el endpoint GET /habits está protegido, primero debes loguearte (Postman) y guardar el token en el navegador:

1) En Postman:
    POST http://localhost:3001/auth/login → copia el token

2) En el navegador (Chrome):

    Abre http://localhost:3000
    Presiona F12 → pestaña Console
    Ejecuta:

``` JavaScript

localStorage.setItem("token", "PEGA_AQUI_TU_TOKEN");

```

Recarga la página (F5)