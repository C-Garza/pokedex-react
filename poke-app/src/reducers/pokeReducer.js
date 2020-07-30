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
  FETCH_TYPE_ALL_PROGRESS,
  FETCH_TYPE_ALL_DONE,
  GET_POKEMON_TYPES,
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
    inProgress: null,
    type: {},
    pokeType: {},
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
    case FETCH_TYPE: {
      ////CONVERT ARRAY OF OBJECTS TO SINGLE OBJECT WITH POKE NAME AS KEY
      let pokeList = action.payload.pokemon.filter(poke => {
        return parseInt(poke.pokemon.url.slice(34, -1), 10) <= 807;
      }).reduce((obj, item) => (obj[item.pokemon.name] = {slot: item.slot, name: item.pokemon.name, url: item.pokemon.url}, obj), {});
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
          type: {
            ...state.types.type,
            [action.payload.name]: pokeList
          },
          error: errors
        }
      };
    }
    case FETCH_TYPE_ALL_PROGRESS:
      return {
        ...state,
        types: {
          ...state.types,
          inProgress: action.payload
        }
      }
    case FETCH_TYPE_ALL_DONE:
      return {
        ...state,
        types: {
          ...state.types,
          inProgress: action.payload
        }
      }
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
    case GET_POKEMON_TYPES: {
      let pokeList = action.payload.pokemon.filter(poke => {
        let inList = parseInt(poke.pokemon.url.slice(34, -1), 10) <= 807;
        if(poke.slot === 1 && inList) {
          return true;
        }
        return false;
      }).reduce((obj, item) => {
        return (obj[item.pokemon.name] = {
          slot: item.slot,
          name: item.pokemon.name,
          url: item.pokemon.url,
          type: action.payload.name
        }, obj)
      }, {});
      return {
        ...state,
        types: {
          ...state.types,
          pokeType: {...state.types.pokeType, ...pokeList}
        }
      };
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