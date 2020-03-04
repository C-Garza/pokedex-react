import {
  FETCH_POKE_LIST
} from "../actions/types";

const INIT_STATE = {
  pokemonAll: {
    pokeList: []
  },
  pokemon: {

  }
};

export default (state=INIT_STATE, action) => {
  switch(action.type) {
    case FETCH_POKE_LIST:
      return {
        ...state, 
        pokemonAll: {...state.pokemonAll, pokeList: [...state.pokemonAll.pokeList, ...action.payload]}
      }
    default:
      return state;
  }
};

// store = {
//   pokemonAll: {
//     pokeList: [],
//   },
//  pokemon: {
//    //ht, wt...
//  }
// }