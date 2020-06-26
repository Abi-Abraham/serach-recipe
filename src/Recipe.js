import React from "react";
import styles from "./recipe.module.css";

function Recipe({ title, calorie, img, ingredient }) {
  return (
    <div className={styles.recipe}>
      <h1>{title}</h1>
      <ol>
        {ingredient.map((ing) => (
          <li>{ing.text}</li>
        ))}
      </ol>
      <p>{calorie}</p>
      <img src={img} alt="" />
    </div>
  );
}

export default Recipe;
