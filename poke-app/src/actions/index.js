import pokeAPI from "../apis/pokeAPI";
import {
  FETCH_POKE_LIST,
  FETCH_POKEMON,
  FETCH_POKEMON_SPECIES
} from "./types";

export const fetchPokeList = (limit, offset) => async dispatch => {
  const response = await pokeAPI.get("pokemon", {params: {
    limit: limit,
    offset: offset
  }});
  console.log(response.data.results);
  dispatch({type: FETCH_POKE_LIST, payload: response.data.results});
};

export const fetchPokemon = (name) => async dispatch => {
  const response = await pokeAPI.get(`pokemon/${name}`);
  console.log(response.data);
  dispatch({type: FETCH_POKEMON, payload: response.data});
  dispatch(fetchPokemonSpecies(name));
};

export const fetchPokemonSpecies = (name) => async dispatch => {
  const response = await pokeAPI.get(`pokemon-species/${name}`);
  console.log(response.data);
  dispatch({type: FETCH_POKEMON_SPECIES, payload: response.data});
}