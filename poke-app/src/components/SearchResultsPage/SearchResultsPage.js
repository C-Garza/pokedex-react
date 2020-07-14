import React from "react";
import {connect} from "react-redux";
import queryString from "query-string";
import styles from "./SearchResultsPage.module.css";
import PokeListContainer from "../PokeListContainer/PokeListContainer";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import {fetchTypes, fetchPokeList} from "../../actions";

class SearchResultsPage extends React.Component {
  ////HANDLE CONDITION THAT SEARCH RETURNS NOTHING(i.e. FAIRY/DARK)
  ////CHECK IN RENDER IF TYPE IS SAME AS PREVIOUS ONE (NEW STATES TO HOLD)
  state = {filteredPoke: [], offset: 0, isLoading: true, hasError: false, title: ""};
  _isMounted = false;

  componentDidMount() {
    const NUM_OF_TYPES = 19;
    let promises = [];
    this._isMounted = true;
    if(!this.props.pokeList.length) {
      this.props.fetchPokeList(807).catch(err => {
        console.log(err);
      });
    }
    if(Object.keys(this.props.pokemonTypes).length !== NUM_OF_TYPES) {
      for(let i = 1; i < NUM_OF_TYPES; i++) {
        promises.push(i);
      }
      promises = promises.map(i => {
        return this.props.fetchTypes(i);
      });
      Promise.all(promises).then((values) => {
        if(this._isMounted) {
          this.handleSearchType(queryString.parse(this.props.location.search));
          this.setState({isLoading: false});
        }
      }).catch(err => {
        console.log(err);
        if(this._isMounted) {
          this.setState({hasError: true});
        }
      });
    }
    else {
      this.handleSearchType(queryString.parse(this.props.location.search));
      if(this._isMounted) {
        this.setState({isLoading: false});
      }
    }
  }
  componentDidUpdate(prevProps) {
    if(this.props.location.search !== prevProps.location.search) {
      if(this.state.hasError) {
        let promises = this.props.pokemonTypes.error.map(err => {
          return this.props.fetchTypes(err.id);
        });
        Promise.all(promises).then(values => {
          this.handleSearchType(queryString.parse(this.props.location.search));
        }).catch(err => {
          console.log(err);
        });
      }
      else {
        this.handleSearchType(queryString.parse(this.props.location.search));
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleSearchType = (query) => {
    if(this.state.hasError) {
      this.setState({hasError: false, isLoading: false});
    }
    if(!Object.keys(query).length) {
      return;
    }
    else if(query.type) {
      this.filterByType(query.type);
    }
    else if(query.name) {
      this.filterByName(query.name);
    }
  }
  handleUpdateOffset = (offset) => {
    this.setState({offset: offset});
  }
  filterByName = (name) => {
    const {pokeList} = this.props;
    this.handleUpdateOffset(24);
    console.log(name);
    let filteredSuggestions = pokeList.filter(suggestion => {
      return suggestion.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
    }).sort((a,b) => {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      return a.indexOf(name) - b.indexOf(name);
    });
    console.log(filteredSuggestions);
    this.setState({filteredPoke: filteredSuggestions, title: [name]});
  }
  filterByType = (types) => {
    const {pokemonTypes} = this.props;
    ////CHECK IF QUERY EXISTS IN STATE
    if(Array.isArray(types)) {
      if(!types.every(type => {
        return pokemonTypes[type];
      })) {
        return;
      }
    }
    else {
      if(!pokemonTypes[types]) {
        return;
      }
    }
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
      this.setState({filteredPoke: mergedTypesArr, title: types});
    }
    else { ////SEARCH OF ONE TYPE
      console.log("FILTERED POKE: ", pokemonTypes[types]);
      this.setState({filteredPoke: pokemonTypes[types], title: [types]});
    }
  }
  renderHeading = (query) => {
    const {filteredPoke} = this.state;
    if(!Object.keys(query).length) {
      return;
    }
    else if(query.type) {
      let typeList = Array.isArray(query.type) ? 
      query.type.map(type => type.charAt(0).toUpperCase() + type.slice(1)).join(" & ") :
      query.type.charAt(0).toUpperCase() + query.type.slice(1);
      return(
        <h1 className={styles.search__results__header}>Showing {filteredPoke.length} result(s) for: {typeList}</h1>
      );
    }
    else if(query.name) {
      return(
        <h1 className={styles.search__results__header}>Showing {filteredPoke.length} result(s) for: {query.name}</h1>
      );
    }
  }
  render() {
    if(this.state.hasError) {
      return(
        <div className={styles.container}>
          <div>ERROR!</div>
        </div>
      );
    }
    let query = queryString.parse(this.props.location.search);
    if(this.state.isLoading) {
      return (
        <div className={styles.container}>
          <LoadingScreen></LoadingScreen>
        </div>
      );
    }
    return(
      <div className={styles.search__results__container}>
        <div className={styles.search__results__header__container}>
          {this.renderHeading(query)}
        </div>
        <PokeListContainer 
          searchResults={this.state.filteredPoke}
          title={this.state.title}
          handleUpdateOffset={this.handleUpdateOffset} 
          offset={this.state.offset}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pokeList: state.pokemon.pokemonAll.pokeList,
    pokemonTypes: state.pokemon.types
  };
};

export default connect(mapStateToProps, {fetchTypes, fetchPokeList})(SearchResultsPage);