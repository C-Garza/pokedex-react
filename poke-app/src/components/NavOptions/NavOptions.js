import React from "react";
import styles from "./NavOptions.module.css";

class NavOptions extends React.PureComponent {
  state={
    activeButton: null, 
    userGuess: null, 
    isGameOver: false,
    randomPokeList: [null,null,null,null], 
    ansPos: null
  };
  componentDidMount() {
    window.addEventListener("keyup", this.handleShortcutKeys);
  }
  componentDidUpdate(prevProps) {
    if((this.props.renderDisplay === "NavSearch" || this.props.renderDisplay === "NavGuess") && this.state.activeButton !== null) {
      this.setState({activeButton: null});
    }
    if(prevProps.renderDisplay !== this.props.renderDisplay && prevProps.renderDisplay === "NavGuess") {
      this.setState({userGuess: null, isGameOver: false});
    }
    if(prevProps.renderDisplay !== this.props.renderDisplay && this.props.renderDisplay === "NavGuess") {
      this.setState({
        randomPokeList: this.state.randomPokeList.map(poke => {
          return this.props.pokeList[Math.floor(Math.random() * this.props.pokeList.length)].name;
        }),
        ansPos: Math.floor(Math.random() * this.state.randomPokeList.length)
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleShortcutKeys);
  }
  handleClick = (option, i) => {
    if(this.state.activeButton === i) {
      this.props.switchDisplay("NavSearch");
      this.setState({activeButton: null});
      return;
    }
    if(option === "Type") {
      this.props.switchDisplay("NavType");
    }
    this.setState({activeButton: i});
  }
  handleGuessClick = (i) => {
    this.props.handleWin(i === this.state.ansPos ? true : false);
    this.setState({
      userGuess: i, 
      isGameOver: true
    });
  }
  handleShortcutKeys = (e) => {
    if((e.keyCode === 89 || e.keyCode === 78) && this.state.isGameOver) {
      this.handleNewGameClick(e.keyCode === 89 ? true : false);
    }
  }
  handleGuessKeyDown = (e,i) => {
    if(e.keyCode !== 13 && e.keyCode !== 32) {
      return;
    }
    if(e.keyCode === 32) {
      e.preventDefault();
    }
    this.props.handleWin(i === this.state.ansPos ? true : false);
    this.setState({
      userGuess: i, 
      isGameOver: true
    });
  }
  handleNewGameClick = (newGame) => {
    if(newGame) {
      this.setState({
        userGuess: null,
        isGameOver: false,
        ansPos: Math.floor(Math.random() * this.state.randomPokeList.length),
        randomPokeList: this.state.randomPokeList.map(poke => {
          return this.props.pokeList[Math.floor(Math.random() * this.props.pokeList.length)].name;
        }),
      })
    }
    else {
      this.setState({
        userGuess: null,
        isGameOver: false
      })
      this.props.switchDisplay("NavSearch");
    }
    this.props.setPokeGuess(null);
    this.props.handleWin(null);
  }
  handleNewGameKeyDown = (e, newGame) => {
    if(e.keyCode !== 13 && e.keyCode !== 32) {
      return;
    }
    if(e.keyCode === 32) {
      e.preventDefault();
    }
    if(newGame) {
      this.setState({
        userGuess: null,
        isGameOver: false,
        ansPos: Math.floor(Math.random() * this.state.randomPokeList.length),
        randomPokeList: this.state.randomPokeList.map(poke => {
          return this.props.pokeList[Math.floor(Math.random() * this.props.pokeList.length)].name;
        }),
      })
    }
    else {
      this.setState({
        userGuess: null,
        isGameOver: false
      })
      this.props.switchDisplay("NavSearch");
    }
    this.props.setPokeGuess(null);
    this.props.handleWin(null);
  }
  renderButtons = (e) => {
    let options = ["Type", "Region", "Moves"];
    let len = e - options.length;
    for(let i = 0; i < len; i++) {
      options.push("Option");
    }
    return options.map((option, i) => {
      return(
        <div 
          key={i} 
          className={`${styles.option} ${this.state.activeButton === i ? styles.option__active : ""}`} 
          tabIndex="0"
          onClick={() => this.handleClick(option, i)}
        >
          {i < options.length ? options[i] : option}
        </div>
      );
    });
  }
  renderGuessButtons = (e) => {
    const {userGuess, randomPokeList, ansPos, isGameOver} = this.state;
    const {hasWon} = this.props;
    return(
      <div className={styles.answers__container}>
        <div className={styles.score__container}>
          <p className={`${styles.score}`}>Score: {this.props.score}</p>
          <p className={`${styles.score} ${styles.highscore}`}>High Score: {this.props.highScore}</p>
        </div>
        {randomPokeList.map((ans, i) => {
          let checkAns = null;
          let wrongAns = null;
          if(hasWon) {
            checkAns = i === ansPos ? `${styles.answer__correct}` : "";
          }
          else {
            checkAns = i === ansPos ? `${styles.answer__correct}` : "";
            wrongAns = i === userGuess ? `${styles.answer__incorrect}` : "";
          }
          return (
            <div 
              key={i} 
              className={
                `${hasWon === null ? styles.answer : styles.answer__final}
                ${userGuess === null ? "" : checkAns}
                ${hasWon !== null && hasWon === false ? wrongAns : ""}`
              } 
              onClick={userGuess !== null ? null : () => {this.handleGuessClick(i)}}
              onKeyDown={userGuess !== null ? null : (e) => {this.handleGuessKeyDown(e,i)}}
              tabIndex="0"
            >
              <p className={styles.answer__text}>{ansPos === i ? this.props.pokeGuess : randomPokeList[i]}</p>
            </div>
          );
        })}
        <div className={`${styles.results__container} ${isGameOver ? "" : styles.hidden}`}>
          <p className={styles.results}>
            Play Again?
            <span 
              className={styles.results__yes}
              onClick={() => {this.handleNewGameClick(true)}}
              onKeyDown={(e) => {this.handleNewGameKeyDown(e, true)}}
              tabIndex="0"
            > Y
            </span> / <span 
              className={styles.results__no} 
              onClick={() => {this.handleNewGameClick(false)}} 
              onKeyDown={(e) => {this.handleNewGameKeyDown(e, false)}} 
              tabIndex="0"
            >N</span>
          </p>
        </div>
      </div>
    );
  }
  renderHeader = (e) => {
    switch(this.props.renderDisplay) {
      case "NavSearch":
        return null;
      case "NavType":
        return "Filter by Type";
      case "NavGuess":
        return "Guess That Pokemon!";
      default:
        return null;
    }
  }
  renderHeaderDesc = (e) => {
    switch(this.props.renderDisplay) {
      case "NavSearch":
        return null;
      case "NavType":
        return "Filters pokemon by selecting one or two types they have.";
      case "NavGuess":
        return this.renderGuessButtons();
      default:
        return null;
    }
  }
  render() {
    let guessHeader = this.props.renderDisplay === "NavGuess" ? styles.guess__header : "";
    return(
      <div className={styles.options__contianer}>
        <div className={styles.options__header__container}>
          <h2 className={`${styles.options__header} ${guessHeader}`}>{this.renderHeader()}</h2>
          <div className={styles.options__header__desc}>{this.renderHeaderDesc()}</div>
        </div>
        <div className={styles.options__buttons__container}>
          {this.renderButtons(10)}
        </div>
      </div>
    )
  }
}

export default NavOptions;