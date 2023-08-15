import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Col, Container, Row } from "react-bootstrap";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import CustomButton from "../customBtn";
import styles from "./index.module.css";

export const Featured = ({ heading }) => {
  const generateSlides = [
    {
      index: 1,
      src: "/icons/default-profile-picture-male-icon.svg",
      alt: "image",
    },
    {
      index: 2,
      src: "/icons/default-profile-picture-male-icon.svg",
      alt: "image",
    },
    {
      index: 3,
      src: "/icons/default-profile-picture-male-icon.svg",
      alt: "image",
    },
    {
      index: 4,
      src: "/icons/default-profile-picture-male-icon.svg",
      alt: "image",
    },
    {
      index: 5,
      src: "/icons/default-profile-picture-male-icon.svg",
      alt: "image",
    },
    {
      index: 6,
      src: "/icons/default-profile-picture-male-icon.svg",
      alt: "image",
    },
    {
      index: 7,
      src: "/icons/default-profile-picture-male-icon.svg",
      alt: "image",
    },
  ];
  const [perPage, setPerPage] = useState(3);
  // Update perPage value based on the window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPerPage(1);
      } else {
        setPerPage(3);
      }
    };
    // Initial setup on component mount
    handleResize();
    // Listen for window resize events
    window.addEventListener("resize", handleResize);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={styles.containerX}>
      <h2 className={styles.title}>{heading}</h2>

      <Splide
        className={styles.main}
        options={{
          perPage: perPage,

          rewind: false,
          gap: "1rem",
        }}
      >
        {generateSlides.map((slide, index) => (
          <SplideSlide key={index} className="customSplideSlide">
            <div className={styles.oneCard}>
              <Row>
                <Col lg={5}>
                  <img
                    src={slide.src}
                    width={150}
                    height={150}
                    className={styles.img}
                  />
                </Col>
                <Col lg={7}>
                  <div>Name</div>
                  <div>Spaciality</div>
                  <div>Address</div>
                  <div>
                    {" "}
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarHalf />
                    <BsStar />
                    <BsStar />
                  </div>
                </Col>
              </Row>
              <Row className={styles.innerDiv}>
                <h4>About</h4>
                <p>
                  {" "}
                  Hello this is about me a little bit of discriuptions helloe
                </p>
              </Row>
              <Row>
                <h4>Experience</h4>
                <p>
                  {" "}
                  Hello there I have an experience of 5 years in this this
                  industary
                </p>
              </Row>
              <Row>
                <Col className={styles.btnDiv}>
                  <CustomButton text={"Book Appointment"} />
                </Col>
                <Col className={styles.btnDiv}>
                  <CustomButton text={"Profile"} />
                </Col>
              </Row>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
