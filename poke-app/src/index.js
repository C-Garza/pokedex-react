import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import reduxThunk from "redux-thunk";
import App from "./components/App";
import reducers from "./reducers";
import throttle from "lodash/throttle";
import {loadState, saveState, getPokeList} from "./components/utils/helper-functions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(reduxThunk))
);

store.subscribe(throttle(() => {
  saveState({
    pokemon: getPokeList(store),
    userPreferences: store.getState().userPreferences
  });
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.querySelector("#root")
);