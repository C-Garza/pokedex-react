import React from "react";
import {connect} from "react-redux";
import queryString from "query-string";
import styles from "./SearchResultsPage.module.css";
import PokeListContainer from "../PokeListContainer/PokeListContainer";
import {fetchTypes} from "../../actions";

class SearchResultsPage extends React.Component {
  ////HANDLE CONDITION THAT SEARCH RETURNS NOTHING(i.e. FAIRY/DARK)
  ////CHECK IN RENDER IF TYPE IS SAME AS PREVIOUS ONE (NEW STATES TO HOLD)
  state = {filteredTypes: [], offset: 0};

  componentDidMount() {
    const NUM_OF_TYPES = 19;
    let promises = [];
    for(let i = 1; i < NUM_OF_TYPES; i++) {
      promises.push(i);
    }
    promises = promises.map(i => {
      return Promise.resolve(this.props.fetchTypes(i).catch(e => {console.log(e); return e;}));
    });
    Promise.all(promises).then((values) => {
      this.handleSearchType(queryString.parse(this.props.location.search));
    });
  }
  componentDidUpdate(prevProps) {
    if(this.props.location.search !== prevProps.location.search) {
      this.handleSearchType(queryString.parse(this.props.location.search));
    }
  }
  handleSearchType = (query) => {
    if(!Object.keys(query).length) {
      return;
    }
    else if(query.type) {
      this.filterByType(query.type);
    }
  }
  handleUpdateOffset = (offset) => {
    this.setState({offset: offset});
  }
  filterByType = (types) => {
    const {pokemonTypes} = this.props;
    this.handleUpdateOffset(24);
    if(Array.isArray(types)) { ////EACH POKE MUST CONTAIN THESE TYPES(NO-ORDER, CAN'T HAVE 3 TYPED POKEMON)
      let typesArrOne = new Set(pokemonTypes[types[0]].map(poke => poke.name));
      let mergedTypesArr = [...pokemonTypes[types[1]].filter(poke => typesArrOne.has(poke.name)).map(poke => {
        let slotOne = "";
        let slotTwo = "";
        if(poke.slot === 1) {
          slotOne = types[1];
          slotTwo = types[0];
        }
        else {
          slotOne = types[0];
          slotTwo = types[1];
        }
        return {
          ...poke,
          slotOrder: [slotOne, slotTwo]
        }
      })];
      console.log("FILTERED POKE: ", mergedTypesArr);
      this.setState({filteredTypes: mergedTypesArr});
    }
    else { ////SEARCH OF ONE TYPE
      console.log("FILTERED POKE: ", pokemonTypes[types]);
      this.setState({filteredTypes: pokemonTypes[types]});
    }
  }
  render() {
    return(
      <PokeListContainer 
        searchResults={this.state.filteredTypes} 
        handleUpdateOffset={this.handleUpdateOffset} 
        offset={this.state.offset}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pokemonTypes: state.pokemon.types
  };
};

export default connect(mapStateToProps, {fetchTypes})(SearchResultsPage);