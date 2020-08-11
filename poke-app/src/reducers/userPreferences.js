import {
  SET_CHART_PREFERENCE, 
  SET_GUESS_SCORE, 
  SET_GUESS_HIGH_SCORE
} from "../actions/types";

const INIT_STATE = {
  chartPreference: "radar",
  score: null,
  highScore: null
};

export default (state = INIT_STATE, action) => {
  switch(action.type) {
    case SET_CHART_PREFERENCE:
      return {...state, chartPreference: action.payload}
    case SET_GUESS_SCORE:
      return {
        ...state,
        score: action.payload
      }
    case SET_GUESS_HIGH_SCORE:
      return {
        ...state,
        highScore: action.payload
      }
    default:
      return state;
  }
};