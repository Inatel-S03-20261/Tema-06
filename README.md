# 🛡️ Painel de Administração (Aplicação 6)
Responsável por administrar a posse de cartas na plataforma. O projeto fornece um painel administrativo em React para acompanhar jogadores, cartas, batalhas e trocas, com navegação inferior fixa.

# Funcionalidades
* **Acesso Restrito:** Login seguro e exclusivo para os administradores da plataforma.
* **Gestão de Jogadores:** Listagem e busca de usuários, permitindo banir, desbanir ou promovê-los a administrador.
* **Visão de Perfil:** Consulta detalhada em sidebar com perfil, batalhas, cartas possuídas e histórico de trocas do jogador.
* **Catálogo de Cartas:** Listagem de todas as cartas disponíveis no ecossistema, com filtros por nome, tipo e raridade.
* **Monitoramento de Batalhas:** Listagem e filtros por jogador ou status da batalha.
* **Monitoramento de Trocas:**
  * Acompanhamento em tempo real das trocas que estão em aberto.
  * Visualização dos detalhes das propostas realizadas (jogadores envolvidos e cartas ofertadas).
  * Histórico completo com o registro das trocas já finalizadas.

# Diagramas
**Diagrama de caso de uso:**
![diagrama-casos-de-uso-S03](https://github.com/user-attachments/assets/4b535495-89a1-4f1a-8671-bff73af74368)

**Diagrama de classes frontend:**
![diagrama-classes-S03](./Docs/Diagramas/diagrama-classes-front-S03.jpg)

**Diagrama de classes backend:**

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


**Diagrama de sequência:**
![diagrama-classes-S03](./Docs/Diagramas/diagrama-sequencia-S03.jpg)

## Princípios SOLID

A arquitetura do projeto foi analisada com base nos princípios **SOLID**, identificando os pontos já aplicados e os que podem ser melhorados futuramente.

### **S — Single Responsibility Principle** ✅ Aplicado
O projeto aplica esse princípio ao separar bem as responsabilidades entre as camadas:
- **Pages** cuidam da interface;
- **Controllers** organizam o fluxo;
- **Services** acessam dados e APIs;
- **Models** representam as entidades.

### **O — Open/Closed Principle** ❌ Não implementado diretamente
Atualmente, novos comportamentos exigem alteração em classes existentes.  
Uma melhoria futura seria criar abstrações para filtros e regras específicas, evitando modificar diretamente os services.

### **L — Liskov Substitution Principle** ➖ Não se aplica
O projeto não utiliza herança entre classes, então esse princípio não se destaca na arquitetura atual.

### **I — Interface Segregation Principle** ❌ Não implementado
Os controllers dependem diretamente dos services concretos, sem interfaces intermediárias.  
Como melhoria, poderiam ser criadas interfaces como `IPlayerService` e `ITradeService`, reduzindo acoplamento e deixando cada controller dependente apenas do que realmente usa.

### **D — Dependency Inversion Principle** ❌ Não implementado
As camadas se comunicam diretamente por implementações concretas.  
Uma evolução futura seria fazer os controllers dependerem de abstrações, o que melhoraria flexibilidade, testes e manutenção.


## Escolha das Arquiteturas

O projeto utiliza uma combinação de conceitos arquiteturais para organizar melhor a aplicação e facilitar sua evolução.

### SPA — Single Page Application

A aplicação segue o conceito de **SPA** no front-end, pois é carregada em uma única página e a navegação entre as telas acontece de forma dinâmica, sem recarregar o site inteiro. Isso deixa a experiência do usuário mais rápida e fluida.

### SOA — Service-Oriented Architecture

Também aplicamos conceitos de **SOA**, organizando o sistema em partes com responsabilidades bem definidas. A ideia é separar funcionalidades em serviços ou módulos, como jogadores, cartas e trocas, facilitando manutenção, reaproveitamento e integração com APIs externas.
