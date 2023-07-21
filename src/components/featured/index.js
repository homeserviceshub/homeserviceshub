import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Col, Container, Row } from "react-bootstrap";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import CustomButton from "../customBtn";
import styles from "./index.module.css";

export const Featured = ({ heading }) => {
  const generateSlides = [
    { index: 1, src: "/photos/member1.avif", alt: "image" },
    { index: 2, src: "/photos/member2.avif", alt: "image" },
    { index: 3, src: "/photos/member3.avif", alt: "image" },
    { index: 4, src: "/photos/member4.jpg", alt: "image" },
    { index: 5, src: "/photos/member5.jpg", alt: "image" },
    { index: 6, src: "/photos/member6.jpg", alt: "image" },
    { index: 7, src: "/photos/member4.jpg", alt: "image" },
  ];
  return (
    <Container>
      <h2 className={styles.title}>{heading}</h2>

      <Splide
        options={{
          perPage: 3,
          height: "26rem",
          rewind: false,
          gap: "1rem",
        }}
      >
        {generateSlides.map((slide) => (
          <SplideSlide key={slide.src} className="customSplideSlide">
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
                  <div>Stars</div>
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
              <Row className={styles.btnDiv}>
                <Col>
                  <CustomButton text={"Book Appointment"} />
                </Col>
                <Col>
                  <CustomButton text={"Profile"} />
                </Col>
              </Row>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </Container>
  );
};
