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
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const [emailPhoneText, setEmailPhoneText] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClose() {
    navigate(-1);
  }

  const handleChange = (key, value) => {
    console.log(formData);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  // Function to validate form data
  function validateFormData() {
    let validationErrors = {};

    if (!formData.username) {
      validationErrors.username = "Username is required.";
    }

    if (!formData.email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email format is invalid.";
    }

    if (!formData.number) {
      validationErrors.number = "Phone number is required.";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      validationErrors.password =
        "Password must be at least 8 characters long.";
    }

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Confirm password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    return validationErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEmailPhoneText("");
    setErrors({});
    // Validate form data
    const validationErrors = validateFormData();

    // If there are validation errors, set them and do not submit the form
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);

    // Make API request to submit the form data

    axios
      .post("/api/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        number: formData.number,
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.message != "New user created successfully.") {
            setEmailPhoneText(response.data.message);
            setIsSubmitting(false);
          } else {
            console.log(response.data);
            navigate("/", {
              replace: true,
            });
            setEmailPhoneText("");
            setIsSubmitting(false);
            localStorage.setItem("auth", response.data.data._id);
            dispatch(CHECKLOGIN(true));
          }
        }
      })
      .catch((error) => {
        console.error("AxiosError:", error);
        console.log(error);
        setIsSubmitting(false);
      });
  }
  console.log(emailPhoneText);
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
                <Col md={12} className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.username ? "is-invalid" : ""
                    }`}
                    placeholder="Username"
                    value={formData.username}
                    onChange={({ target: { value } }) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        username: value,
                      }))
                    }
                    autoComplete="off"
                  />
                  {errors.username && (
                    <div className="invalid-feedback m-0">
                      {errors.username}
                    </div>
                  )}
                </Col>
                <Col md={12} className="mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={({ target: { value } }) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        email: value,
                      }))
                    }
                    autoComplete="off"
                  />
                  {errors.email && (
                    <div className="invalid-feedback mt-0">{errors.email}</div>
                  )}
                  {emailPhoneText === "email already exists" && (
                    <div className={`mt-0 ${styles.error}`}>
                      {emailPhoneText}
                    </div>
                  )}
                </Col>
                <Col md={12} className="mb-3">
                  <input
                    type="number"
                    className={`form-control ${
                      errors.number ? "is-invalid" : ""
                    }`}
                    placeholder="Phone Number"
                    value={formData.number}
                    onChange={({ target: { value } }) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        number: value,
                      }))
                    }
                    autoComplete="off"
                  />
                  {errors.number && (
                    <div className="invalid-feedback mt-0">{errors.number}</div>
                  )}

                  {emailPhoneText === "Phone number already exists" && (
                    <div className={`mt-0 ${styles.error}`}>
                      {emailPhoneText}
                    </div>
                  )}
                </Col>
                <Col md={12} className="position-relative mb-3">
                  <input
                    type={credField ? "text" : "password"}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Password"
                    value={formData.password}
                    autoComplete="off"
                    onChange={({ target: { value } }) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        password: value,
                      }))
                    }
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                  {errors.password && (
                    <div className="invalid-feedback mt-0">
                      {errors.password}
                    </div>
                  )}
                </Col>
                <Col md={12} className="position-relative mb-3">
                  <input
                    type={credField ? "text" : "password"}
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    autoComplete="off"
                    onChange={({ target: { value } }) =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        confirmPassword: value,
                      }))
                    }
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                  {errors.confirmPassword && (
                    <div className="invalid-feedback mt-0">
                      {errors.confirmPassword}
                    </div>
                  )}
                </Col>

                <Col md={12} className="text-center">
                  <Button
                    type="submit"
                    className={styles.signInLink}
                    // disabled={isSubmitting}
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
