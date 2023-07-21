import React from "react";
import styles from "./index.module.css";

function CustomButton({ text, onClick, width }) {
  return (
    <button
      className={styles.customButton}
      onClick={onClick}
      style={{ width: width }}
    >
      {text}
    </button>
  );
}

export default CustomButton;
