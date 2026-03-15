# Habits Tracker Backend - Semana 1

Backend en Node.js + Express conectado a MongoDB (Atlas) para gestionar hábitos (CRUD).

## Requisitos
- Node.js
- npm
- MongoDB Atlas (o MongoDB local)

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

