import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { ACESERVICESSELECT } from "../../redux/actions/aceServicesSelect";

const CheckboxDropdown = ({ onChange, options, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    Array.isArray(selected) ? selected : []
  );
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // Sync selectedOptions with selected prop when it changes
  useEffect(() => {
    if (Array.isArray(selected)) {
      // Only include valid options that exist in the options array
      const validSelections = selected.filter((item) => options.includes(item));
      setSelectedOptions(validSelections);
      dispatch(ACESERVICESSELECT(validSelections));
    } else {
      setSelectedOptions([]);
      dispatch(ACESERVICESSELECT([]));
    }
  }, [selected, options, dispatch]);

  const handleOptionChange = (event) => {
    const { value, checked } = event.target;
    let updatedOptions;

    if (checked) {
      // Add the selected option to the array
      updatedOptions = [...selectedOptions, value];
    } else {
      // Remove the deselected option from the array
      updatedOptions = selectedOptions.filter((option) => option !== value);
    }

    // Update state and dispatch to Redux
    setSelectedOptions(updatedOptions);
    dispatch(ACESERVICESSELECT(updatedOptions));

    // Call the parent component's onChange with the updated options
    if (onChange) {
      onChange(updatedOptions);
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
