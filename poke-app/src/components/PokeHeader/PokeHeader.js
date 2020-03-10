import React from "react";
import styles from "./PokeHeader.module.css";

const PokeHeader = ({name = "Pokemon", id, typeClass = "grass", extended = false}) => {
  return(
    <div className={extended ? `${styles.header__ext} ${typeClass.border}` : `${styles.header} ${typeClass.border}`}>
      <img 
        className={extended ? `${styles.header__ext__image} img-hover` : `${styles.header__image} img-hover`}
        src={id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : ""}
        alt={name}
        data-hoverable="true"
      />
    </div>
  );
};



export default PokeHeader;