import React from "react";
import styles from "./PokeDescriptionExtended.module.css";
import {getTypesClass} from "../utils/helper-functions"

const PokeDescription = ({physicalChars={height: "Loading", weight: "Loading", desc: "", genera: "", abilities: []}, types, name="Pokemon"}) => {
  const renderTypes = () => {
    const typesClassArr = getTypesClass(types);
    return types.map((type,i) => {
      return <p key={i} className={`${styles.desc__ext__types__type} ${typesClassArr[i].logo}`}>{type.toUpperCase()}</p>
    });
  };
  const capitalized = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  const renderAbilities = () => {
    return physicalChars.abilities.map((ability, i) => {
      return <p key={ability.ability.name} className={styles.desc__ext__physical__trait}>{capitalized(ability.ability.name)}</p>
    });
  };
  renderAbilities();
  return(
    <div className={styles.desc__ext}>
      <h2 className={styles.desc__ext__name}>{name}</h2>
      <h3 className={styles.desc__ext__genera}>{physicalChars.genera}</h3>
      <div className={styles.desc__ext__physical}>
        <div className={styles.desc__ext__physical__trait__row}>
          <div className={styles.desc__ext__physical__trait__column}>
            <p className={styles.desc__ext__physical__trait}><span className={styles.desc__ext__physical__trait__bold}>Height: </span>{physicalChars.height} m</p>
            <p className={styles.desc__ext__physical__trait}><span className={styles.desc__ext__physical__trait__bold}>Weight: </span>{physicalChars.weight} kg</p>
          </div>
          <div className={styles.desc__ext__physical__trait__column__two}>
            <p className={styles.desc__ext__physical__trait_heading}>{physicalChars.abilities.length > 1 ? "Abilities: " : "Ability: "}</p>
            <div className={styles.desc__ext__physical__trait__content}>
              {renderAbilities()}
            </div>
          </div>
        </div>
        <div className={styles.desc__ext__physical__trait__row}>
          <p className={styles.desc__ext__physical__trait}>{physicalChars.desc}</p>
        </div>
      </div>
      <div className={styles.desc__ext__types}>
        {types ? renderTypes() : ""}
      </div>
    </div>
  );
};

export default PokeDescription;