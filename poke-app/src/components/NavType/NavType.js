import React from "react";
import styles from "./NavType.module.css";

class NavType extends React.Component {
  handleTypeClick = (e) => {
    const {setFilterHistory} = this.props;
    let selectedType = e.currentTarget.innerText.toLowerCase();

    setFilterHistory(selectedType);
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
  renderCheckboxes = (types) => {
    const {filterHistory} = this.props;
    return types.map(type => {
      let isActive = filterHistory.includes(type);
      return (
        <div 
          className={
            `${styles.types__checkbox} ${isActive ? `${styles[`types__checkbox__${type}__active`]} ${styles.active}` : styles[`types__checkbox__${type}`]}`
          }
          key={type}
          tabIndex="0"
          role="button"
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
      <div className={styles.types__filter__container}>
        {this.renderCheckboxes(typesArr)}
      </div>
    );
  }
}

export default NavType;