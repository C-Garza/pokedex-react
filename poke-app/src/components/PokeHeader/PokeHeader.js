import React from "react";
import styles from "./PokeHeader.module.css";

const PokeHeader = ({name, id}) => {
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return(
    <div className={styles.header}>
      <img 
        className={styles.header__image}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={nameCapitalized}
      />
      <h2 className={styles.header__name}>{nameCapitalized}</h2>
    </div>
  );
};

export default PokeHeader;