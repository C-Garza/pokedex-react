import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import styles from "../App.module.css";
import Header from "./Header/Header";
import PokeListContainer from "./PokeListContainer/PokeListContainer";
import PokePageContainer from "./PokePageContainer/PokePageContainer";

class App extends React.Component {
  render() {
    return(
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={PokeListContainer} />
            <Route path="/pokemon/:id" exact component={PokePageContainer} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;