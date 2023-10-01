import React, { useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import CustomButton from "../customBtn";
import { useDispatch } from "react-redux";
import { SELECTEDSERVICE } from "../../redux/actions/action1";

const MainPhoto = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  return (
    <div className={styles.mainDiv}>
      <div className={styles.picture}></div>

      <div className={styles.header}>
        You Think We
        <span className={styles.headerSpan}>Build</span>
        <h3 className={styles.subHeader}>We help to build your dreams</h3>
        <div>
          <InputGroup className={styles.inputGroup}>
            <Form.Control
              type="text"
              placeholder="Search here..."
              aria-label="Input group example"
              aria-describedby="btnGroupAddon"
              className={styles.inputField}
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <CustomButton
              text={"Search"}
              background="var(--color-primary)"
              color="white"
              customClass={styles.inputBtn}
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/services/service");
                dispatch(SELECTEDSERVICE(data));
              }}
            />
          </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default MainPhoto;
