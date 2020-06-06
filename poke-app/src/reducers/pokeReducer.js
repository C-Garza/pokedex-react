import {
  FETCH_POKE_LIST, 
  FETCH_POKEMON,
  FETCH_POKEMON_SPECIES,
  FETCH_TYPE
} from "../actions/types";

const INIT_STATE = {
  pokemonAll: {
    pokeList: []
  },
  pokemonObjs: {

  },
  types: {

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
          [action.payload.name]: action.payload
        }
      };
    case FETCH_POKEMON_SPECIES:
      return {
        ...state,
        pokemonObjs: {
          ...state.pokemonObjs,
          [action.payload.varieties[0].pokemon.name]: {
            ...state.pokemonObjs[action.payload.varieties[0].pokemon.name],
            species_ext: action.payload
          }
        }
      };
    case FETCH_TYPE:
      ////FILTER OUT POKE FORMS AND
      ////RETURN SINGLE OBJECT WITH POKEMON AND SLOT NUM
      let pokeList = action.payload.pokemon.filter(poke => {
        ////TO-DO: CHANGE 807 TO state.pokeList WITHOUT RACE CONDITION
        return parseInt(poke.pokemon.url.slice(34, -1), 10) <= 807;
      }).map(poke => {
        poke.pokemon.slot = poke.slot;
        return poke.pokemon;
      });
      return {
        ...state,
        types: {
          ...state.types,
          [action.payload.name]: [...pokeList]
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
//      ...pokemon,
//      species.ext{}
//    }
//  }
//  types: {
//    fighting: []
//  }
// }