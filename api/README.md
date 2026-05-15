# API — Estrutura SOA

Backend orientado a serviços que consome APIs externas, mapeia dados para o frontend e persiste informações no banco de dados.

---

## Estrutura de Diretórios

```
api/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── dtos/
│   │   ├── request/
│   │   └── response/
│   ├── adapters/
│   ├── mappers/
│   ├── middlewares/
│   ├── utils/
│   └── routes/
└── tests/
    ├── unit/
    └── integration/
```

---

## Responsabilidade de cada pasta

### `config/`
Configurações globais da aplicação: conexão com banco de dados, variáveis de ambiente e inicialização de clientes HTTP para serviços externos.

### `controllers/`
Recebe a requisição HTTP e delega para o service correspondente. Não contém lógica de negócio — apenas interpreta a entrada e devolve a resposta.

### `services/`
Coração do SOA. Contém toda a lógica de negócio e orquestra as demais camadas: chama adapters para buscar dados externos, usa repositories para persistir no banco e aciona mappers para transformar os dados.

### `repositories/`
Único ponto de contato com o banco de dados. Concentra todas as operações de leitura e escrita (queries, inserts, updates, deletes), isolando o restante da aplicação do ORM ou driver utilizado.

### `models/`
Define a estrutura das entidades e tabelas do banco de dados. Representa os dados no formato em que são armazenados.

### `dtos/`
Data Transfer Objects — definem e validam o contrato de dados entre camadas.

- **`request/`** — formata e valida o que chega do frontend ou de um cliente externo.
- **`response/`** — formata o que é devolvido ao frontend, evitando expor a estrutura interna da aplicação.

### `adapters/`
Responsável por consumir APIs de serviços externos. Cada adapter encapsula um serviço terceiro (autenticação, chamadas HTTP, tratamento de erros da API externa), isolando o restante da aplicação de mudanças nesses serviços.

### `mappers/`
Transforma dados entre as camadas da aplicação. Por exemplo: converte a resposta de uma API externa para o modelo interno, ou converte uma entidade do banco para o formato esperado pelo frontend.

### `middlewares/`
Lógica transversal aplicada nas rotas: autenticação, autorização, logging, tratamento centralizado de erros e rate limiting.

### `utils/`
Funções auxiliares reutilizáveis sem vínculo com a lógica de negócio. Exemplos: formatação de datas, geração de hashes, validadores genéricos.

### `routes/`
Define os endpoints HTTP e os conecta aos controllers correspondentes. Ponto de entrada das requisições na aplicação.

### `tests/unit/`
Testa funções e services de forma isolada, sem dependência de banco de dados ou chamadas HTTP reais.

### `tests/integration/`
Testa o fluxo completo da aplicação com banco de dados e APIs reais ou mockadas, garantindo que as camadas funcionam corretamente em conjunto.

---

## Fluxo de uma requisição

```
routes → controller → service → adapter  (API externa)
                              → repository (banco de dados)
                              ↓
                          mapper → dto/response → frontend
```
