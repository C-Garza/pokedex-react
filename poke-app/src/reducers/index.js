import {combineReducers} from "redux";
import pokeReducer from "./pokeReducer";

export default combineReducers({
  pokemon: pokeReducer
});