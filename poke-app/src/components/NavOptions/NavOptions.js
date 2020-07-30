import React from "react";
import styles from "./NavOptions.module.css";

class NavOptions extends React.Component {
  state={activeButton: null};

  componentDidUpdate(prevProps) {
    if(this.props.renderDisplay === "NavSearch" && this.state.activeButton !== null) {
      this.setState({activeButton: null});
    }
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
  renderHeader = (e) => {
    switch(this.props.renderDisplay) {
      case "NavSearch":
        return null;
      case "NavType":
        return "Filter by Type";
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
      default:
        return null;
    }
  }
  render() {
    return(
      <div className={styles.options__contianer}>
        <div className={styles.options__header__container}>
          <h2 className={styles.options__header}>{this.renderHeader()}</h2>
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