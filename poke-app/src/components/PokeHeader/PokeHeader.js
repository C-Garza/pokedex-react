import React from "react";
import styles from "./PokeHeader.module.css";

const PokeHeader = ({name = "Pokemon", id=null, typeClass = "grass", extended = false}) => {
  const getPokeNumber = () => {
    if(id < 10) {
      id = `00${id}`;
    }
    else if(id < 100) {
      id = `0${id}`;
    }
    return id;
  };
  return(
    <React.Fragment>
    <div className={extended ? `${styles.header__ext} ${typeClass.border}` : `${styles.header} ${typeClass.border}`}>
      <img 
        className={extended ? `${styles.header__ext__image} img-hover` : `${styles.header__image} img-hover`}
        src={id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : ""}
        alt={name}
        data-hoverable="true"
      />
    </div>
    <div className={extended ? `${styles.header__ext__id}` : `${styles.header__id}`}><span>#</span>{getPokeNumber()}</div>
    </React.Fragment>
  );
};



export default PokeHeader;