import pokeAPI from "../apis/pokeAPI";
import {
  FETCH_POKE_LIST,
  FETCH_POKEMON,
  FETCH_POKEMON_SPECIES,
  FETCH_TYPE,
  FETCH_EVOLUTION_CHAIN,
  SET_CHART_PREFERENCE
} from "./types";

export const fetchPokeList = (limit, offset) => async dispatch => {
  const response = await pokeAPI.get("pokemon", {params: {
    limit: limit,
    offset: offset
  }});
  console.log(response.data.results);
  dispatch({type: FETCH_POKE_LIST, payload: response.data.results});
  return Promise.resolve({next: response.data.next, prev: response.data.previous});
};

export const fetchPokemon = (name, isExtended = false) => async dispatch => {
  const response = await pokeAPI.get(`pokemon/${name}`);
  console.log(response.data);
  dispatch({type: FETCH_POKEMON, payload: response.data});
  if(isExtended) {
    return dispatch(fetchPokemonSpecies(response.data.id));
  }
  return Promise.resolve(true);
};

export const fetchPokemonSpecies = (name) => async dispatch => {
  const response = await pokeAPI.get(`pokemon-species/${name}`);
  console.log(response.data);
  dispatch({type: FETCH_POKEMON_SPECIES, payload: response.data});
};

export const fetchTypes = (index) => async dispatch => {
  const response = await pokeAPI.get(`type/${index}`);
  console.log(response.data);
  dispatch({type: FETCH_TYPE, payload: response.data});
};

export const fetchEvolutionChain = (index) => async dispatch => {
  const response = await pokeAPI.get(`evolution-chain/${index}`);
  console.log(response.data);
  dispatch({type: FETCH_EVOLUTION_CHAIN, payload: response.data});
  return Promise.resolve(true);
};

export const setChartPreference = (chart) => {
  return {type: SET_CHART_PREFERENCE, payload: chart};
};