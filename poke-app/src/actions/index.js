import pokeAPI from "../apis/pokeAPI";
import {
  FETCH_POKE_LIST
} from "./types";

export const fetchPokeList = () => async dispatch => {
  const response = await pokeAPI.get("pokemon");
  console.log(response.data.results);
  dispatch({type: FETCH_POKE_LIST, payload: response.data.results});
};