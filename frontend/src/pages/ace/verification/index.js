import React, { useState, useRef } from "react";
import { Form, Container } from "react-bootstrap";
import axios from "axios";
import styles from "./index.module.css";
import CustomButton, { CustomRedButton } from "../../../components/customBtn";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const [step, setStep] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isAce, setIsAce] = useState(false);
  const [members, setMembers] = useState("");
  const [adharFront, setAdharFront] = useState(null);
  const [adharBack, setAdharBack] = useState(null);
  const [gstNumber, setGstNumber] = useState("");
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const frontFileInputRef = useRef(null);
  const backFileInputRef = useRef(null);

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/checkacemobile", {
        mobileNumber: mobileNumber,
      });
      if (response.data.user) {
        console.log(response.data.user);
        setIsAce(true);
        setUserData(response.data.user);
      } else {
        alert("Mobile number not registered as Ace.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleMembersSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleDocumentsSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("adharFront", adharFront);
      formData.append("adharBack", adharBack);
      if (members === "team") {
        formData.append("gstNumber", gstNumber);
      }

      const response = await axios.post("/api/uploadVerification", formData);

      if (response.status === 200) {
        const updatedAceData = {
          ...userData.aceData,
          idProof: {
            AdharCard: {
              adharFront: response.data.frontFilePath,
              adharBack: response.data.backFilePath,
            },
            PhoneVerification: "done",
          },
        };
        if (members === "team") {
          updatedAceData.idProof.gstNumber = gstNumber;
        }

        await axios.post("/api/updateaceverification", {
          data: updatedAceData,
          number: mobileNumber,
        });
        setUserData({ ...userData, aceData: updatedAceData });
        setStep(4);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="text-center">Ace Verification </h2>

      {step === 0 && (
        <Form>
          <div>
            <div>
              We would clarify it before that there is ₹500 fee for
              verification. Thank You
            </div>
            <div className="d-flex justify-content-between gap-4 my-4">
              <CustomRedButton
                text={"Back to Profile"}
                width={"auto"}
                height={"auto"}
                onClick={() => {
                  navigate("/ace/profile");
                }}
              />
              <CustomButton
                customClass={"m-0"}
                text="Continue"
                onClick={() => {
                  setStep(1);
                }}
                width={"auto"}
                height={"auto"}
              />
            </div>
          </div>
        </Form>
      )}
      {step === 1 && (
        <Form>
          <Form.Group controlId="mobileNumber" className="my-4">
            <Form.Label className={`${styles.formHeading}`}>
              Mobile Number
            </Form.Label>
            <Form.Control
              type="tel"
              value={mobileNumber}
              className={styles.inputField}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </Form.Group>

          {!userData && (
            <div className="text-center">
              <CustomButton
                customClass={"m-0"}
                text="Verify Number"
                onClick={handleMobileSubmit}
                width={"auto"}
                height={"auto"}
              />
            </div>
          )}

          {userData && (
            <div>
              <div>Company Name - {userData.aceData.companyName}</div>
              <div className="d-flex justify-content-end gap-4 my-4">
                <CustomButton
                  customClass={"m-0"}
                  text="Continue"
                  onClick={() => {
                    setStep(2);
                  }}
                  width={"auto"}
                  height={"auto"}
                />
              </div>
            </div>
          )}
          <CustomRedButton
            text={"Back to Profile"}
            width={"auto"}
            height={"auto"}
            onClick={() => {
              navigate("/ace/profile");
            }}
          />
        </Form>
      )}

      {step === 2 && (
        <Form onSubmit={handleMembersSubmit}>
          <Form.Group controlId="members" className="my-4">
            <Form.Label className={`${styles.formHeading}`}>
              How many members do you have?
            </Form.Label>
            <Form.Control
              as="select"
              value={members}
              className={styles.inputField}
              onChange={(e) => setMembers(e.target.value)}
              required
            >
              <option value="" disabled>
                Select
              </option>
              <option value="individual">Individual</option>
              <option value="team">Team</option>
            </Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-end gap-4 my-4">
            <CustomRedButton
              text={"Back"}
              width={"auto"}
              height={"auto"}
              onClick={() => {
                setStep(step - 1);
              }}
            />
            <CustomButton
              customClass={"m-0"}
              text={"Continue"}
              width={"auto"}
              height={"auto"}
              type={"submit"}
            />
          </div>
        </Form>
      )}

      {step === 3 && members === "individual" && (
        <Form onSubmit={handleDocumentsSubmit}>
          <Form.Group controlId="adharFront" className="mt-2">
            <Form.Label className={`${styles.formHeading}`}>
              Adhar Card Front Photo
            </Form.Label>
            <Form.Control
              className={styles.inputField}
              type="file"
              onChange={(e) => setAdharFront(e.target.files[0])}
              required
            />
          </Form.Group>
          <Form.Group controlId="adharBack" className="mt-2">
            <Form.Label className={`${styles.formHeading}`}>
              Adhar Card Back Photo
            </Form.Label>
            <Form.Control
              className={styles.inputField}
              type="file"
              onChange={(e) => setAdharBack(e.target.files[0])}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end gap-4 my-4">
            <CustomRedButton
              text={"Back"}
              width={"auto"}
              height={"auto"}
              onClick={() => {
                setStep(step - 1);
              }}
            />
            <CustomButton
              customClass={"m-0"}
              text={"Submit"}
              width={"auto"}
              height={"auto"}
              type={"submit"}
            />
          </div>
        </Form>
      )}

      {step === 3 && members === "team" && (
        <Form onSubmit={handleDocumentsSubmit}>
          <Form.Group controlId="gstNumber" className="mt-2">
            <Form.Label className={`${styles.formHeading}`}>
              GST Number
            </Form.Label>
            <Form.Control
              className={styles.inputField}
              type="text"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="adharFront" className="mt-2">
            <Form.Label className={`${styles.formHeading}`}>
              Adhar Card Front Photo
            </Form.Label>
            <Form.Control
              className={styles.inputField}
              type="file"
              onChange={(e) => setAdharFront(e.target.files[0])}
              required
            />
          </Form.Group>
          <Form.Group controlId="adharBack" className="mt-2">
            <Form.Label className={`${styles.formHeading}`}>
              Adhar Card Back Photo
            </Form.Label>
            <Form.Control
              className={styles.inputField}
              type="file"
              onChange={(e) => setAdharBack(e.target.files[0])}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end gap-4 my-4">
            <CustomRedButton
              text={"Back"}
              width={"auto"}
              height={"auto"}
              onClick={() => {
                setStep(step - 1);
              }}
            />
            <CustomButton
              customClass={"m-0"}
              text={"Submit"}
              width={"auto"}
              height={"auto"}
              type={"submit"}
            />
          </div>
        </Form>
      )}

      {step === 4 && (
        <div className="my-5">
          <h2 className="text-center">Thank You</h2>
          <h4>
            Documents have been submitted successfully. Your profile is
            currently being processed. If further verification is required, you
            will receive a phone call. This process might take up to 2 days so
            please be patient.
          </h4>
        </div>
      )}
    </Container>
  );
};

export default Verification;
