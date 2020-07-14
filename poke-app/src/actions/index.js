import {pokeAPI} from "../apis/pokeAPI";
import {
  FETCH_POKE_LIST,
  FETCH_POKE_LIST_ERROR,
  FETCH_POKEMON,
  FETCH_POKEMON_ERROR,
  FETCH_POKEMON_SPECIES,
  FETCH_POKEMON_SPECIES_ERROR,
  FETCH_TYPE,
  FETCH_TYPE_ERROR,
  FETCH_EVOLUTION_CHAIN,
  FETCH_EVOLUTION_CHAIN_ERROR,
  SET_CHART_PREFERENCE
} from "./types";

const handleError = (err, fn, dispatch, data) => {
  if(err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
    if(data) {
      dispatch(fn(err, data));
    }
    else {
      dispatch(fn(err));
    }
  }
  if(err.request) {
    console.log(err.request);
    if(data) {
      dispatch(fn(err, data));
    }
    else {
      dispatch(fn(err));
    }
  }
  else {
    console.log("Error: ", err.message);
    if(data) {
      dispatch(fn(err, data));
    }
    else {
      dispatch(fn(err));
    }
  }
};

export const fetchPokeList = (limit, offset) => async dispatch => {
  try {
    const response = await pokeAPI.get("pokemon", {params: {
      limit: limit,
      offset: offset
    }});
    console.log(response.data.results);
    dispatch({type: FETCH_POKE_LIST, payload: response.data.results});
    return Promise.resolve({next: response.data.next, prev: response.data.previous});
  } catch (err) {
    handleError(err, fetchPokeListError, dispatch);
    return Promise.reject(err);
  }
};

export const fetchPokeListError = (err) => {
  return {type: FETCH_POKE_LIST_ERROR, payload: err};
};

export const fetchPokemon = (name, isExtended = false) => async dispatch => {
  try {
    const response = await pokeAPI.get(`pokemon/${name}`);
    console.log(response.data);
    dispatch({type: FETCH_POKEMON, payload: response.data});
    if(isExtended) {
      return dispatch(fetchPokemonSpecies(response.data.id, response.data.name));
    }
  } catch (err) {
    handleError(err, fetchPokemonError, dispatch, name);
    return Promise.reject(err);
  }
};

export const fetchPokemonError = (err, name) => {
  return {type: FETCH_POKEMON_ERROR, payload: {err: err, name: name}};
};

export const fetchPokemonSpecies = (id, name) => async dispatch => {
  try {
    const response = await pokeAPI.get(`pokemon-species/${id}`);
    console.log(response.data);
    dispatch({type: FETCH_POKEMON_SPECIES, payload: response.data});
  } catch (err) {
    handleError(err, fetchPokemonSpeciesError, dispatch, name);
    return Promise.reject(err);
  }
};

export const fetchPokemonSpeciesError = (err, name) => {
  return {type: FETCH_POKEMON_SPECIES_ERROR, payload: {err: err, name: name}};
};

export const fetchTypes = (index) => async dispatch => {
  try {
    const response = await pokeAPI.get(`type/${index}`);
    console.log(response.data);
    dispatch({type: FETCH_TYPE, payload: response.data});
  } catch (err) {
    handleError(err, fetchTypesError, dispatch, index);
    return Promise.reject(err);
  }
};

export const fetchTypesError = (err, id) => {
  return {type: FETCH_TYPE_ERROR, payload: {err: err, id: id}};
};

export const fetchEvolutionChain = (index) => async dispatch => {
  try {
    const response = await pokeAPI.get(`evolution-chain/${index}`);
    console.log(response.data);
    dispatch({type: FETCH_EVOLUTION_CHAIN, payload: response.data});
    return Promise.resolve(true);
  } catch (err) {
    handleError(err, fetchEvolutionChainError, dispatch, index);
    return Promise.reject(err);
  }
};

export const fetchEvolutionChainError = (err, index) => {
  return {type: FETCH_EVOLUTION_CHAIN_ERROR, payload: {err: err, id: index}};
};

export const setChartPreference = (chart) => {
  return {type: SET_CHART_PREFERENCE, payload: chart};
};