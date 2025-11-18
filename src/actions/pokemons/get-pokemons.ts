import { pokeAPI } from "../../config/api/pokeAPI";
import type { Pokemon } from "../../domain/entities/pokemon";
import type { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../../infraestructure/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../../infraestructure/mappers/pokemon.mapper";

export const getPokemons = async (page : number, limit : number = 20) : Promise<Pokemon[]> => {
    try {
        const url = `/pokemon?offset=${page * 10}&limit=${limit}`
        const { data } = await pokeAPI.get<PokeAPIPaginatedResponse>(url)
        const pokemonPromises = data.results.map(info => {
            return pokeAPI.get<PokeAPIPokemon>(info.url)
        })

        const pokeApiPokemons = await Promise.all(pokemonPromises)
        const pokemonsPromises = pokeApiPokemons.map(item => PokemonMapper.pokeApiPokemonToEntity(item.data))

        return await Promise.all(pokemonsPromises)
    } catch (error) {
        console.log(error)
        throw new Error('Error getting pokemons')
    }
}