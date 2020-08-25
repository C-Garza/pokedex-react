import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import styles from "./NavDisplay.module.css";
import NavSearch from "../NavSearch/NavSearch";
import NavType from "../NavType/NavType";
import NavGuess from "../NavGuess/NavGuess";
import NavAbout from "../NavAbout/NavAbout";
import NavOptions from "../NavOptions/NavOptions";
import {setGuessScore, setGuessHighScore} from "../../actions";
import ComingSoon from "../ComingSoon/ComingSoon";

class NavDisplay extends React.Component {
  state = {
    userInput: "", 
    showSuggestions: false, 
    keyPressed: null,
    filterHistory: [],
    pokeGuessAnswer: null,
    hasWon: null,
    renderDisplay: "NavSearch",
    isButtonDisabled: false
  };
  node = React.createRef();

  componentDidMount() {
    window.addEventListener("click", this.handleOutsideClick);
  }
  componentDidUpdate(prevProps) {
    if(prevProps.isOpen && !this.props.isOpen) {
      this.setState({
        renderDisplay: "NavSearch",
        showSuggestions: false,
        filterHistory: [],
        hasWon: null,
        pokeGuessAnswer: null
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleOutsideClick);
  }
  handleOutsideClick = (e) => {
    if(this.node.current.contains(e.target)) {
      return;
    }
    this.setState({showSuggestions: false});
  }
  handleRandomButton = (e) => {
    let randomPoke = this.props.pokeList[Math.floor(Math.random() * this.props.pokeList.length)];
    this.props.history.push(`/pokemon/${randomPoke.name}`);
    if(this.props.width <= 700) {
      const event = new KeyboardEvent("keyup",{
        "keyCode": "27"
        });
      window.dispatchEvent(event);
    }
    this.setState({
      showSuggestions: false,
      isButtonDisabled: true
    });
    setTimeout(() => {this.setState({isButtonDisabled: false})}, 1000);
  }
  ////NavSearch Methods
  handleChange = (e) => {
    if(this.state.renderDisplay !== "NavSearch") {
      this.switchDisplay("NavSearch");
    }
    this.setState({
      userInput: e.target.value, 
      showSuggestions: !e.target.value ? false : true
    });
  }
  handleKeyDown = (e) => {
    this.setState({keyPressed: e.keyCode});
  }
  resetKeyDown = (e) => {
    this.setState({keyPressed: null});
  }
  handleSearchButton = (input) => {
    let queryPar = "";
    if(this.state.renderDisplay === "NavSearch") {
      if(!this.state.userInput) {
        return;
      }
      queryPar = this.state.userInput;
      this.props.history.push(`/search?name=${queryPar}`);
      if(this.props.width <= 700) {
        const event = new KeyboardEvent("keyup",{
          "keyCode": "27"
          });
        window.dispatchEvent(event);
      }
      this.setState({
        showSuggestions: false
      });
    }
    if(this.state.renderDisplay === "NavType") {
      const {filterHistory} = this.state;
      if(!filterHistory.length) {
        return;
      }
      let queryPar = "";
      for(let i = 0; i < filterHistory.length; i++) {
        i === 0 ? queryPar = `type=${filterHistory[i]}` : queryPar += `&type=${filterHistory[i]}`;
      }
      if(this.props.width <= 700) {
        const event = new KeyboardEvent("keyup",{
          "keyCode": "27"
          });
        window.dispatchEvent(event);
      }
      this.props.history.push(`/search?${queryPar}`);
    }
  }
  handleSuggestionClick = (suggestion) => {
    if(this.props.width <= 700) {
      const event = new KeyboardEvent("keyup",{
        "keyCode": "27"
        });
      window.dispatchEvent(event);
    }
    this.setState({
      userInput: suggestion,
      showSuggestions: false
    });
  }
  ////NavType methods
  setFilterHistory = (selectedType) => {
    const {filterHistory} = this.state;
    let newArr = filterHistory.filter(type => type !== selectedType);

    if(newArr.length > 1) { //MORE THAN 2 TYPES
      newArr.shift();
      this.setState({filterHistory: [...newArr, selectedType]});
    }
    else if(newArr.length < filterHistory.length) { //SELECTED ACTIVE TYPE
      this.setState({filterHistory: [...newArr]});
    }
    else { //SELECTED NEW TYPE
      this.setState({filterHistory: [...newArr, selectedType]});
    }
  }
  ////NavGuess methods
  setPokeGuess = (poke) => {
    this.setState({pokeGuessAnswer: poke});
  }
  handleWin = (hasWon) => {
    if(hasWon) {
      let score = this.props.score === null ? 0 : this.props.score;
      this.props.setGuessScore(score + 1);
    }
    if(hasWon !== null && hasWon === false) {
      if(this.props.score > this.props.highScore || this.props.highScore === null) {
        this.props.setGuessHighScore(this.props.score);
      }
      this.props.setGuessScore(0);
    }
    this.setState({hasWon: hasWon});
  }
  ////Display Methods
  switchDisplay = (e) => {
    if(e === "NavAbout" && e === this.state.renderDisplay) {
      this.setState({
        renderDisplay: "NavSearch", 
        filterHistory: [],
        hasWon: null,
        pokeGuessAnswer: null
      });
      return;
    }
    this.setState({
      renderDisplay: e, 
      filterHistory: [],
      hasWon: null,
      pokeGuessAnswer: null
    });
  }
  handleDisplayRender = (e) => {
    switch(this.state.renderDisplay) {
      case "NavSearch":
        return (
          <NavSearch 
            userInput={this.state.userInput}
            showSuggestions={this.state.showSuggestions}
            keyPressed={this.state.keyPressed}
            resetKeyDown={this.resetKeyDown}
            handleSuggestionClick={this.handleSuggestionClick}
            handleSearchButton={this.handleSearchButton}
            pokeList={this.props.pokeList}
            pokemonTypes={this.props.pokemonTypes}
            pokeType={this.props.pokeType}
          />
        );
      case "NavType":
        return (
          <NavType 
            filterHistory={this.state.filterHistory}
            handleSearchButton={this.handleSearchButton}
            setFilterHistory={this.setFilterHistory}
            switchDisplay={this.switchDisplay}
            renderDisplay={this.state.renderDisplay}
            pokemonTypes={this.props.pokemonTypes}
          />
        );
      case "NavGuess":
        return(
          <NavGuess
            pokeList={this.props.pokeList}
            pokeGuess={this.state.pokeGuessAnswer}
            setPokeGuess={this.setPokeGuess}
            handleWin={this.handleWin}
            hasWon={this.state.hasWon}
          />
        );
      case "NavAbout":
        return(
          <NavAbout 
            switchDisplay={this.switchDisplay}
            renderDisplay={this.state.renderDisplay}
          />
        );
      case "ComingSoon":
        return(
          <ComingSoon />
        );
      default:
        return (
          <NavSearch 
            userInput={this.state.userInput}
            showSuggestions={this.state.showSuggestions}
            keyPressed={this.state.keyPressed}
            resetKeyDown={this.resetKeyDown}
            handleSuggestionClick={this.handleSuggestionClick}
            handleSearchButton={this.handleSearchButton}
            pokeList={this.props.pokeList}
            pokemonTypes={this.props.pokemonTypes}
            pokeType={this.props.pokeType}
          />
        );
    }
  }
  handleDisplayHeader = (e) => {
    switch(this.state.renderDisplay) {
      case "NavSearch":
        return "Search";
      case "NavType":
        return "Type";
      case "NavGuess":
        return "Guess Who!";
      case "NavAbout":
        return "About";
      case "ComingSoon":
        return "WIP!";
      default:
        return "Search";
    }
  }
  render() {
    let display = `${this.state.showSuggestions ? styles.search__display__on : styles.search__display__off}`;
    if(this.state.renderDisplay !== "NavSearch") {
      display = `${this.state.renderDisplay !== "NavSearch" ? styles.search__display__on : styles.search__display__off}`;
    }
    return(
      <React.Fragment>
      <div className={styles.search__header__container}>
        <h2 className={styles.search__header}>{this.handleDisplayHeader()}</h2>
      </div>
      <div className={styles.search__container}>
        <div className={styles.search__display__top__left__button}></div>
        <div className={styles.search__display__top__right__button}></div>
        <div className={styles.search__display__container} ref={this.node}>
          <div className={`${styles.search__display} ${display}`}>
            {this.handleDisplayRender()}
          </div>
          <div className={styles.search__display__controls__container}>
            <input className={styles.search__display__controls__input} 
                type="text" 
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                value={this.state.userInput}
            />
            <div className={styles.search__display__controls__button__container}>
              <button className={styles.search__display__controls__button} title="Search" onClick={this.handleSearchButton}>GO</button>
            </div>
          </div>
        </div>
        <div className={styles.search__controls__button__container}>
          <button 
            className={styles.search__controls__button} 
            title="Guess that Pokemon!" 
            onClick={() => this.state.renderDisplay === "NavGuess" ? this.switchDisplay("NavSearch") : this.switchDisplay("NavGuess")}
          >
            <i className={`fas fa-question ${styles.random__icon}`}></i>
          </button>
          <button 
            className={`${styles.search__controls__rectangle__button} ${styles.search__controls__rectangle__left}`}
            onClick={this.handleRandomButton} 
            disabled={this.state.isButtonDisabled}
          >
            Random
          </button>
          <button 
            className={`${styles.search__controls__rectangle__button} ${styles.search__controls__rectangle__right}`}
            onClick={(e) => this.switchDisplay("NavAbout")}
          >
            About
          </button>
        </div>
      </div>
      <NavOptions 
        switchDisplay={this.switchDisplay} 
        renderDisplay={this.state.renderDisplay} 
        pokeGuess={this.state.pokeGuessAnswer} 
        setPokeGuess={this.setPokeGuess}
        handleWin={this.handleWin}
        hasWon={this.state.hasWon}
        pokeList={this.props.pokeList}
        score={this.props.score}
        highScore={this.props.highScore}
      />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pokeList: state.pokemon.pokemonAll.pokeList,
    pokemonTypes: state.pokemon.types,
    pokeType: state.pokemon.types.pokeType,
    score: state.userPreferences.score,
    highScore: state.userPreferences.highScore
  };
};

export default withRouter(connect(mapStateToProps, {setGuessScore, setGuessHighScore})(NavDisplay));