import React from "react";
import styles from "./PokeSprites.module.css";

const PokeSprites = ({pokemon: {name, sprites, species_ext: {gender_rate}}}) => {
  //CHANCE AT FEMALE: GENDER-RATE / 0.08
  console.log(sprites);
  console.log(gender_rate);
  const getGenderWidth = (rate) => {
    if(rate === -1) {
      return;
    }
    return rate / 0.08;
  };
  let femalePercent = getGenderWidth(gender_rate);
  return(
    <div className={styles.sprites}>
      <div className={styles.sprites__header}>
        <h2 className={styles.sprites__header__heading}>Gender Sprites</h2>
        {gender_rate === -1 ?
          <div className={styles.sprites__header__unknown}>Unknown</div> 
          : <React.Fragment>
              <div className={styles.sprites__header__bar}>
                <div className={styles.sprites__header__male} style={{width: `${100 - femalePercent}%`}}></div>
                <div className={styles.sprites__header__female} style={{width: `${femalePercent}%`}}></div>
              </div>
              <div className={styles.sprites__header__bar__heading}>
                <div className={styles.sprites__header__bar__heading__male}>
                  {100 - femalePercent}%
                  <i className={`fas fa-mars ${styles.symbol}`}></i>
                </div>
                <div className={styles.sprites__header__bar__heading__female}>
                  {femalePercent}%
                  <i className={`fas fa-venus ${styles.symbol}`}></i>
                </div>
              </div>
            </React.Fragment>
        }
      </div>
      <div className={styles.sprites__sprite__container}>
        <div className={styles.sprites__sprite__males}>
          <img className={styles.sprites__sprite} src={sprites.front_default} alt={name} />
          <img className={`${styles.sprites__sprite} ${sprites.back_default ? "" : styles.sprites__no__sprite}`} src={sprites.back_default} alt={name} />
        </div>
        <div className={styles.sprites__sprite__females}>
          <img 
            className={styles.sprites__sprite} 
            src={!sprites.front_female ? sprites.front_default : sprites.front_female} 
            alt={name + " female"} 
          />
          <img 
            className={`${styles.sprites__sprite} ${sprites.back_default ? "" : styles.sprites__no__sprite}`} 
            src={!sprites.back_female ? sprites.back_default : sprites.back_female} 
            alt={name + " female"} 
          />
        </div>
      </div>
    </div>
  );
};



export default PokeSprites;