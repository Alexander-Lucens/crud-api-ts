# CRUD API (RS School Assignment)

A simple in-memory CRUD API built with pure Node.js and TypeScript. This project fulfills the requirements of the RS School Node.js course assignment.

It features a custom-built router, an in-memory database, and support for horizontal scaling.

## Features

* **100% Pure Node.js:** Built using only the native `http` module (no Express but implemented own expressLike feature).
* **TypeScript:** Fully written in TypeScript.
* **Full CRUD+PATCH:** Implements `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` for users.
* **Tested:** Includes unit and integration tests using Jest and Supertest.
* **Cluster Mode:** Supports horizontal scaling with a load balancer via the Node.js `Cluster` API.

## Requirements

* **Node.js:** `24.10.0`
* **npm:** `>=10.9.0`

## Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/Alexander-Lucens/crud-api-ts.git](https://github.com/Alexander-Lucens/crud-api-ts.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd crud-api-ts
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

## Configuration

The application requires a `.env` file for configuration.

1.  Create a `.env` file in the root of the project.
2.  Copy the contents from `.env.example`:
    ```env
    PORT=4000
    ```

## Available Scripts

### Development
Runs the server with `nodemon` for auto-reloading on file changes.

```sh
npm run start:dev
```

### Production

Builds the TypeScript project into the `dist/` folder and runs the compiled application.

```sh
npm run start:prod
```

### Multi-Core (Cluster Mode)

Runs the application with horizontal scaling. A primary process acts as a load balancer, distributing requests to multiple worker processes.

```sh
npm run start:multi
```

### Testing

Runs the complete Jest test suite.

```sh
npm run test
```
## API Endpoints

All endpoints are prefixed with `/api/users`.

### User Model

```json
{
  "id": "string (uuid)",
  "username": "string (required)",
  "age": "number (required)",
  "hobbies": "string[] (required)"
}
```

### Routes

| Method | Endpoint | Description | Success Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | Get all users. | `200 OK` `User[]` |
| `POST` | `/api/users` | Create a new user. | `201 Created` `User` |
| `DELETE`| `/api/users` | *(Bonus)* Delete all users. | `204 No Content` |
| `GET` | `/api/users/{userId}` | Get a single user by ID. | `200 OK` `User` |
| `PUT` | `/api/users/{userId}` | Update a user (replaces all fields). | `200 OK` `User` |
| `PATCH` | `/api/users/{userId}` | Partially update a user. | `200 OK` `User` |
| `DELETE`| `/api/users/{userId}` | Delete a user by ID. | `204 No Content` |