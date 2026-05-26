# API — Modular Architecture

Backend that consumes external services, maps the data to the internal model, and persists relevant information in the database.

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
│   │   │   ├── players.adapter.ts
│   │   │   ├── players.mapper.ts
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
Each module groups all artifacts of a business entity in one place. A module contains seven layers:

| File | Responsibility |
|---|---|
| `*.schema.ts` | Zod schemas for input/output validation + derived TypeScript types |
| `*.adapter.ts` | Consumes the external service API — isolates HTTP calls and error handling |
| `*.mapper.ts` | Transforms external service responses into the internal model |
| `*.repository.ts` | Persists in the database only what the external service does not manage |
| `*.service.ts` | Orchestrates adapter, mapper and repository; enforces business rules |
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
   └─ routes → controller → service → adapter    → external service (Users / Cards / Trades)
                                     → mapper    → internal model
                                     → repository → database (ban, level, cache)
                                           ↓
                                    schema/types → response → frontend
```

---

## Class Diagram

```mermaid
classDiagram
    direction TB

    class Server {
        +setValidatorCompiler()
        +setSerializerCompiler()
        +listen()
    }

    class DocsPlugin {
        -jsonSchemaTransform
        -fastifySwagger
        -scalarApiReference
    }

    class Database {
        +PostgresJsDatabase db
    }

    class UsersService {
        <<external>>
        +GET /players
        +GET /players/:id
    }

    class CardDistributionService {
        <<external>>
        +GET /cards
        +GET /cards/:id
    }

    class TradesAPI {
        <<external>>
        +GET /trades
        +GET /trades/:id
    }

    namespace players {
        class PlayersRoutes {
            +GET /players
            +GET /players/:id
            +PATCH /players/:id/ban
            +PATCH /players/:id/level
        }
        class PlayersController {
            +list()
            +findById()
            +updateBan()
            +updateLevel()
        }
        class PlayersService {
            +list()
            +findById()
            +updateBan()
            +updateLevel()
        }
        class PlayersAdapter {
            +fetchAll()
            +fetchById()
        }
        class PlayersMapper {
            +toInternal()
            +toResponse()
        }
        class PlayersRepository {
            +findAll()
            +findById()
            +updateBan()
            +updateLevel()
        }
    }

    namespace cards {
        class CardsRoutes {
            +GET /cards
            +GET /cards/:id
        }
        class CardsController {
            +list()
            +findById()
        }
        class CardsService {
            +list()
            +findById()
        }
        class CardsAdapter {
            +fetchAll()
            +fetchById()
        }
        class CardsMapper {
            +toInternal()
            +toResponse()
        }
        class CardsRepository {
            +findAll()
            +findById()
        }
    }

    namespace trades {
        class TradesRoutes {
            +GET /trades
            +GET /trades/:id
            +PATCH /trades/:id/status
        }
        class TradesController {
            +list()
            +findById()
            +updateStatus()
        }
        class TradesService {
            +list()
            +findById()
            +updateStatus()
        }
        class TradesAdapter {
            +fetchAll()
            +fetchById()
        }
        class TradesMapper {
            +toInternal()
            +toResponse()
        }
        class TradesRepository {
            +findAll()
            +findById()
            +updateStatus()
        }
    }

    Server --> DocsPlugin : registers
    Server --> PlayersRoutes : prefix /players
    Server --> CardsRoutes : prefix /cards
    Server --> TradesRoutes : prefix /trades

    PlayersRoutes --> PlayersController : delegates
    PlayersController --> PlayersService : calls
    PlayersService --> PlayersAdapter : fetch
    PlayersService --> PlayersMapper : transform
    PlayersService --> PlayersRepository : persist
    PlayersAdapter --> UsersService : HTTP
    PlayersRepository --> Database : uses

    CardsRoutes --> CardsController : delegates
    CardsController --> CardsService : calls
    CardsService --> CardsAdapter : fetch
    CardsService --> CardsMapper : transform
    CardsService --> CardsRepository : persist
    CardsAdapter --> CardDistributionService : HTTP
    CardsRepository --> Database : uses

    TradesRoutes --> TradesController : delegates
    TradesController --> TradesService : calls
    TradesService --> TradesAdapter : fetch
    TradesService --> TradesMapper : transform
    TradesService --> TradesRepository : persist
    TradesAdapter --> TradesAPI : HTTP
    TradesRepository --> Database : uses
```
