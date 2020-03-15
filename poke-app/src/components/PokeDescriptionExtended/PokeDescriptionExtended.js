import React from "react";
import styles from "./PokeDescriptionExtended.module.css";
import {getTypesClass} from "../utils/helper-functions"

const PokeDescription = ({physicalChars={height: "Loading", weight: "Loading", desc: "", genera: ""}, types, name="Pokemon"}) => {
  const renderTypes = () => {
    const typesClassArr = getTypesClass(types);
    return types.map((type,i) => {
      return <p key={i} className={`${styles.desc__ext__types__type} ${typesClassArr[i].logo}`}>{type.toUpperCase()}</p>
    });
  };
  return(
    <div className={styles.desc__ext}>
      <h2 className={styles.desc__ext__name}>{name}</h2>
      <h3 className={styles.desc__ext__genera}>{physicalChars.genera}</h3>
      <div className={styles.desc__ext__physical}>
        <p className={styles.desc__ext__physical__trait}><span className={styles.desc__ext__physical__trait__bold}>Height: </span>{physicalChars.height} m</p>
        <p className={styles.desc__ext__physical__trait}><span className={styles.desc__ext__physical__trait__bold}>Weight: </span>{physicalChars.weight} kg</p>
        <p className={styles.desc__ext__physical__trait}>{physicalChars.desc}</p>
      </div>
      <div className={styles.desc__ext__types}>
        {types ? renderTypes() : ""}
      </div>
    </div>
  );
};

export default PokeDescription;