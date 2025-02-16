import React, { useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import CustomButton from "../customBtn";
import { useDispatch } from "react-redux";
import { SELECTEDSERVICE } from "../../redux/actions/action1";
import { BsSearch } from "react-icons/bs";

const MainPhoto = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    window.scrollTo(0, 0);
    navigate("/services/service");
    dispatch(SELECTEDSERVICE(data));
  };
  return (
    <div className={styles.mainDiv}>
      <div className={styles.picture}></div>

      <div className={styles.header}>
        <div className={styles.mainHeader}>
          Find Trusted
          <span className={styles.headerSpan}>Ace</span>
          Near You
        </div>
        <h3 className={styles.subHeader}>
          Connect with qualified professionals for all your home service needs
        </h3>
        <div>
          <Form onSubmit={handleSubmit}>
            <InputGroup className={styles.inputGroup}>
              <BsSearch className={styles.searchIcon} />
              <Form.Control
                type="text"
                placeholder="Search here..."
                aria-label="Input group example"
                aria-describedby="btnGroupAddon"
                className={styles.inputField}
                value={data}
                onChange={(e) => setData(e.target.value)}
                autoFocus
              />
              <CustomButton
                text={"Search"}
                background="var(--color-primary)"
                color="white"
                customClass={styles.inputBtn}
                type="submit" // Add type="submit" to the button
              />
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default MainPhoto;
