import React from "react";
import styles from "./PokeCardExtended.module.css";
import PokeHeader from "../PokeHeader/PokeHeader";
import PokeDescriptionExtended from "../PokeDescriptionExtended/PokeDescriptionExtended";
import {getTypesClass} from "../utils/helper-functions"

class PokeCardExtended extends React.Component {
  getPhysicalChars = () => {
    let englishDesc = this.props.pokemonStats.species_ext.flavor_text_entries.find(text => {
      return text.language.name === "en" && (text.version.name === "ultra-sun" || text.version.name === "omega-ruby");
    });
    let englishGenera = this.props.pokemonStats.species_ext.genera.find(text => {
      return text.language.name === "en";
    });
    return {
      height: this.props.pokemonStats.height / 10,
      weight: this.props.pokemonStats.weight / 10,
      desc: englishDesc.flavor_text,
      genera: englishGenera.genus,
      abilities: this.props.pokemonStats.abilities
    }
  }
  getTypes = () => {
    let arr = this.props.pokemonStats.types.sort((a,b) => {
      return a.slot - b.slot;
    }).map(type => {
      return type.type.name;
    });
    return arr;
  }
  render() {
    if(!this.props.pokemonStats) {
      return(
        <div className={styles.card}>
          <PokeHeader />
          <PokeDescriptionExtended />
        </div>
      );
    }
    const nameCapitalized = this.props.pokemonStats.species.name.charAt(0).toUpperCase() + this.props.pokemonStats.species.name.slice(1);
    const physicalChars = this.getPhysicalChars();
    const types = this.getTypes();
    let typesClassArr = getTypesClass(types);
    const cardClasses = `${styles.card} ${typesClassArr[0].card}`
    return(
      <div className={cardClasses}>
        <PokeHeader id={this.props.pokemonStats.id} name={nameCapitalized} typeClass={typesClassArr[0]} extended={true} />
        <PokeDescriptionExtended physicalChars={physicalChars} types={types} name={nameCapitalized} />
      </div>
    );
  }
}

export default PokeCardExtended;