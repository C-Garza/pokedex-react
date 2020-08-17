import React from "react";
import {connect} from "react-redux";
import queryString from "query-string";
import styles from "./SearchResultsPage.module.css";
import PokeListContainer from "../PokeListContainer/PokeListContainer";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import {fetchPokeList} from "../../actions";

class SearchResultsPage extends React.Component {
  ////HANDLE CONDITION THAT SEARCH RETURNS NOTHING(i.e. FAIRY/DARK)
  state = {filteredPoke: [], offset: 0, isLoading: true, hasError: false, title: ""};
  _isMounted = false;

  async componentDidMount() {
    this._isMounted = true;
    document.title = "Search";
    if(!this.props.pokeList.length) {
      await this.props.fetchPokeList(807).catch(err => {
        console.log(err);
      });
    }
    if(!this.props.pokeListError && queryString.parse(this.props.location.search).name) {
      this.handleSearchType(queryString.parse(this.props.location.search));
      if(this._isMounted) {
        this.setState({isLoading: false});
      }
      return;
    }
    if(this.props.pokemonTypes.inProgress) {
      return;
    }
    if(!this.props.pokemonTypes.inProgress && !this.props.pokemonTypes.error.length && this.props.pokemonTypes.inProgress !== null) {
      this.handleSearchType(queryString.parse(this.props.location.search));
      if(this._isMounted) {
        this.setState({isLoading: false});
      }
    }
    else {
      if(this._isMounted) {
        this.setState({hasError: true});
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.title !== this.state.title) {
      let pathName = "Search";
      let searchParams = [];
      if(this.state.title) {
        searchParams = this.state.title.map(param => {
          return param.charAt(0).toUpperCase() + param.slice(1);
        }).join(" & ");
      }
      document.title = `${pathName} · ${searchParams}`;
    }
    if(queryString.parse(this.props.location.search).name) {
      if(this.props.location.search !== prevProps.location.search && !this.props.pokeListError) {
        this.handleSearchType(queryString.parse(this.props.location.search));
        if(this._isMounted) {
          this.setState({isLoading: false});
        }
      }
    }
    else {
      if(this.props.location.search !== prevProps.location.search && !this.props.pokemonTypes.inProgress && !this.props.pokemonTypes.error.length) {
        this.handleSearchType(queryString.parse(this.props.location.search));
      }
      if(this.props.location.search !== prevProps.location.search && this.props.pokemonTypes.inProgress && !this.state.isLoading) {
        if(this._isMounted) {
          this.setState({isLoading: true});
        }
      }
      if(this.state.hasError && !this.props.pokemonTypes.inProgress && !this.props.pokemonTypes.error.length) {
        this.handleSearchType(queryString.parse(this.props.location.search));
      }
      if(!this.state.hasError && !this.props.pokemonTypes.inProgress && this.props.pokemonTypes.error.length) {
        if(this._isMounted) {
          this.setState({hasError: true, isLoading: true});
        }
      }
      if(!this.state.hasError && this.props.pokemonTypes.inProgress === false && !this.props.pokemonTypes.error.length && this.state.isLoading) {
        this.handleSearchType(queryString.parse(this.props.location.search));
        if(this._isMounted) {
          this.setState({isLoading: false});
        }
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleSearchType = (query) => {
    if(!this._isMounted) {
      return;
    }
    if(this.state.hasError && this._isMounted) {
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
    const {type: pokemonTypes} = this.props.pokemonTypes;
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
      let typesList = Object.keys(pokemonTypes[types[0]]).filter(poke => {
        return pokemonTypes[types[1]][poke];
      }).map(poke => {
        let slotOne = "";
        let slotTwo = "";
        poke = pokemonTypes[types[1]][poke];
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
      });
      console.log("FILTERED POKE: ", typesList);
      this.setState({filteredPoke: typesList, title: types});
    }
    else { ////SEARCH OF ONE TYPE
      let typesList = Object.values(pokemonTypes[types]);
      console.log("FILTERED POKE: ", typesList);
      this.setState({filteredPoke: typesList, title: [types]});
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
    if(this.state.hasError && !this.props.pokemonTypes.inProgress) {
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
    pokeListError: state.pokemon.pokemonAll.error,
    pokemonTypes: state.pokemon.types
  };
};

export default connect(mapStateToProps, {fetchPokeList})(SearchResultsPage);