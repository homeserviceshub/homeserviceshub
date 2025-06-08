import React, { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { CHECKLOGIN } from "../../../redux/actions/actionCheckLogin";
import CheckboxDropdown from "../../../components/customDropdown/checkboxDropdown";
import { allServices } from "../../../Data/DataList";

function AceSignUp() {
  const [credField, setCredField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const id = localStorage.getItem("auth");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [number, setNumber] = useState("");
  const [postalCode, setPostalCode] = useState("143001");
  const [selectedServices, setSelectedServices] = useState([
    "ac repair",
    "painter",
  ]);
  const titlesArray = allServices.map((service) => service.title);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && id !== null && id !== "null") {
      navigate("/ace/profile", { replace: true });
    }
  }, [id, navigate]);

  function gotoSignin(e) {
    e.preventDefault();
    navigate("/ace/signin");
  }

  const handleServicesChange = (updatedOptions) => {
    setSelectedServices(updatedOptions);
    console.log("Selected Services:", updatedOptions);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      setIsSubmitting(false);
      return;
    }

    if (
      !username ||
      !password ||
      !confirmPassword ||
      !number ||
      !selectedServices.length
    ) {
      alert("Please fill all required fields!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("/api/ace/signup", {
        companyName: username,
        companyEmail: email,
        companyPassword: password,
        companyNumber: number,
        postalCode: postalCode,
        selectedServices: selectedServices,
        _id: id === "null" ? "new" : id,
      });

      if (response.data && response.data.user) {
        localStorage.setItem("aauth", response.data.user._id);
        dispatch(CHECKLOGIN(response.data.user));
        navigate("/ace/profile", { replace: true });
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    navigate(-1);
  }

  return (
    <Container fluid className={styles.containerX}>
      <Row className="justify-content-center align-items-center h-100">
        <Col md={4} className={`px-5 ${styles.containerY}`}>
          <span onClick={handleClose} className={styles.closeBtn}>
            X
          </span>
          <Form onSubmit={handleSubmit} className={styles.formDesign}>
            <Container className="p-0">
              <Row className="py-3 justify-content-center">
                <Col md={12} className={styles.headingCol}>
                  <h2>Be An Ace</h2>
                  <p>Grow your business</p>
                </Col>
                <Col md={12} className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Business Name"
                    value={username}
                    onChange={({ target: { value } }) => setUsername(value)}
                  />
                </Col>
                <Col md={12} className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Business Email Address (optional)"
                    autoComplete="off"
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                  />
                </Col>

                <Col md={12} className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Business Number"
                    value={number}
                    onChange={({ target: { value } }) => setNumber(value)}
                  />
                </Col>
                <Col md={12} className="mb-3">
                  <input
                    name="postal-code"
                    type="text"
                    className="form-control"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={({ target: { value } }) => setPostalCode(value)}
                  />
                </Col>
                <Col md={12} className="mb-3">
                  <CheckboxDropdown
                    options={titlesArray}
                    selected={selectedServices}
                    onChange={handleServicesChange}
                  />
                </Col>
                <Col md={12} className="position-relative mb-3">
                  <input
                    type={credField ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {credField ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </span>
                </Col>
                <Col md={12} className="position-relative mb-3">
                  <input
                    type={credField ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={({ target: { value } }) =>
                      setConfirmPassword(value)
                    }
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {credField ? <AiFillEye /> : <AiFillEyeInvisible />}
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
                    Already have an account?{" "}
                    <a href="#" onClick={gotoSignin}>
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
