import React from "react";
import PokeListContainer from "../PokeListContainer/PokeListContainer";

class HomePage extends React.Component {
  state = {offset: 0};

  componentDidMount() {
    document.title = this.props.location.pathname = "PokeDex React";
    this.handleUpdateOffset(24);
  }
  handleUpdateOffset = (offset) => {
    this.setState({offset: offset});
  }
  render() {
    return(
      <PokeListContainer handleUpdateOffset={this.handleUpdateOffset} offset={this.state.offset} />
    );
  }
}

export default HomePage;