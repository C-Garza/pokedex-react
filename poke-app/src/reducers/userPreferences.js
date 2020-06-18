import {
  SET_CHART_PREFERENCE
} from "../actions/types";

const INIT_STATE = {
  chartPreference: "radar"
};

export default (state = INIT_STATE, action) => {
  switch(action.type) {
    case SET_CHART_PREFERENCE:
      return {...state, chartPreference: action.payload}
    default:
      return state;
  }
};