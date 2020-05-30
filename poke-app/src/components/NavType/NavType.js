import React from "react";
import {connect} from "react-redux";
import styles from "./NavType.module.css";

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
          onClick={this.handleTypeClick}
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
      <div className={styles.types__container}>
        <h2>TYPES</h2>
        <div className={`${styles.types__collapsible} ${styles.types__collapsible__hidden}`}>
          <h3 className={styles.types__filter__heading}>Filter by Type(s)</h3>
          <div className={styles.types__filter__container}>
            {this.renderCheckboxes(typesArr)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(NavType);