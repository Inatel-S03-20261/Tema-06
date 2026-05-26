import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import scalarApiReference from '@scalar/fastify-api-reference'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

export const docsPlugin = fp(async function (app: FastifyInstance): Promise<void> {
  await app.register(fastifySwagger, {
    transform: jsonSchemaTransform,
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Painel de Administração — API',
        description: [
          'API do painel administrativo da plataforma de troca de cartas.',
          '',
          'Permite que administradores gerenciem jogadores, consultem o catálogo',
          'de cartas e monitorem trocas abertas, propostas e finalizadas.',
          '',
          '> Todos os endpoints (exceto `/auth/login`) exigem autenticação via **Bearer JWT**.',
        ].join('\n'),
        version: '1.0.0',
        contact: {
          name: 'Equipe Tema-06',
        },
      },
      servers: [
        {
          url: 'http://localhost:{port}',
          description: 'Ambiente de desenvolvimento',
          variables: {
            port: {
              default: '3000',
              description: 'Porta configurada em PORT no .env',
            },
          },
        },
      ],
      tags: [
        {
          name: 'auth',
          description: 'Admin authentication',
        },
        {
          name: 'players',
          description: 'Player management — list, search, ban/unban, promote to admin',
        },
        {
          name: 'cards',
          description: 'Card catalog — list and filter by type',
        },
        {
          name: 'trades',
          description: 'Trade monitoring — open, proposed and completed trades',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Token JWT obtido via `POST /auth/login`',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  })

  await app.register(scalarApiReference, {
    routePrefix: '/docs',
    configuration: {
      title: 'Painel de Administração — Referência da API',
      theme: 'purple',
      hideModels: false,
      defaultHttpClient: {
        targetKey: 'javascript',
        clientKey: 'fetch',
      },
    },
  })
})
