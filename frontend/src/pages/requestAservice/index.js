import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import CustomButton from "../../components/customBtn";
import RequestServiceDropdown from "../../components/customDropdown/requestServiceDropdown";

const RequestaService = () => {
  const [card2, setCard2] = useState(false);
  const [card3, setCard3] = useState(false);
  const [card4, setCard4] = useState(false);
  const timings = [
    { name: "Imidiate", lable: "imidiate" },
    { name: "Within a Week", lable: "within_a_week" },
    { name: "Within a Month", lable: "within_a_month" },
    { name: "Time is Flexible", lable: "time_is_flexible" },
  ];

  const secondCardRef = useRef(null);
  const thirdCardRef = useRef(null);
  const forthCardRef = useRef(null);

  // Step 2: Use useEffect to scroll when card states change
  useEffect(() => {
    if (card2) {
      const { top } = secondCardRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + top + -150,
        behavior: "smooth",
      });
    }
  }, [card2]);

  useEffect(() => {
    if (card3) {
      const { top } = thirdCardRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + top + -150,
        behavior: "smooth",
      });
    }
  }, [card3]);

  useEffect(() => {
    if (card4) {
      const { top } = forthCardRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + top + -150,
        behavior: "smooth",
      });
    }
  }, [card4]);

  const scrollToNextDiv = (nextCardRef) => {
    if (nextCardRef.current) {
      const { top } = nextCardRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + top + -150,
        behavior: "smooth",
      });
    }
  };

  const handleClickCard1 = (e) => {
    e.preventDefault();
    setCard2(true);
    scrollToNextDiv(secondCardRef);
  };
  const handleClickCard2 = (e) => {
    e.preventDefault();
    setCard3(true);
    scrollToNextDiv(thirdCardRef);
  };
  const handleClickCard3 = (e) => {
    e.preventDefault();
    setCard4(true);
    scrollToNextDiv(forthCardRef);
  };

  return (
    <div>
      <div className={styles.headingDiv}>
        <div className={styles.mainHeading}>
          Share the details of your exciting Bathroom Remodel project with us
        </div>
        <h5 className={styles.smallHeading}>
          Share some project details with us, and we'll find suitable
          professionals for you to compare and choose from.
        </h5>
      </div>
      <div className={styles.main} id="firstCard">
        <div className={styles.heading}>Dear user, fill your basic details</div>
        <Form onSubmit={handleClickCard1} id="firstForm">
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your Fullname" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label> Services </Form.Label>
            <RequestServiceDropdown />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter your Address" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type="text" placeholder="Enter your Postal Code" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="number" placeholder="Enter your Phone Number" />
          </Form.Group>
          <Form.Group className={styles.btn}>
            <CustomButton text={"Next"} />
          </Form.Group>
        </Form>
      </div>
      {card2 && (
        <div key={1} ref={secondCardRef} id="secondCard">
          <div className={styles.main}>
            <div className={styles.heading}>Dear user, where do you live</div>
            <div className={styles.bothIcons}>
              <div className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 305.98"
                >
                  <path d="M153.12 122.45h21.82v22.3h-21.82v-22.3zm-15.88 90.06h83.32v79.05h89.77v-136.6c0-.38.04-.74.11-1.1L179.48 58.02 45.77 153.91c.13.47.2.97.2 1.48v136.17h91.27v-79.05zm187.51 87.74c0 3.16-2.56 5.73-5.74 5.73H37.28c-3.17 0-5.74-2.57-5.74-5.73V161.36c-29.41 11.32-40.3-24.88-23.87-37.82L174.57 1.51c2.03-1.86 5.16-2.05 7.4-.3l167.26 121.77c-.01.02.62.56.68.63 19.8 21.32-1.07 49.48-25.16 38.11v138.53zm20.67-87.74h23.08v81.11h104.1V162.93c0-.43.06-.86.16-1.26l-114.6-82.19-16.82 12.31-34.56-25.16 49.24-35.85a4.904 4.904 0 0 1 6.34.26l89.84 65.68V65.21h39.1v60.1l14.13 10.33c14.03 10.9 4.85 42.16-20.46 32.41v133.02c0 2.71-2.21 4.91-4.92 4.91H344.79l.63-5.73v-87.74zm-140.75-60.33h-21.81v22.3h21.81v-22.3zm-51.55 0h21.82v22.3h-21.82v-22.3zm51.55-29.73h-21.81v22.3h21.81v-22.3z" />
                </svg>
              </div>
              <div className={styles.icon} style={{ padding: "35px" }}>
                <svg
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 122.88 106.35"
                >
                  <title>building-svg</title>
                  <path d="M35.57,103.26H26.06V88.52a1,1,0,0,0-1-1H13.09a1.06,1.06,0,0,0-1.06,1v14.74H10.34v3.09h102.2v-3.09h-1.69V88.52a1.06,1.06,0,0,0-1.06-1H97.87a1,1,0,0,0-1.05,1v14.74H74.44V82.42A1.41,1.41,0,0,0,73,81H49.75a1.41,1.41,0,0,0-1.41,1.41v20.84H32.49V32.87H3v70.39h7.39v3.09H1.41A1.41,1.41,0,0,1,0,104.94V32a2,2,0,0,1,.61-1.46h0a2,2,0,0,1,1.45-.6H32.49V2.25A2.47,2.47,0,0,1,33.21.73h0A2.45,2.45,0,0,1,35,0H87.83a2.42,2.42,0,0,1,1.74.72l.11.12a2.45,2.45,0,0,1,.63,1.63V29.92h30.5a2,2,0,0,1,1.45.6h0a2,2,0,0,1,.61,1.46v73a1.41,1.41,0,0,1-1.41,1.41h-8.93v-3.09h7.39V32.87H90.3v70.39H87.21V3.08H35.57V103.26ZM16.43,39H8.81c-.06,0-.12.08-.12.18v4.94c0,.1.06.19.12.19h7.62c.06,0,.12-.08.12-.19V39.13c0-.1-.06-.18-.12-.18Zm0,34.27H8.81c-.06,0-.12.09-.12.18v4.94c0,.09.06.19.12.19h7.62c.06,0,.12-.09.12-.19V73.4c0-.09-.06-.18-.12-.18Zm12.86,0H21.67c-.07,0-.12.09-.12.18v4.94c0,.09.05.19.12.19h7.62c.06,0,.11-.09.11-.19V73.4c0-.09,0-.18-.11-.18ZM16.43,61.79H8.81c-.06,0-.12.09-.12.19v4.94c0,.1.06.19.12.19h7.62c.06,0,.12-.08.12-.19V62c0-.11-.06-.19-.12-.19Zm0-11.42H8.81c-.06,0-.12.08-.12.19V55.5c0,.09.06.19.12.19h7.62c.06,0,.12-.09.12-.19V50.56c0-.11-.06-.19-.12-.19ZM29.29,39H21.67c-.07,0-.12.08-.12.18v4.94c0,.1.05.19.12.19h7.62c.06,0,.11-.08.11-.19V39.13c0-.1,0-.18-.11-.18Zm0,22.84H21.67c-.07,0-.12.09-.12.19v4.94c0,.1.05.19.12.19h7.62c.06,0,.11-.08.11-.19V62c0-.11,0-.19-.11-.19Zm0-11.42H21.67c-.07,0-.12.08-.12.19V55.5c0,.09.05.19.12.19h7.62c.06,0,.11-.09.11-.19V50.56c0-.11,0-.19-.11-.19ZM106.45,39h7.62c.06,0,.12.08.12.18v4.94c0,.1-.06.19-.12.19h-7.62c-.06,0-.12-.08-.12-.19V39.13c0-.1.06-.18.12-.18Zm0,34.27h7.62c.06,0,.12.09.12.18v4.94c0,.09-.06.19-.12.19h-7.62c-.06,0-.12-.09-.12-.19V73.4c0-.09.06-.18.12-.18Zm-12.86,0h7.62c.07,0,.12.09.12.18v4.94c0,.09,0,.19-.12.19H93.59c-.06,0-.11-.09-.11-.19V73.4c0-.09,0-.18.11-.18Zm12.86-11.43h7.62c.06,0,.12.09.12.19v4.94c0,.1-.06.19-.12.19h-7.62c-.06,0-.12-.08-.12-.19V62c0-.11.06-.19.12-.19Zm0-11.42h7.62c.06,0,.12.08.12.19V55.5c0,.09-.06.19-.12.19h-7.62c-.06,0-.12-.09-.12-.19V50.56c0-.11.06-.19.12-.19ZM93.59,39h7.62c.07,0,.12.08.12.18v4.94c0,.1,0,.19-.12.19H93.59c-.06,0-.11-.08-.11-.19V39.13c0-.1,0-.18.11-.18Zm0,22.84h7.62c.07,0,.12.09.12.19v4.94c0,.1,0,.19-.12.19H93.59c-.06,0-.11-.08-.11-.19V62c0-.11,0-.19.11-.19Zm0-11.42h7.62c.07,0,.12.08.12.19V55.5c0,.09,0,.19-.12.19H93.59c-.06,0-.11-.09-.11-.19V50.56c0-.11,0-.19.11-.19ZM43,10.84h8.29a.24.24,0,0,1,.24.23v8.3a.24.24,0,0,1-.24.23H43a.23.23,0,0,1-.23-.23v-8.3a.23.23,0,0,1,.23-.23Zm28.51,0h8.29a.24.24,0,0,1,.24.23v8.3a.24.24,0,0,1-.24.23H71.5a.24.24,0,0,1-.24-.23v-8.3a.24.24,0,0,1,.24-.23Zm-14.26,0h8.3a.23.23,0,0,1,.23.23v8.3a.23.23,0,0,1-.23.23h-8.3a.24.24,0,0,1-.23-.23v-8.3a.24.24,0,0,1,.23-.23ZM43,28.8h8.29a.24.24,0,0,1,.24.24v8.29a.24.24,0,0,1-.24.24H43a.23.23,0,0,1-.23-.24V29A.23.23,0,0,1,43,28.8Zm28.51,0h8.29A.24.24,0,0,1,80,29v8.29a.24.24,0,0,1-.24.24H71.5a.24.24,0,0,1-.24-.24V29a.24.24,0,0,1,.24-.24Zm-14.26,0h8.3a.23.23,0,0,1,.23.24v8.29a.23.23,0,0,1-.23.24h-8.3a.24.24,0,0,1-.23-.24V29a.24.24,0,0,1,.23-.24ZM43,64.73h8.29a.24.24,0,0,1,.24.24v8.29a.24.24,0,0,1-.24.24H43a.23.23,0,0,1-.23-.24V65a.23.23,0,0,1,.23-.24Zm28.51,0h8.29A.24.24,0,0,1,80,65v8.29a.24.24,0,0,1-.24.24H71.5a.24.24,0,0,1-.24-.24V65a.24.24,0,0,1,.24-.24Zm-14.26,0h8.3a.23.23,0,0,1,.23.24v8.29a.23.23,0,0,1-.23.24h-8.3a.24.24,0,0,1-.23-.24V65a.24.24,0,0,1,.23-.24ZM43,46.77h8.29a.24.24,0,0,1,.24.23v8.3a.23.23,0,0,1-.24.23H43a.23.23,0,0,1-.23-.23V47a.23.23,0,0,1,.23-.23Zm28.51,0h8.29A.24.24,0,0,1,80,47v8.3a.23.23,0,0,1-.24.23H71.5a.23.23,0,0,1-.24-.23V47a.24.24,0,0,1,.24-.23Zm-14.26,0h8.3a.23.23,0,0,1,.23.23v8.3a.23.23,0,0,1-.23.23h-8.3A.23.23,0,0,1,57,55.3V47a.24.24,0,0,1,.23-.23Z" />
                </svg>
              </div>
            </div>
            <div>
              <CustomButton text={"Next"} onClick={handleClickCard2} />
            </div>
          </div>
        </div>
      )}
      {card3 && (
        <div key={2} ref={thirdCardRef} id="thirdCard">
          <div className={styles.main}>
            <div className={styles.heading}>
              Dear user, Select timing in which you are comfortable
            </div>
            <div>
              {timings.map((item, index) => {
                return (
                  <div key={index} className={styles.radioDiv}>
                    <input
                      type="radio"
                      id={item.lable}
                      name="timing"
                      value={item.lable}
                      className={styles.pointer}
                    />
                    <label className={styles.pointer} htmlFor={item.lable}>
                      {item.name}
                    </label>
                  </div>
                );
              })}
            </div>
            <div>
              <CustomButton text={"Next"} onClick={handleClickCard3} />
            </div>
          </div>
        </div>
      )}
      {card4 && (
        <div key={3} ref={forthCardRef} id="forthCard">
          <div className={styles.main}>
            <div className={styles.heading}>
              Dear user, Add some specific details for Ace's understanding
            </div>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Details</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={8}
                  placeholder="Add details for better understanding of your projects..."
                />
              </Form.Group>
              <Form.Group className={styles.btn}>
                <CustomButton text={"Submit"} onClick={handleClickCard3} />
              </Form.Group>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestaService;
