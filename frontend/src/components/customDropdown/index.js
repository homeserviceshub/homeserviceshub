import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

const CustomeDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Avg Customer Rating");
  const options = [
    "Avg Customer Rating",
    "Ace Score",
    "Recently Reviewed",
    "Best of House Makers",
  ];
  const dropdownRef = useRef(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setIsOpen(false);
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
  //   return (
  //     <Dropdown as={ButtonGroup}>
  //       <Button variant="success">Split Button</Button>

  //       <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

  //       <Dropdown.Menu>
  //         <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
  //         <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
  //         <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  //       </Dropdown.Menu>
  //     </Dropdown>
  //   );

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
        {/* {selectedOption || " */}
        Sort By
        {/* "} */}
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

export default CustomeDropdown;
