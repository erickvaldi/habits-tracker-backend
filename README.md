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

