import { z } from 'zod'

export const PokeApiPokemon = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number(),
  types: z.array(z.object({
    slot: z.number(),
    type: z.object({
      name: z.string(),
    }),
  })),
  stats: z.array(z.object({
    base_stat: z.number(),
    stat: z.object({
      name: z.string(),
    }),
  })),
  sprites: z.object({
    front_default: z.string().nullable(),
  }),
})

export const PokeApiPokemonListItem = z.object({
  name: z.string(),
  url: z.string(),
})

export const PokeApiPokemonList = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(PokeApiPokemonListItem),
})

export type PokeApiPokemon = z.infer<typeof PokeApiPokemon>
export type PokeApiPokemonList = z.infer<typeof PokeApiPokemonList>
export type PokeApiPokemonListItem = z.infer<typeof PokeApiPokemonListItem>