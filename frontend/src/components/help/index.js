import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdInfo } from "react-icons/md";
import styles from "./index.module.css";

const Help = ({ text }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 20, hide: 20 }}
      overlay={renderTooltip}
    >
      <button className={styles.button}>
        <MdInfo className={styles.icon} />
      </button>
    </OverlayTrigger>
  );
};

export default Help;
