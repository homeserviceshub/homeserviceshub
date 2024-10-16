import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

const CheckboxDropdown = ({ onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add the selected option to the array
      setSelectedOptions((prevSelected) => [...prevSelected, value]);
    } else {
      // Remove the deselected option from the array
      setSelectedOptions((prevSelected) =>
        prevSelected.filter((option) => option !== value)
      );
    }

    if (onChange) {
      onChange(selectedOptions);
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
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "Select the Service"}
      </button>
      <div className={`${isOpen ? styles.show : ""} ${styles.dropdownMenu}`}>
        {options?.map((option) => (
          <label key={option} className={styles.dropdownItem}>
            <input
              type="checkbox"
              name="option"
              value={option}
              checked={selectedOptions.includes(option)}
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

export default CheckboxDropdown;
