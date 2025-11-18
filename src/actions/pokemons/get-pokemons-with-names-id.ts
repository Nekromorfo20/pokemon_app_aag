import { pokeAPI } from "../../config/api/pokeAPI"
import { PokeAPIPaginatedResponse } from "../../infraestructure/interfaces/pokeapi.interfaces"

export const getPokemonNamesWithId = async () => {
    const url = `/pokemon?limit=1000`
    const { data } = await pokeAPI.get<PokeAPIPaginatedResponse>(url)

    return data.results.map(info => ({
        id: Number(info.url.split('/')[6]),
        name: info.name
    }))
}