import {
  FETCH_POKE_LIST, 
  FETCH_POKEMON,
  FETCH_POKEMON_ERROR,
  FETCH_POKEMON_SPECIES,
  FETCH_TYPE,
  FETCH_EVOLUTION_CHAIN,
  FETCH_POKE_LIST_ERROR,
  FETCH_POKEMON_SPECIES_ERROR,
  FETCH_EVOLUTION_CHAIN_ERROR,
  FETCH_TYPE_ERROR,
} from "../actions/types";

const INIT_STATE = {
  pokemonAll: {
    pokeList: [],
    error: null
  },
  pokemonObjs: {
    error: null
  },
  evolution_chains: {
    error: null
  },
  types: {
    error: []
  }
};

export default (state=INIT_STATE, action) => {
  switch(action.type) {
    case FETCH_POKE_LIST:
      return {
        ...state,
        pokemonAll: {
          ...state.pokemonAll, 
          pokeList: [...action.payload],
          error: null
        },
      };
    case FETCH_POKE_LIST_ERROR:
      return {
        ...state,
        pokemonAll: {
          ...state.pokemonAll,
          error: action.payload
        }
      };
    case FETCH_POKEMON:
      return {
        ...state,
        pokemonObjs: {
          ...state.pokemonObjs,
          [action.payload.name]: action.payload,
          error: null
        }
      };
    case FETCH_POKEMON_ERROR:
      return {
        ...state,
        pokemonObjs: {
          ...state.pokemonObjs,
          error: action.payload
        }
      }
    case FETCH_POKEMON_SPECIES:
      return {
        ...state,
        pokemonObjs: {
          ...state.pokemonObjs,
          [action.payload.varieties[0].pokemon.name]: {
            ...state.pokemonObjs[action.payload.varieties[0].pokemon.name],
            error: null,
            species_ext: action.payload
          }
        }
      };
    case FETCH_POKEMON_SPECIES_ERROR:
      return {
        ...state,
        pokemonObjs: {
          ...state.pokemonObjs,
          [action.payload.name]: {
            ...state.pokemonObjs[action.payload.name],
            error: action.payload.err
          }
        }
      }
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
      let errors = [];
      if(state.types.error.length > 0) {
        errors = state.types.error.filter(type => {
          return type.id !== action.payload.id;
        });
      }
      return {
        ...state,
        types: {
          ...state.types,
          [action.payload.name]: [...pokeList],
          error: errors
        }
      };
    case FETCH_TYPE_ERROR:
      let hasError = -1;
      if(state.types.error.length) {
        hasError = state.types.error.findIndex(type => type.id === action.payload.id);
      }
      if(hasError !== -1) {
        return {
          ...state,
          types: {
            ...state.types,
            error: [...state.types.error]
          }
        }
      }
      return {
        ...state,
        types: {
          ...state.types,
          error: [...state.types.error, {err: action.payload.err, id: action.payload.id}]
        }
      }
    case FETCH_EVOLUTION_CHAIN:
      return {
        ...state,
        evolution_chains: {...state.evolution_chains, [action.payload.id]: action.payload, error: null}
      };
    case FETCH_EVOLUTION_CHAIN_ERROR:
      return {
        ...state,
        evolution_chains: {...state.evolution_chains, error: action.payload}
      }
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
//      evolution_chain: {}
//      species.ext{}
//    }
//  }
//  evolution-chains: [
//    {},{},...
//  ]
//  types: {
//    fighting: []
//  }
// }