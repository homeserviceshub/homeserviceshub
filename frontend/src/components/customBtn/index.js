import React from "react";
import styles from "./index.module.css";

function CustomButton(props) {
  return (
    <button
      type={props.type}
      className={`${styles.customButton} ${props.customClass}`}
      onClick={props.onClick}
      style={{
        width: props.width,
        height: props.height,
        backgroundColor: props.background,
        color: props.color,
      }}
      onSubmit={props.onSubmit}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}

export default CustomButton;
