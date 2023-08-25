import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import styles from "./index.module.css";
import AOS from "aos";

const HomePageReviews = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Container>
      <h1 className={styles.heading} data-aos="fade-up">
        Happy Home Owners
      </h1>
      <Row className={styles.allCards}>
        <Col
          className={styles.oneCard}
          lg={5}
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          {" "}
          <div className={styles.cardImgDiv}>
            <img
              src="/icons/default-profile-picture-male-icon.svg"
              alt="text"
              width="100px"
              height="100px"
              className={styles.cardImg}
            />
          </div>{" "}
          <div className={styles.review}>
            "We use them for most of our home needs. Very reliable and always
            get great results"
          </div>
          <div className={styles.reviewBy}>-Harman Sidhu(Punjab,India)</div>
          <div className={styles.rating}>
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarHalf />
            <BsStar />
          </div>
        </Col>
        <Col
          className={styles.oneCard}
          lg={5}
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          {" "}
          <div className={styles.cardImgDiv}>
            <img
              src="/icons/default-profile-picture-male-icon.svg"
              alt="text"
              width="100px"
              height="100px"
              className={styles.cardImg}
            />
          </div>{" "}
          <div className={styles.review}>
            "Picked a plumbing contractor, based on HomeStars high ratings, to
            replace an aging hot water tank...choice did not disapponit, Duke's
            Plumbing in Calgary provided me with excellent service is all ways!"
          </div>
          <div className={styles.reviewBy}>-Harman Sidhu(Punjab,India)</div>
          <div className={styles.rating}>
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarHalf />
            <BsStar />
          </div>
        </Col>
        <Col
          className={styles.oneCard}
          lg={5}
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          {" "}
          <div className={styles.cardImgDiv}>
            <img
              src="/icons/default-profile-picture-male-icon.svg"
              alt="text"
              width="100px"
              height="100px"
              className={styles.cardImg}
            />
          </div>{" "}
          <div className={styles.review}>
            "HomeStars was recommended by a friend and we definitely found a
            really helpful contractor through this website. Will absolutely be
            using HomeStars when we next need work done at home"
          </div>
          <div className={styles.reviewBy}>-Harman Sidhu(Punjab,India)</div>
          <div className={styles.rating}>
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarHalf />
            <BsStar />
          </div>
        </Col>
        <Col
          className={styles.oneCard}
          lg={5}
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          {" "}
          <div className={styles.cardImgDiv}>
            <img
              src="/icons/default-profile-picture-male-icon.svg"
              alt="text"
              width="100px"
              height="100px"
              className={styles.cardImg}
            />
          </div>{" "}
          <div className={styles.review}>
            "I used HomeStars to find a plumber to hook up a sink and install
            new taps. It was so helpful to find potential workers in my area, to
            see what kind of pricing is out there and people's experience. I
            found exactly what I wanted and he did a great job..."
          </div>
          <div className={styles.reviewBy}>-Harman Sidhu(Punjab,India)</div>
          <div className={styles.rating}>
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarHalf />
            <BsStar />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePageReviews;
