import React from "react";
import styles from "./PokeDescription.module.css";
import {getTypesClass} from "../utils/helper-functions"

const PokeDescription = ({physicalChars = {height: "?", weight: "?"}, types, name="Loading..."}) => {
  const renderTypes = () => {
    const typesClassArr = getTypesClass(types);
    return types.map((type,i) => {
      return <p key={i} className={`${styles.desc__types__type} ${typesClassArr[i].logo}`}>{type.toUpperCase()}</p>
    });
  };
  return(
    <div className={styles.desc}>
      <h2 className={`${styles.desc__name}`}>{name}</h2>
      <div className={styles.desc__physical}>
        <p className={styles.desc__physical__trait}>HT: {physicalChars.height} m</p>
        <p className={styles.desc__physical__trait}>WT: {physicalChars.weight} kg</p>
      </div>
      <div className={styles.desc__types}>
        {types ? renderTypes() : ""}
      </div>
    </div>
  );
};

export default PokeDescription;