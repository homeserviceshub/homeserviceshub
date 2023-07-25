import React from "react";
import styles from "./index.module.css";

function CustomButton({ text, onClick, width, onSubmit }) {
  return (
    <button
      className={styles.customButton}
      onClick={onClick}
      style={{ width: width }}
      onSubmit={onSubmit}
    >
      {text}
    </button>
  );
}

export default CustomButton;
