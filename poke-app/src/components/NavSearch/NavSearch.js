import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import styles from "./NavSearch.module.css";

class NavSearch extends React.Component {
  state = {selectedTerm: 0, filteredSuggestions: [], showSuggestions: false, userInput: ""};
  activeSuggestion = React.createRef();
  node = React.createRef();

  componentDidMount() {
    window.addEventListener("click", this.handleOutsideClick);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleOutsideClick);
  }
  componentDidUpdate() {
    if(this.activeSuggestion.current !== null && this.state.showSuggestions) {
      this.checkSuggestionInView(this.activeSuggestion.current);
    }
  }
  handleOutsideClick = (e) => {
    if(this.node.current.contains(e.target)) {
      return;
    }
    this.setState({showSuggestions: false});
  }
  handleChange = (e) => {
    const {pokeList} = this.props;
    const userInput = e.target.value;
    console.log(userInput);

    let filteredSuggestions = pokeList.filter(suggestion => {
      return suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
    }).map(suggestion => {
      return {
        name: suggestion.name.charAt(0).toUpperCase() + suggestion.name.slice(1), 
        id: suggestion.url.slice(34, -1)
      }
    }).sort((a,b) => {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      return a.indexOf(userInput) - b.indexOf(userInput);
    });
    console.log(filteredSuggestions);
    this.setState({
      selectedTerm: 0,
      filteredSuggestions,
      showSuggestions: !e.target.value ? false : true,
      userInput: e.target.value
    });
  }
  handleSuggestionClick = (e) => {
    this.props.history.push(`/pokemon/${e.currentTarget.innerText.slice(0, -4).toLowerCase().replace(/\s/g,'')}`);
    this.setState({
      selectedTerm: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText.slice(0, -4)
    });
  }
  handleRandomButton = (e) => {
    let randomPoke = this.props.pokeList[Math.floor(Math.random() * this.props.pokeList.length)];
    this.props.history.push(`/pokemon/${randomPoke.name}`);
    this.setState({
      selectedTerm: 0,
      filteredSuggestions: [],
      showSuggestions: false
    });
  }
  handleKeyDown = (e) => {
    const {selectedTerm, filteredSuggestions} = this.state;

    if(e.keyCode === 13 && filteredSuggestions.length) {
      this.props.history.push(`/pokemon/${filteredSuggestions[selectedTerm].name.toLowerCase()}`);
      this.setState({
        selectedTerm: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[selectedTerm].name
      });
    }
    else if(e.keyCode === 38) {
      if(selectedTerm === 0) {
        return;
      }
      this.setState({selectedTerm: selectedTerm - 1});
    }
    else if(e.keyCode === 40) {
      if(selectedTerm === filteredSuggestions.length - 1) {
        return;
      }
      this.setState({selectedTerm: selectedTerm + 1});
    }
  }
  checkSuggestionInView = (e) => {
    if(!this.activeSuggestion.current) {
      return;
    }
    let containerTop = e.parentNode.scrollTop;
    let containerBottom = containerTop + e.parentNode.clientHeight;
    let suggestionTop = e.offsetTop;
    let suggestionBottom = suggestionTop + e.clientHeight;

    if(suggestionTop < containerTop) {
      e.parentNode.scrollTop -= (containerTop - suggestionTop);
    }
    else if(suggestionBottom > containerBottom) {
      e.parentNode.scrollTop += (suggestionBottom - containerBottom);
    }
  }
  renderSuggestions = () => {
    const {state: {selectedTerm, filteredSuggestions, showSuggestions, userInput}} = this;
    let suggestionsList = "";

    if(showSuggestions && userInput) {
      if(filteredSuggestions.length) {
        suggestionsList = (
        <React.Fragment>
          <ul className={styles.suggestions__container}>
            {filteredSuggestions.map((suggestion, index) => {
              let selectedTermClass = styles.suggestion;
              let indexOfInput = suggestion.name.toLowerCase().indexOf(userInput.toLowerCase());
              let suggestionHighlighted = [
                <p key={suggestion.id} className={styles.suggestion__name}>{suggestion.name.substring(0, indexOfInput)}
                <span className={styles.suggestion__text__hightlight}>{suggestion.name.substring(indexOfInput, indexOfInput + userInput.length)}</span>
                {suggestion.name.substring(indexOfInput + userInput.length)}</p>
              ];
              let suggestionID = `#${suggestion.id}`;

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
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${suggestion.id}.png`}
                      alt={suggestion.name}
                    />
                    {suggestionHighlighted}
                    <p className={styles.suggestion__id}>{suggestionID}</p>
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
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${suggestion.id}.png`}
                    alt={suggestion.name}
                  />
                  {suggestionHighlighted}
                  <p className={styles.suggestion__id}>{suggestionID}</p>
                </li>
              );
            })}
          </ul>
          <div className={`${styles.search__buttons} ${styles.search__buttons__open}`}>
            <button className={`${styles.search__buttons__button} ${styles.search__buttons__search}`}>Search</button>
            <button 
              className={`${styles.search__buttons__button} ${styles.search__buttons__random}`}
              onClick={this.handleRandomButton}
            >
              Random
            </button>
          </div>
          </React.Fragment>
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
      <div className={styles.search__container}>
        <div className={styles.search} ref={this.node}>
          <input 
            className={this.state.showSuggestions ? `${styles.search__term} ${styles.search__term__closed}` : styles.search__term} 
            type="text" 
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            value={this.state.userInput}
          />
            {this.renderSuggestions()}
        </div>
        <div className={`${styles.search__buttons} ${this.state.showSuggestions ? styles.tabHidden : ""}`}>
          <button className={`${styles.search__buttons__button} ${styles.search__buttons__search}`}>Search</button>
          <button 
            className={`${styles.search__buttons__button} ${styles.search__buttons__random}`}
            onClick={this.handleRandomButton}
          >
            Random
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {pokeList: state.pokemon.pokemonAll.pokeList};
};

export default withRouter(connect(mapStateToProps, {})(NavSearch));