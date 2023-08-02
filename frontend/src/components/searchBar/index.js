import React from "react";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import styles from "./index.module.css";

function SearchBar() {
  return (
    <div className={styles.outerDiv}>
      <Form.Control
        type="text"
        placeholder="Search Here"
        className={styles.searchField}
      />
      <FaSearch className={styles.searchIcon} />
    </div>
  );
}

export default SearchBar;
