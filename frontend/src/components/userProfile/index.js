import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomButton from "../customBtn";
import styles from "./index.module.css";
import { useState } from "react";
import { AiFillEdit, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiSave } from "react-icons/bi";

const UserProfile = () => {
  const [data, setData] = useState({
    name: "Harman Sidhu",
    number: "8054875055",
    gmail: "bestapplication@gmail.com",
    password: "HustleTime",
  });
  const [credField, setCredField] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    return setEditing(true);
  };
  const saveEdited = () => {
    return setEditing(false);
  };

  console.log(data);
  return (
    <Container className={styles.containerX}>
      <Row>
        <div className={styles.imgDiv}>
          <img
            src="/photos/member2.avif"
            width={350}
            height={350}
            className={styles.img}
          />
        </div>
      </Row>
      <div className={styles.outerDiv}>
        <div className={styles.editing}>
          <AiFillEdit
            onClick={() => {
              handleEditing();
            }}
          />
        </div>
        <Row className={styles.infoDiv}>
          <Col lg={12} className={styles.info}>
            <input
              type="text"
              disabled={!editing}
              className="form-control"
              value={data.name}
              onChange={(e) => {
                setData({
                  ...data,
                  name: e.target.value,
                });
              }}
              autoComplete="off"
            />
          </Col>
        </Row>
        <Row className={styles.infoDiv}>
          <Col md={12} className={styles.info}>
            <input
              type={credField ? "text" : "password"}
              disabled={!editing}
              className="form-control"
              value={data.password}
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
              autoComplete="off"
            />
            <span
              className={styles.floatingEye}
              onClick={() => setCredField(!credField)}
            >
              {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </Col>
        </Row>
        <Row className={styles.infoDiv}>
          <Col lg={12} className={styles.info}>
            <input
              type="text"
              disabled={!editing}
              className="form-control"
              value={data.gmail}
              onChange={(e) => {
                setData({
                  ...data,
                  gmail: e.target.value,
                });
              }}
              autoComplete="off"
            />
          </Col>
        </Row>
        <Row className={styles.infoDiv}>
          <Col lg={12} className={styles.info}>
            <input
              type="text"
              disabled={!editing}
              className="form-control"
              value={data.number}
              onChange={(e) => {
                setData({
                  ...data,
                  number: e.target.value,
                });
              }}
              autoComplete="off"
            />
          </Col>
        </Row>
        {editing ? (
          <Row className={styles.infoDivOnEditing}>
            <Col
              lg={3}
              className={styles.info}
              onClick={() => {
                saveEdited();
              }}
            >
              <CustomButton text={"SAVE"} />
            </Col>
          </Row>
        ) : (
          ""
        )}
        {/* <Row className={styles.infoDiv}>
        <Col lg={12} className={styles.info}>
          <input
            type="text"
            disabled={!editing}
            className="form-control"
            value="User's Deal History"
            // onChange={({ target: { value } }) => setEmail(value)}
            autoComplete="off"
          />
        </Col>
        <Col lg={2}><AiFillEdit/></Col>
      </Row> */}
      </div>
      <Row className={styles.infoDiv}>
        <Col lg={3} className={styles.btnDiv}>
          <CustomButton text={"LOGOUT"} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
