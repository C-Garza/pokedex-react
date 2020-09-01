import React from "react";
import styles from "./NavSearch.module.css";
import {getTypesClass} from "../utils/helper-functions"

class NavSearch extends React.Component {
  state = {
    selectedTerm: -1, 
    filteredSuggestions: [], 
    offset: 24, 
    isButtonDisabled: false
  };
  activeSuggestion = React.createRef();

  componentDidMount() {
    if(this.props.userInput) {
      this.handleChange();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.offset !== this.state.offset && this.state.filteredSuggestions.length) {
      return;
    }
    if(prevProps.userInput !== this.props.userInput) {
      this.handleChange();
    }
    if(prevProps.keyPressed !== this.props.keyPressed && this.state.filteredSuggestions.length) {
      this.handleKeyDown();
    }
    if(this.activeSuggestion.current !== null && this.props.showSuggestions) {
      this.checkSuggestionInView(this.activeSuggestion.current);
    }
  }
  handleScroll = (e) => {
    const {filteredSuggestions, offset} = this.state;
    if(!filteredSuggestions.length) {
      return;
    }

    let el = e.currentTarget;
    let scrollTop = el.scrollTop;
    let scrollHeight = el.scrollHeight;
    let height = el.clientHeight;

    if(((scrollHeight - scrollTop) === height) && offset <= filteredSuggestions.length) {
      this.setState((state) => {
        return {offset: state.offset + 24};
      });
    }
  }
  handleChange = (e) => {
    const {pokeList, userInput} = this.props;
    let lowerName = userInput.toLowerCase();

    let filteredSuggestions = userInput === "" ? "" : pokeList.filter(suggestion => {
      return suggestion.name.indexOf(lowerName) > -1;
    }).sort((a,b) => {
      a = a.name;
      b = b.name;
      return a.indexOf(lowerName) - b.indexOf(lowerName);
    }).map(suggestion => {
      return {
        name: suggestion.name.charAt(0).toUpperCase() + suggestion.name.slice(1), 
        id: suggestion.url.slice(34, -1)
      }
    });
    this.setState({
      selectedTerm: -1,
      filteredSuggestions,
      offset: 24
    });
  }
  handleSuggestionClick = (e) => {
    this.setState({
      selectedTerm: -1
    });
    this.props.handleSuggestionClick(e.currentTarget ? e.currentTarget.innerText.slice(0, -4) : e);
  }
  handleKeyDown = (e) => {
    const {selectedTerm, filteredSuggestions} = this.state;

    if(this.props.keyPressed === 13 && filteredSuggestions.length && selectedTerm < 0) {
      this.props.handleSearchButton();
    }

    if(this.props.keyPressed === 13 && filteredSuggestions.length && selectedTerm >= 0) {
      this.handleSuggestionClick(filteredSuggestions[selectedTerm].name);
    }
    else if(this.props.keyPressed === 38) {
      if(selectedTerm === -1) {
        return;
      }
      this.setState({selectedTerm: selectedTerm - 1});
    }
    else if(this.props.keyPressed === 40) {
      if(selectedTerm === filteredSuggestions.length - 1) {
        return;
      }
      this.setState({selectedTerm: selectedTerm + 1});
    }
    this.props.resetKeyDown();
  }
  checkSuggestionInView = (e) => {
    if(!this.activeSuggestion.current) {
      return;
    }
    let containerTop = e.parentNode.scrollTop;
    let containerBottom = containerTop + e.parentNode.clientHeight;
    let suggestionTop = e.offsetTop + 5;
    let suggestionBottom = suggestionTop + e.clientHeight;

    if(suggestionTop < containerTop) {
      e.parentNode.scrollTop -= (containerTop - suggestionTop) + 10;
    }
    else if(suggestionBottom > containerBottom) {
      e.parentNode.scrollTop += (suggestionBottom - containerBottom);
    }
  }
  renderSuggestions = () => {
    const {selectedTerm, filteredSuggestions} = this.state;
    const {pokemonTypes, pokeType, showSuggestions, userInput} = this.props;
    let suggestionsList = "";
    let hasTypes = pokemonTypes.inProgress === false && !pokemonTypes.error.length ?
    true :
    false;
    if(showSuggestions && userInput) {
      if(filteredSuggestions.length) {
        let suggestionsArr = filteredSuggestions.slice(0, this.state.offset);
        suggestionsList = (
          <ul className={styles.suggestions__container} onScroll={this.handleScroll}>
            {suggestionsArr.map((suggestion, index) => {
              let selectedTermClass = styles.suggestion;
              let lowerName = suggestion.name.toLowerCase();
              let indexOfInput = lowerName.indexOf(userInput.toLowerCase());
              let suggestionID = `#${suggestion.id}`;
              let typeClass = [];
              ////HIGHLIGHT LETTERS IN SUGGESTION
              let suggestionHighlighted = [
                <p key={suggestion.id} className={styles.suggestion__name}>{suggestion.name.substring(0, indexOfInput)}
                <span className={styles.suggestion__text__hightlight}>{suggestion.name.substring(indexOfInput, indexOfInput + userInput.length)}</span>
                {suggestion.name.substring(indexOfInput + userInput.length)}</p>
              ];
              ////HANDLE POKEMON TYPE BACKGROUND COLORS
              if(hasTypes) {
                typeClass = getTypesClass([pokeType[lowerName].type]);
              }
              ////HANDLE ID NUMBER
              if(suggestion.id < 10) {
                suggestionID = `#00${suggestion.id}`;
              }
              else if (suggestion.id < 100) {
                suggestionID = `#0${suggestion.id}`;
              }
              if(index === selectedTerm) {
                selectedTermClass = `${styles.suggestion__active} ${styles.suggestion}`;
                return(
                  <li
                    key={suggestion.name}
                    className={selectedTermClass}
                    tabIndex="-1"
                    onClick={this.handleSuggestionClick}
                    ref={this.activeSuggestion}
                  >
                    <img 
                      className={styles.suggestion__img}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${suggestion.id}.png`}
                      alt={suggestion.name}
                    />
                    <div className={`${styles.suggestion__description} ${hasTypes ? typeClass[0].card : styles.no__type}`}>
                      {suggestionHighlighted}
                      <p className={styles.suggestion__id}>{suggestionID}</p>
                    </div>
                  </li>
                );
              }
              return(
                <li
                  key={suggestion.name}
                  className={selectedTermClass}
                  tabIndex="-1"
                  onClick={this.handleSuggestionClick}
                >
                  <img 
                    className={styles.suggestion__img}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${suggestion.id}.png`}
                    alt={suggestion.name}
                  />
                  <div className={`${styles.suggestion__description} ${hasTypes ? typeClass[0].card : styles.no__type}`}>
                    {suggestionHighlighted}
                    <p className={styles.suggestion__id}>{suggestionID}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        );
        return suggestionsList;
      }
      else {
        return(
          <ul className={`${styles.suggestions__none} ${styles.suggestions__container}`}>
            <p>No matches found!</p>
          </ul>
        );
      }
    }
  }
  render() {
    return(
      <React.Fragment>
        {this.renderSuggestions()}
      </React.Fragment>
    )
  }
}

export default NavSearch;