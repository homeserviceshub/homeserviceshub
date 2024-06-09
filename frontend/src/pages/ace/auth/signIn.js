import React, { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import axios from "axios";

function AceSignIn() {
  const id = localStorage.getItem("aauth");
  const cid = localStorage.getItem("auth");
  const [credField, setCredField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [userData, setUserData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (id && cid && cid === id) {
      navigate("/ace/profile", {
        replace: true,
      });
    }
  }, []);
  function Forgetpassword() {
    navigate("/reset-password", {
      replace: true,
    });
  }

  function gotoSignUp() {
    navigate("/ace", {
      replace: true,
    });
  }

  function handleClose() {
    if (id && id !== null && id !== "null") {
      navigate(-1);
    } else navigate("/");
  }

  async function handleSubmit(e) {
    setNewUser(false);
    e.preventDefault();
    setIsSubmitting(true);
    if (userData.emailOrPhone && userData.password) {
      try {
        await axios
          .post("http://localhost:8000/checkace", {
            emailOrPhone: userData.emailOrPhone,
            password: userData.password,
          })
          .then((response) => {
            if (response.status === 200) {
              if (response.data.message) {
                setShowMessage(response.data.message);
                setIsSubmitting(false);
                setNewUser(true);
              } else {
                console.log("User Data: ", response.data);
                setNewUser(false);
                setIsSubmitting(false);
                navigate("/ace/profile");
                localStorage.setItem("aauth", response.data._id);
              }
            }
          })
          .catch((error) => {
            console.error("AxiosError:", error);
            console.log(error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  const handleInputChange = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  return (
    <Container fluid className={styles.containerX}>
      <Row className=" justify-content-center align-items-center h-100">
        <Col md={4} className={` p-5 ${styles.containerY}`}>
          <span onClick={handleClose} className={styles.closeBtn}>
            X
          </span>

          <Form onSubmit={handleSubmit} className={styles.formDesign}>
            <Container className="p-0">
              <Row className="py-3 justify-content-center">
                <Col md={12} className={styles.headingCol}>
                  <h2>Sign in</h2>
                </Col>
                <Col md={12}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                    value={userData.emailOrPhone || ""}
                    onChange={(e) =>
                      handleInputChange("emailOrPhone", e.target.value)
                    }
                    autoComplete="off"
                  />
                </Col>
                <Col md={12} className="position-relative">
                  <input
                    type={credField ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={userData.password || ""}
                    autoComplete="off"
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </Col>
                {newUser && (
                  <span className={styles.errorMessage}>{showMessage}</span>
                )}

                <Col md={12} className="text-center">
                  <Button
                    type="submit"
                    className={styles.signInLink}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Spinner
                        animation="border"
                        className={styles.signInLoader}
                      />
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <a
                    href="hhtp:google.com"
                    alt="Forget"
                    onClick={Forgetpassword}
                  >
                    Forget your Password ?
                  </a>
                  <div className={styles.lineDiv}></div>
                  <div>
                    <Button
                      type="submit"
                      className={styles.signInLink}
                      disabled={isSubmitting}
                      onClick={gotoSignUp}
                    >
                      Create New Account
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default AceSignIn;
