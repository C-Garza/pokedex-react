import React from "react";
import styles from "./PokeDescription.module.css";

const PokeDescription = ({physicalChars}) => {
  const getTypes = () => {
    return physicalChars.types.map((type) => {
      return type.type.name;
    }).map((type,i) => {
      return <p key={i} className={styles.desc__types__type}>{type.toUpperCase()}</p>
    });
  };
  return(
    <div className={styles.desc}>
      <div className={styles.desc__physical}>
        <p className={styles.desc__physical__trait}>HT: {physicalChars.height} m</p>
        <p className={styles.desc__physical__trait}>WT: {physicalChars.weight} kg</p>
      </div>
      <div className={styles.desc__types}>
        {getTypes()}
      </div>
    </div>
  );
};

export default PokeDescription;