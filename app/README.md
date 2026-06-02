## Frontend

O frontend fica em `app` e usa React, TypeScript, Vite, React Router e Tailwind CSS. As telas seguem os diagramas do projeto como referência: `PlayerPage` lista jogadores, `PlayerDetailComponent` exibe perfil, cartas e trocas de um jogador, e `TradePage` consolida o dashboard de trocas.

Rotas principais:

- `/`: tela inicial do painel administrativo.
- `/jogadores`: listagem e filtro de jogadores.
- `/jogadores/:playerId`: detalhes do jogador, inventário de cartas e histórico de trocas.
- `/trocas`: dashboard com resumo e filtros de trocas.

Componentes compartilhados:

- `app/src/components/PageLayout.tsx`: estrutura responsiva comum das páginas.
- `app/src/components/Header.tsx`: cabeçalho global com navegação principal.
- `app/src/components/ActionLink.tsx`: link com aparência de ação.
- `app/src/components/Button.tsx`: botão primário reutilizável.
- `app/src/components/ClearFiltersButton.tsx`: botão para resetar filtros ativos.
- `app/src/components/PageSection.tsx`: seção de página com título padronizado.
- `app/src/components/SearchInput.tsx`: campo controlado para filtros simples.
- `app/src/components/SelectInput.tsx`: seleção controlada com rótulo contextual.
- `app/src/components/Tooltip.tsx`: ajuda contextual reutilizável.

Componentes por domínio:

- `app/src/components/players`: lista, card e status de jogadores.
- `app/src/components/cards`: listagem de cartas.
- `app/src/components/trades`: resumo e listagem de trocas.

### Como executar o frontend

```bash
cd app
npm install
npm run dev
```