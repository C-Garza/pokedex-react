import React from "react";
import {connect} from "react-redux";
import styles from "./NavType.module.css";

class NavType extends React.Component {
  componentDidMount() {
    
  }
  render() {
    return(
      <div>NavType</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(NavType);