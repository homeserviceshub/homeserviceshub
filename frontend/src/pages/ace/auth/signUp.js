import React, { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { CHECKLOGIN } from "../../../redux/actions/actionCheckLogin";
import RequestServiceDropdown from "../../../components/customDropdown/requestServiceDropdown";
import { allServices } from "../../../Data/DataList";
import CheckboxDropdown from "../../../components/customDropdown/checkboxDropdown";

function AceSignUp() {
  const [credField, setCredField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const id = localStorage.getItem("auth");
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [number, setNumber] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const titlesArray = allServices.map((service) => service.title);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id && id !== null && id !== "null") {
      navigate("/ace/profile", { replace: true });
    }
  }, []);
  function gotoSignin() {
    navigate("signin");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (username && email && password && confirmPassword && number) {
      axios
        .post("/api/ace/signup", {
          companyName: username,
          companyEmail: email,
          companyPassword: password,
          companyNumber: number,
          postalCode: postalCode,
          _id: id === "null" ? "new" : id,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            navigate("/ace/profile", {
              replace: true,
            });
            localStorage.setItem("aauth", response.data.user._id);
          }
        })
        .catch((error) => {
          console.error("AxiosError:", error);
          console.log(error);
        });
    }

    setIsSubmitting(true);
  }
  function handleClose() {
    navigate(-1);
  }

  return (
    <Container fluid className={styles.containerX}>
      <Row className=" justify-content-center align-items-center h-100">
        <Col md={4} className={` px-5 ${styles.containerY}`}>
          <span onClick={handleClose} className={styles.closeBtn}>
            X
          </span>
          {/* <div className="text-center">
            <img src="/photos/" alt="logox" />
          </div> */}
          <Form onSubmit={handleSubmit} className={styles.formDesign}>
            <Container className="p-0">
              <Row className="py-3 justify-content-center">
                <Col md={12} className={styles.headingCol}>
                  <h2>Be An Ace</h2>
                  <p>Grow your business</p>
                </Col>
                <Col md={12}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bussiness Name"
                    value={username}
                    onChange={({ target: { value } }) => setUsername(value)}
                    // autoComplete="off"
                  />
                </Col>
                <Col md={12}>
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Bussiness Email Address"
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                    // autoComplete="off"
                  />
                </Col>
                <Col md={12}>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Bussiness Number"
                    value={number}
                    onChange={({ target: { value } }) => setNumber(value)}
                    // autoComplete="off"
                  />
                </Col>
                <Col md={12}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={({ target: { value } }) => setPostalCode(value)}
                    // autoComplete="off"
                  />
                </Col>
                <Col md={12} className="mb-3">
                  <CheckboxDropdown
                    options={titlesArray}
                    // onChange={(selectedService) => {
                    //   setSearchData({
                    //     ...searchData,
                    //     sortedBy: selectedService,
                    //   });
                    // }}
                  />
                </Col>

                <Col md={12} className="position-relative">
                  <input
                    type={credField ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    // autoComplete="off"
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
                    // autoComplete="off"
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
                  <div>
                    Already have an account{" "}
                    <a
                      href="hhtp:google.com"
                      alt="Forggetin"
                      onClick={gotoSignin}
                    >
                      Sign In
                    </a>
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
export default AceSignUp;
