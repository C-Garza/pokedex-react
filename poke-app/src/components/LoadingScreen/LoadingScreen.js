import React from "react";
import styles from "./LoadingScreen.module.css";

const LoadingScreen = () => {
  return(
    <React.Fragment>
      <div className={styles.pokeball__container}>
        <div className={styles.pokeball}>
          <div className={styles.pokeball__center}>
            <div className={styles.pokeball__center__light}></div>
            <div className={styles.pokeball__center__light__on}></div>
          </div>
        </div>
      </div>
      <div className={styles.heading__container}>
        <h2 className={styles.heading__header}>Loading...</h2>
      </div>
    </React.Fragment>
  );
};

export default LoadingScreen;