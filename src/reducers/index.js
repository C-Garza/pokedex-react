import {combineReducers} from "redux";
import pokeReducer from "./pokeReducer";
import userPreferences from "./userPreferences";

export default combineReducers({
  pokemon: pokeReducer,
  userPreferences: userPreferences
});