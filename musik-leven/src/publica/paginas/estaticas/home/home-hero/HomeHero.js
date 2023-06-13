import React from "react";
import styles from "./HomeHero.module.css";

function HomeHero() {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.hero__text}>
          <h1>¡Bienvenido a Music!</h1>
          <p>La red social para amantes de la música número 1 en España</p>
        </div>
      </section>
    </div>
  );
}
export default HomeHero;
