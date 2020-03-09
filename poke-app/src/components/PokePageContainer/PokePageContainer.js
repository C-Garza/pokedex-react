import React from "react";
import {connect} from "react-redux";
import styles from "./PokePageContainer.module.css";
// import PokeCard from "../PokeCard/PokeCard";
// import {fetchPokeList} from "../../actions";

class PokePageContainer extends React.Component {
  componentDidMount() {
    // this.props.fetchPokeList();
  }
  // renderCards = () => {
  //   return this.props.pokeList.map((pokemon) => {
  //     return <PokeCard key={pokemon.name} pokemon={pokemon} />;
  //   });
  // }
  render() {
    // if(!this.props.pokeList) {
    //   return <div>Loading...</div>;
    // }
    return(
      <div className={styles.container}>
        PokePage
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {pokeList: state.pokemon.pokemonAll.pokeList};
// };

export default connect(null, {})(PokePageContainer);