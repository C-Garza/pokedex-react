import React from "react";
import {withRouter} from "react-router-dom";

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname || 
      prevProps.location.search !== this.props.location.search) {
      window.scrollTo(0,0);
    }
  }
  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);