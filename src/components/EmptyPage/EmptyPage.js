import React from "react";
import styles from "./EmptyPage.module.css";

class EmptyPage extends React.Component {
  componentDidMount() {
    if(document.title === "React App") {
      document.title = "404 Error!!!";
    }
  }
  render() {
    return(
      <div className={styles.container}>
        <div className={styles.error__header}>
          <h2 className={styles.header}>Woops! That shouldn't happen...</h2>
        </div>
        <div className={styles.error__content__container}>
          <p className={styles.error__content}>It seems like the page you are searching for doesn't exist.</p>
          <p className={styles.error__content}>Try another page?</p>
        </div>
      </div>
    );
  }
}

export default EmptyPage;