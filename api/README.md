# API — Modular Architecture

Backend that persists data in the database and exposes it to the frontend via HTTP.

---

## Directory Structure

```
api/
├── src/
│   ├── config/
│   │   └── database.ts
│   ├── db/
│   │   └── schema.ts
│   ├── modules/
│   │   ├── players/
│   │   │   ├── players.schema.ts
│   │   │   ├── players.repository.ts
│   │   │   ├── players.service.ts
│   │   │   ├── players.controller.ts
│   │   │   └── players.routes.ts
│   │   ├── cards/
│   │   │   └── (same structure)
│   │   └── trades/
│   │       └── (same structure)
│   ├── plugins/
│   │   ├── docs.ts
│   │   └── index.ts
│   └── server.ts
└── tests/
    ├── unit/
    └── integration/
```

---

## Folder Responsibilities

### `config/`
Global application settings: database connection and environment variables.

### `db/`
Database table definitions via Drizzle ORM. Single source of truth for the database schema — TypeScript types and migrations are generated from here.

### `modules/`
Each module groups all artifacts of a business entity in one place. A module contains five layers:

| File | Responsibility |
|---|---|
| `*.schema.ts` | Zod schemas for input/output validation + derived TypeScript types |
| `*.repository.ts` | Single point of contact with the database — all queries live here |
| `*.service.ts` | Business logic: orchestrates the repository and enforces application rules |
| `*.controller.ts` | Parses the HTTP request and delegates to the service; returns the response |
| `*.routes.ts` | Declares endpoints, binds Zod schemas, and connects to the controller |

### `plugins/`
Fastify plugins registered globally before routes: OpenAPI docs (Swagger + Scalar), auth, CORS, rate-limit, etc.

### `tests/unit/`
Tests services and functions in isolation, without a real database or HTTP calls.

### `tests/integration/`
Tests the full application flow with a real or mocked database.

---

## Request Flow

```
server.ts
   └─ routes → controller → service → repository → database
                                           ↓
                                    schema/types → response → frontend
```
