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
│   │   │   ├── players.interface.ts
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
| `*.interface.ts` | Contracts (`IAdapter`, `IMapper`, `IRepository`, `IService`, `IController`) that each layer depends on instead of concretes |
| `*.adapter.ts` | Consumes the external service API — isolates HTTP calls and error handling |
| `*.mapper.ts` | Transforms raw external responses into the internal domain model |
| `*.repository.ts` | Calls the adapter to fetch raw data, uses the mapper to convert it, and persists domain state in the database |
| `*.service.ts` | Enforces business rules and orchestrates repository calls |
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
   └─ routes → controller → service → repository → adapter → external service (Users / Cards / Trades)
                                                  → mapper  → internal domain model
                                                  → database (ban, level, cache)
                                           ↓
                                    schema/types → response → frontend
```

---

## Class Diagram

Os três módulos (`players`, `cards`, `trades`) seguem a **mesma arquitetura em camadas**
(`Routes → Controller → Service → Repository → Adapter/Mapper → serviço externo + Database`).
Para facilitar a leitura, o diagrama foi dividido em uma **visão geral** + **um diagrama por módulo**.

### 1. Visão Geral (Overview)

Mostra como o `Server` registra a documentação e as rotas de cada módulo, e onde cada
módulo se conecta com seu serviço externo e com o banco de dados.

```mermaid
classDiagram
    direction LR

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

    class PlayersModule { <<module>> }
    class CardsModule { <<module>> }
    class TradesModule { <<module>> }

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

    Server --> DocsPlugin : registers
    Server --> PlayersModule : prefix /players
    Server --> CardsModule : prefix /cards
    Server --> TradesModule : prefix /trades

    PlayersModule --> UsersService : HTTP
    CardsModule --> CardDistributionService : HTTP
    TradesModule --> TradesAPI : HTTP

    PlayersModule --> Database : uses
    CardsModule --> Database : uses
    TradesModule --> Database : uses
```

### 2. Módulo `players`

```mermaid
classDiagram
    direction TB

    class IPlayersController {
        <<interface>>
        +findAll()
        +findById()
        +banById()
        +create()
        +update()
        +delete()
    }
    class IPlayerService {
        <<interface>>
        +findAll()
        +findById()
        +create()
        +update()
        +delete()
    }
    class IPlayerRepository {
        <<interface>>
        +findAll()
        +findById()
        +create()
        +update()
        +delete()
    }
    class IPlayersAdapter {
        <<interface>>
        +fetchAll()
        +fetchById()
        +create()
        +update()
        +delete()
    }
    class IPlayersMapper {
        <<interface>>
        +toInternal()
        +toResponse()
    }

    class PlayersRoutes {
        +GET /players
        +GET /players/:id
        +PATCH /players/:id/ban
        +POST /players
        +PUT /players/:id
        +DELETE /players/:id
    }
    class PlayersController { -service IPlayerService }
    class PlayersService { -repo IPlayerRepository }
    class PlayersRepository {
        -adapter IPlayersAdapter
        -mapper IPlayersMapper
    }
    class PlayersAdapter
    class PlayersMapper

    class UsersService { <<external>> }
    class Database { <<infra>> }

    PlayersRoutes --> IPlayersController
    PlayersController ..|> IPlayersController
    PlayersController --> IPlayerService
    PlayersService ..|> IPlayerService
    PlayersService --> IPlayerRepository
    PlayersRepository ..|> IPlayerRepository
    PlayersRepository --> IPlayersAdapter
    PlayersRepository --> IPlayersMapper
    PlayersAdapter ..|> IPlayersAdapter
    PlayersMapper ..|> IPlayersMapper
    PlayersAdapter --> UsersService : HTTP
    PlayersRepository --> Database : uses
```

### 3. Módulo `cards`

```mermaid
classDiagram
    direction TB

    class ICardsController { <<interface>> }
    class ICardService { <<interface>> }
    class ICardRepository { <<interface>> }
    class ICardsAdapter { <<interface>> }
    class ICardsMapper { <<interface>> }

    class CardsRoutes {
        +GET /cards
        +GET /cards/:id
    }
    class CardsController { -service ICardService }
    class CardsService { -repo ICardRepository }
    class CardsRepository {
        -adapter ICardsAdapter
        -mapper ICardsMapper
    }
    class CardsAdapter
    class CardsMapper

    class CardDistributionService { <<external>> }
    class Database { <<infra>> }

    CardsRoutes --> ICardsController
    CardsController ..|> ICardsController
    CardsController --> ICardService
    CardsService ..|> ICardService
    CardsService --> ICardRepository
    CardsRepository ..|> ICardRepository
    CardsRepository --> ICardsAdapter
    CardsRepository --> ICardsMapper
    CardsAdapter ..|> ICardsAdapter
    CardsMapper ..|> ICardsMapper
    CardsAdapter --> CardDistributionService : HTTP
    CardsRepository --> Database : uses
```

### 4. Módulo `trades`

```mermaid
classDiagram
    direction TB

    class ITradesController { <<interface>> }
    class ITradeService { <<interface>> }
    class ITradeRepository { <<interface>> }
    class ITradesAdapter { <<interface>> }
    class ITradesMapper { <<interface>> }

    class TradesRoutes {
        +GET /trades
        +GET /trades/:id
        +PATCH /trades/:id/status
    }
    class TradesController { -service ITradeService }
    class TradesService { -repo ITradeRepository }
    class TradesRepository {
        -adapter ITradesAdapter
        -mapper ITradesMapper
    }
    class TradesAdapter
    class TradesMapper

    class TradesAPI { <<external>> }
    class Database { <<infra>> }

    TradesRoutes --> ITradesController
    TradesController ..|> ITradesController
    TradesController --> ITradeService
    TradesService ..|> ITradeService
    TradesService --> ITradeRepository
    TradesRepository ..|> ITradeRepository
    TradesRepository --> ITradesAdapter
    TradesRepository --> ITradesMapper
    TradesAdapter ..|> ITradesAdapter
    TradesMapper ..|> ITradesMapper
    TradesAdapter --> TradesAPI : HTTP
    TradesRepository --> Database : uses
```
