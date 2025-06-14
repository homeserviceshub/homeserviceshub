import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { CHECKLOGIN } from "../../../redux/actions/actionCheckLogin";
import axios from "axios";

function Signup() {
  const [step, setStep] = useState(1); // 1: form, 2: OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
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
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClose() {
    navigate(-1);
  }

  function validateFormData() {
    let validationErrors = {};
    const { username, email, number, password, confirmPassword } = formData;

    if (!username) validationErrors.username = "Username is required.";
    if (!email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email format.";
    }
    if (!number) validationErrors.number = "Phone number is required.";
    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters.";
    }
    if (!confirmPassword) {
      validationErrors.confirmPassword = "Please confirm password.";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    return validationErrors;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setServerError("");
    const validationErrors = validateFormData();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/send-otp", {
        email: formData.email,
      });

      // Expect backend to tell if email is already taken
      if (response.data.success) {
        setStep(2); // Move to OTP step
        setServerError("");
      } else {
        setServerError(response.data.message || "Could not send OTP.");
      }
    } catch (err) {
      console.error("Send OTP Error:", err);
      setServerError(
        err?.response?.data?.message || "Something went wrong sending OTP"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleOtpChange(value, index) {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);
  }

  async function handleVerifyOtp() {
    setIsSubmitting(true);
    const enteredOtp = otp.join("");

    try {
      const response = await axios.post("/api/verify-otp", {
        email: formData.email,
        otp: enteredOtp,
      });

      if (response.status === 200) {
        await handleFinalSignup();
      } else {
        setServerError("Invalid OTP");
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      setServerError("OTP verification failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleFinalSignup() {
    try {
      const response = await axios.post("/api/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        number: formData.number,
      });

      if (response.data.message === "New user created successfully.") {
        localStorage.setItem("auth", response.data.data._id);
        dispatch(CHECKLOGIN(true));
        navigate("/", { replace: true });
      } else {
        setServerError(response.data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setServerError("Signup failed");
    }
  }

  const renderOtpFields = () => (
    <Row className="my-3 justify-content-center">
      {otp.map((val, idx) => (
        <Col xs={2} key={idx}>
          <input
            type="text"
            maxLength={1}
            value={val}
            onChange={(e) => handleOtpChange(e.target.value, idx)}
            className="form-control text-center"
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container fluid className={styles.containerX}>
      <Row className="justify-content-center align-items-center h-100">
        <Col md={4} className={`p-5 ${styles.containerY}`}>
          <span onClick={handleClose} className={styles.closeBtn}>
            X
          </span>
          <div className="text-center">
            <img src="/photos/hshlogo.png" width={100} height={60} alt="logo" />
          </div>

          <Form onSubmit={handleFormSubmit} className={styles.formDesign}>
            <Container className="p-0">
              <Row className="py-3 justify-content-center">
                <Col md={12}>
                  <h2>Sign Up</h2>
                </Col>

                {step === 1 && (
                  <>
                    {[
                      "username",
                      "email",
                      "number",
                      "password",
                      "confirmPassword",
                    ].map((field, i) => (
                      <Col md={12} className="mb-3" key={i}>
                        <input
                          type={
                            field === "password" || field === "confirmPassword"
                              ? credField
                                ? "text"
                                : "password"
                              : field === "number"
                              ? "number"
                              : "text"
                          }
                          placeholder={
                            field === "confirmPassword"
                              ? "Confirm Password"
                              : field.charAt(0).toUpperCase() + field.slice(1)
                          }
                          className={`form-control ${
                            errors[field] ? "is-invalid" : ""
                          }`}
                          value={formData[field]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [field]: e.target.value,
                            })
                          }
                        />
                        {errors[field] && (
                          <div className="invalid-feedback mt-0">
                            {errors[field]}
                          </div>
                        )}
                        {serverError && field === "email" && (
                          <div className="text-danger mt-2 text-center">
                            {serverError}
                          </div>
                        )}
                        {(field === "password" ||
                          field === "confirmPassword") && (
                          <span
                            className={styles.floatingEye}
                            onClick={() => setCredField(!credField)}
                          >
                            {!credField ? (
                              <AiFillEyeInvisible />
                            ) : (
                              <AiFillEye />
                            )}
                          </span>
                        )}
                      </Col>
                    ))}

                    <Col md={12} className="text-center">
                      <Button
                        type="submit"
                        className={styles.signInLink}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Spinner animation="border" />
                        ) : (
                          "Send OTP"
                        )}
                      </Button>
                    </Col>
                  </>
                )}

                {step === 2 && (
                  <>
                    {renderOtpFields()}
                    <Col md={12} className="text-center mt-3">
                      <Button
                        onClick={handleVerifyOtp}
                        className={styles.signInLink}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Spinner animation="border" />
                        ) : (
                          "Verify OTP"
                        )}
                      </Button>
                    </Col>
                  </>
                )}

                {serverError && (
                  <Col md={12} className="text-danger mt-2 text-center">
                    {serverError}
                  </Col>
                )}
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
