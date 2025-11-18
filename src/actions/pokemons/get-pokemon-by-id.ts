import { pokeAPI } from "../../config/api/pokeAPI"
import { Pokemon } from "../../domain/entities/pokemon"
import { PokeAPIPokemon } from "../../infraestructure/interfaces/pokeapi.interfaces"
import { PokemonMapper } from "../../infraestructure/mappers/pokemon.mapper"

export const getPokemonById = async (id: number) : Promise<Pokemon> => {
    try {
        const { data } = await pokeAPI.get<PokeAPIPokemon>(`/pokemon/${id}`)

        const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data)
        return pokemon

    } catch (error) {
        throw new Error(`Error getting the pokemon with id ${id}`)
    }
}