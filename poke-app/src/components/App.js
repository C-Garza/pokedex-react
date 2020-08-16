import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import styles from "../App.module.css";
import ScrollToTop from "./ScrollToTop/ScrollToTop";
import Header from "./Header/Header";
import HomePage from "./HomePage/HomePage";
import PokePageContainer from "./PokePageContainer/PokePageContainer";
import SearchResultsPage from "./SearchResultsPage/SearchResultsPage";
import EmptyPage from "./EmptyPage/EmptyPage";

class App extends React.Component {
  render() {
    return(
      <div>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/pokemon/:id" exact component={PokePageContainer} />
            <Route path="/search" exact component={SearchResultsPage} />
            <Route path="/404/:id" exact component={EmptyPage} />
            <Route component={EmptyPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;