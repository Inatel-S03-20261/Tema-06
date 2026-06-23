import type { PokeApiPokemon, PokeApiPokemonList } from "@/shared/pokemon.schema"

const BASE_URL = process.env.POKEAPI_URL as string

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`PokeAPI ${path} → ${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

export function fetchPokemon(nameOrId: string | number): Promise<PokeApiPokemon> {
  return get<PokeApiPokemon>(`/pokemon/${nameOrId}`)
}

export function fetchPokemonList(limit = 20, offset = 0): Promise<PokeApiPokemonList> {
  return get<PokeApiPokemonList>(`/pokemon?limit=${limit}&offset=${offset}`)
}
