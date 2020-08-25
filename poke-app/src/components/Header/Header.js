import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import styles from "./Header.module.css";
import NavBar from "../NavBar/NavBar";
import {fetchTypes, fetchTypesAllProgress, fetchTypesAllDone} from "../../actions";

class Header extends React.Component {
  componentDidMount() {
    const NUM_OF_TYPES = 19;
    let promises = [];
    if(Object.keys(this.props.allTypes).length !== NUM_OF_TYPES) {
      this.props.fetchTypesAllProgress();
      for(let i = 1; i < NUM_OF_TYPES; i++) {
        promises.push(i);
      }
      promises = promises.map(i => {
        return this.props.fetchTypes(i);
      });
      Promise.all(promises).then((values) => {
        this.props.fetchTypesAllDone();
      }).catch(err => {
        console.log(err);
        this.props.fetchTypesAllDone();
      });
    }
  }
  componentDidUpdate(prevProps) {
    if(!this.props.pokemonTypes.inProgress && this.props.pokemonTypes.error.length && prevProps.location !== this.props.location) {
      this.props.fetchTypesAllProgress();
      let promises = this.props.pokemonTypes.error.map(err => {
        return this.props.fetchTypes(err.id);
      });
      Promise.all(promises).then(values => {
        this.props.fetchTypesAllDone();
      }).catch(err => {
        console.log(err);
        this.props.fetchTypesAllDone();
      });
    }
  }
  render() {
    return(
      <header className={styles.header}>
        <NavBar />
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pokemonTypes: state.pokemon.types,
    allTypes: state.pokemon.types.type
  };
};

export default withRouter(connect(mapStateToProps, {fetchTypes, fetchTypesAllProgress, fetchTypesAllDone})(Header));