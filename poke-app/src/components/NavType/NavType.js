import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import styles from "./NavType.module.css";
import {fetchTypes} from "../../actions";

class NavType extends React.Component {
  state = {filterHistory: []};

  componentDidMount() {
    
  }
  handleTypeClick = (e) => {
    const {filterHistory} = this.state;
    let selectedType = e.currentTarget.innerText.toLowerCase();
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
  handleTypeKey = (e) => {
    if(e.keyCode !== 13 && e.keyCode !== 32) {
      return;
    }
    if(e.keyCode === 32) {
      e.preventDefault();
    }
    this.handleTypeClick(e);
  }
  handleSearchButton = (e) => {
    const {filterHistory} = this.state;
    let queryPar = "";
    for(let i = 0; i < filterHistory.length; i++) {
      i === 0 ? queryPar = `type=${filterHistory[i]}` : queryPar += `&type=${filterHistory[i]}`;
    }
    this.props.history.push(`/search?${queryPar}`);
  }
  handleToggleRow = (e) => {
    this.props.toggleRow(this.props.rowIndex);
  }
  handleToggleRowKey = (e) => {
    if(e.keyCode !== 13) {
      return;
    }
    this.props.toggleRow(this.props.rowIndex);
  }
  renderCheckboxes = (types) => {
    const {filterHistory} = this.state;
    return types.map(type => {
      let isActive = filterHistory.includes(type);
      return (
        <div 
          className={
            `${styles.types__checkbox} ${isActive ? `${styles[`types__checkbox__${type}__active`]} ${styles.active}` : styles[`types__checkbox__${type}`]}`
          }
          key={type}
          tabIndex="0"
          onClick={this.handleTypeClick}
          onKeyDown={this.handleTypeKey}
        >
          <i className={`fas fa-plus ${styles.types__filter__icon} ${isActive ? styles.hidden : ""}`}></i>
          <i className={`fas fa-minus ${styles.types__filter__icon} ${isActive ? "" : styles.hidden}`}></i>
          <span className={styles.types__filter__label}>{type}</span>
        </div>
      );
    });
  }
  render() {
    ////TO-DO: REPLACE LOCAL ARRAY WITH REDUX HELD TYPES
    const typesArr = [
      "normal", "fire", "water", "grass", "electric", "ice", "ground",
      "flying", "poison", "fighting", "psychic", "dark", "rock", "bug",
      "ghost", "steel", "dragon", "fairy"
    ];
    return(
      <div className={`${styles.types__container} ${this.props.rowClass ? styles[this.props.rowClass] : ""}`}>
        <div 
          className={`
            ${styles.types__container__header} 
            ${this.props.isOpenIndex === this.props.rowIndex ? styles.types__container__header__open : styles.types__container__header__closed}
          `} 
          onClick={this.handleToggleRow} 
          onKeyDown={this.handleToggleRowKey} 
          tabIndex="0"
        >
          <h2>TYPES</h2>
        </div>
        <div className={
          `${styles.types__collapsible}
          ${this.props.isOpenIndex === this.props.rowIndex ? styles.types__collapsible__open : styles.types__collapsible__hidden}`
        }>
          <h3 className={styles.types__filter__heading}>Filter by Type(s)</h3>
          <div className={styles.types__filter__container}>
            {this.renderCheckboxes(typesArr)}
            <button 
              className={`${styles.types__filter__button} ${styles.types__filter__search}`}
              onClick={this.handleSearchButton}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {pokemonTypes: state.pokemon.types};
};

export default withRouter(connect(mapStateToProps, {fetchTypes})(NavType));