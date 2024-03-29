import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { CHECKLOGIN } from "../../../redux/actions/actionCheckLogin";
import axios from "axios";

function Signup() {
  const [credField, setCredField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function Forgetpassword() {
  //   navigate("/reset-password", {
  //     replace: true,
  //   });
  // }
  function handleClose() {
    navigate(-1);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:8000/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(CHECKLOGIN(true));
          navigate("/");
          console.log(response);
        }
      })
      .catch((error) => {
        console.error("AxiosError:", error);
        console.log(error);
      });

    setIsSubmitting(true);
    // dispatch(
    //   loginAction(email, password, null, () => {
    //     setIsSubmitting(false);
    //   })
    // );
  }
  return (
    <Container fluid className={styles.containerX}>
      <Row className=" justify-content-center align-items-center h-100">
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
                    placeholder="Username"
                    value={username}
                    onChange={({ target: { value } }) => setUsername(value)}
                    autoComplete="off"
                  />
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
                </Col>
                <Col md={12} className="position-relative">
                  <input
                    type={credField ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    autoComplete="off"
                    onChange={({ target: { value } }) =>
                      setConfirmPassword(value)
                    }
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
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
                      "Sign Up"
                    )}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default Signup;
