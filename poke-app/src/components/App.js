import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import styles from "../App.module.css";
import Header from "./Header/Header";
import HomePage from "./HomePage/HomePage";
import PokePageContainer from "./PokePageContainer/PokePageContainer";
import SearchResultsPage from "./SearchResultsPage/SearchResultsPage";

class App extends React.Component {
  render() {
    return(
      <div>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/pokemon/:id" exact component={PokePageContainer} />
            <Route path="/search" exact component={SearchResultsPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;