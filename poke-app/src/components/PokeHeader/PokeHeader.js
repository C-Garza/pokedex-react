import React from "react";
import styles from "./PokeHeader.module.css";

const PokeHeader = ({name = "Pokemon", id, typeClass = "grass"}) => {
  return(
    <div className={`${styles.header} ${typeClass.border}`}>
      <img 
        className={`${styles.header__image} img-hover`}
        src={id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : ""}
        alt={name}
        data-hoverable="true"
      />
    </div>
  );
};



export default PokeHeader;