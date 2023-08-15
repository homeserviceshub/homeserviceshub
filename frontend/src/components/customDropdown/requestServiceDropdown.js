import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

const RequestServiceDropdown = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    "Bathroom Renovation",
    "Basement Renovation",
    "Kitchen Renovation",
    "Master Room Renovation",
  ];
  const dropdownRef = useRef(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsOpen(false);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={dropdownRef}
      className={`${styles.dropdown} ${isOpen ? styles.show : ""}`}
    >
      <button
        className={`${styles.btnSecondary} ${styles.dropdownToggle}`}
        // className="btn btn-secondary dropdown-toggle"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption || "Select the Service"}
      </button>
      <div
        className={`${isOpen ? styles.show : ""} ${styles.dropdownMenu}`}
        //   className={`dropdown-menu ${isOpen ? "show" : ""}`}
      >
        {options.map((option) => (
          <label
            key={option}
            className={styles.dropdownItem}
            //   className="dropdown-item"
          >
            <input
              type="radio"
              name="option"
              value={option}
              checked={option === selectedOption}
              className={styles.input}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RequestServiceDropdown;
