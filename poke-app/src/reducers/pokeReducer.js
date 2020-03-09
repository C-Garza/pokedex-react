import {
  FETCH_POKE_LIST, 
  FETCH_POKEMON
} from "../actions/types";

const INIT_STATE = {
  pokemonAll: {
    pokeList: []
  },
  pokemonObjs: {

  }
};

export default (state=INIT_STATE, action) => {
  switch(action.type) {
    case FETCH_POKE_LIST:
      return {
        ...state,
        pokemonAll: {...state.pokemonAll, pokeList: [...state.pokemonAll.pokeList, ...action.payload]}
      };
    case FETCH_POKEMON:
      return {
        ...state,
        pokemonObjs: {
          ...state.pokemonObjs,
          [action.payload.species.name]: action.payload
        }
      };
    default:
      return state;
  }
};

// store = {
//   pokemonAll: {
//     pokeList: [],
//   },
//  pokemonObjs: {
//    pokemon: {
//      
//    }
//  }
// }