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

**Diagrama de classes:**
![diagrama-classes-S03](./Docs/Diagramas/diagrama-classes-S03.jpg)

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
