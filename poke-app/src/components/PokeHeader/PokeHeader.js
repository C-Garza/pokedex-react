import React, {useState, useEffect, useRef} from "react";
import styles from "./PokeHeader.module.css";

const PokeHeader = ({name = "Pokemon", id=null, typeClass = "grass", extended = false, hasEntered, isFocus, width}) => {
  const [height, setHeight] = useState(0);
  const imgContainerRef = useRef(null);

  useEffect(() => {
    setHeight(imgContainerRef.current.clientHeight - 14);
  }, [height, width]);

  const getPokeNumber = () => {
    if(id === null) {
      return "000";
    }
    if(id < 10) {
      id = `00${id}`;
    }
    else if(id < 100) {
      id = `0${id}`;
    }
    return id;
  };
  const getScale = (e) =>  {
    if(id >= 722) {
      return {transform: `scale(1.2)`};
    }
    if(id >= 650) {
      return {transform: `scale(1.5)`};
    }
    return {transform: `scale(${height / 90})`};
  };
  const getGif = (e) => {
    if(id >= 650) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`
  };
  const getPng = (e) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
  return(
    <React.Fragment>
    <div 
      className={
        extended ? `${styles.header__ext}` : `${styles.header} ${typeClass.border ? typeClass.border : styles.load__border}`
      } 
      ref={imgContainerRef}
    >
      <div 
        className={`${styles.img__container} ${hasEntered || isFocus ? `${styles.hasEntered}` : `${styles.hasLeft}`}`}
        style={hasEntered || isFocus ? getScale() : {}}
      >
      {id ?
      <img 
        className={
          `${extended ? `${styles.header__ext__image} img-hover` : `${styles.header__image} img-hover`} 
          ${hasEntered || isFocus ? styles.hidden : ""}`
        }
        src={id ? getPng() : ""}
        alt={name}
        data-hoverable="true"
      />
      : <div className={styles.loading__spinner}></div>
      }
      <img 
        className={
          `${extended ? `${styles.header__ext__image} img-hover` : `${styles.header__image} img-hover`} 
          ${hasEntered ||isFocus ? styles.img__gif : styles.img__gif__hidden}`
        }
        src={id ? hasEntered || isFocus ? getGif() : getPng() : ""}
        alt={name}
        data-hoverable="true"
        style={extended ? {display: "none"} : {}}
      />
      </div>
    </div>
    <div className={extended ? `${styles.header__ext__id}` : `${styles.header__id}`}><span>#</span>{getPokeNumber()}</div>
    </React.Fragment>
  );
};



export default PokeHeader;