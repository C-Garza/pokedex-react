import React from "react";
import {connect} from "react-redux";
import styles from "./SearchResultsPage.module.css";
import PokeListContainer from "../PokeListContainer/PokeListContainer";

class SearchResultsPage extends React.Component {
  render() {
    return(
      <PokeListContainer />
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(SearchResultsPage);