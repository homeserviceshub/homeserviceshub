import React, { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { CHECKLOGIN } from "../../../redux/actions/actionCheckLogin";
import axios from "axios";

function SignIn() {
  const [credField, setCredField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  function Forgetpassword() {
    navigate("/reset-password", {
      replace: true,
    });
  }
  function SignUp() {
    navigate("/signup", {
      replace: true,
    });
  }
  function handleClose() {
    navigate(-1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    axios
      .post("/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.message !== "Login successful") {
          setTimeout(function () {
            setIsSubmitting(false);
            setError(response.data.message);
          }, 1000);
        } else {
          setError(null);
          localStorage.setItem("auth", response.data.user._id);
          dispatch(CHECKLOGIN(true));
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("AxiosError:", error);
        console.log(error);
      });

    // dispatch(
    //   loginAction(email, password, null, () => {
    //     setIsSubmitting(false);
    //   })
    // );
  }
  return (
    <Container fluid className={styles.containerX}>
      <Row className=" mx-1 justify-content-center align-items-center h-100">
        <Col md={4} className={` p-5 ${styles.containerY}`}>
          <span onClick={handleClose} className={styles.closeBtn}>
            X
          </span>
          <div className="text-center">
            <img src="/photos/" alt="logox" />
          </div>
          <Form onSubmit={handleSubmit} className={styles.formDesign}>
            <Container className="p-0">
              <Row className="py-3 justify-content-center">
                <Col md={12}>
                  <h2>Sign in</h2>
                </Col>
                <Col md={12}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                    autoComplete="off"
                  />
                </Col>
                <Col md={12} className="position-relative">
                  <input
                    type={credField ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    autoComplete="off"
                    onChange={({ target: { value } }) => setPassword(value)}
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                  {error && (
                    <div className="mb-3" style={{ color: "red" }}>
                      {error}
                    </div>
                  )}
                </Col>

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

                  <div className="mt-3">
                    <a
                      href="hhtp:google.com"
                      alt="Forggetin"
                      onClick={Forgetpassword}
                    >
                      Forget your Password ?
                    </a>
                  </div>
                  <div className={styles.lineDiv}></div>
                  <div>
                    <Button
                      type="submit"
                      className={styles.signInLink}
                      disabled={isSubmitting}
                      onClick={SignUp}
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
export default SignIn;
