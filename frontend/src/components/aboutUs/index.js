import React, { useEffect } from "react";
import styles from "./index.module.css";
import { Col, Container, Row } from "react-bootstrap";
import CustomButton from "../customBtn/index";
import IconArrow from "../../components/icons/IconArrow";
import { useNavigate } from "react-router-dom";

const AboutUsComponent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const otherLinks = [
    { title: "Contact Us", url: "/contactus" },
    { title: "FAQ's", url: "/faq" },
    { title: "Careers", url: "/careers" },
  ];

  const teamData = [
    { img: "./photos/ChiefAdvisorOfficer.JPG", title: "Chief Advicer Officer" },
    { img: "./photos/ChiefAnalystOfficer.jpg", title: "Chief Analyst Officer" },
    {
      img: "./photos/ChiefEngineerOfficer.jpg",
      title: "Chief Engineer Officer",
    },
    {
      img: "./photos/ChiefMarketingOfficer.jpg",
      title: "Chief Marketing Officer",
    },
    {
      img: "./photos/ChiefTechnologyOfficer.jpg",
      title: "Chief Technology Officer",
    },
    {
      img: "./photos/ChiefInformationOfficer.jpg",
      title: "Chief Legal Advicer",
    },
    {
      img: "./icons/default-profile-picture-male-icon.svg",
      title: "Chief Security Officer",
    },
    {
      img: "./icons/default-profile-picture-male-icon.svg",
      title: "Chief Application Officer",
    },
  ];

  return (
    <div>
      <div className={styles.firstSection}>
        <Container className={styles.ontoDiv}>
          <div className={styles.heading}>About Us</div>
          <h4 className={styles.firstSectionPara}>
            HouseMakers is a complimentary platform designed to assist
            homeowners in discovering trustworthy and community-endorsed home
            service experts for all their home improvement requirements.
          </h4>
          <div className={styles.firstSectionBtn}>
            <CustomButton
              text={"Discover Now"}
              width="auto"
              onClick={() => navigate("/")}
            />
          </div>
        </Container>
      </div>

      <Row className={styles.secondSection}>
        <Col lg={6} className={styles.photoOppositeDiv}>
          <div className={styles.oppositeDivHeading}>
            We help people to get more free time to spend with their families
          </div>
          <div className={styles.oppositeDivDescription}>
            We are those people whose goal is to make your life easier. And make
            sure you get the best of the best for your home projects. Your
            hustle to find Ace near you is now our headache.
          </div>
        </Col>
        <Col
          lg={6}
          className={styles.familyPhoto}
          style={{
            background: `linear-gradient(45deg, rgba(0,0,0,0.5), rgba(0, 0, 0, 0.5)), url("./photos/familyphoto1.jpg")`,
          }}
        />
      </Row>

      <Row className={styles.thirdSection}>
        <Col lg={6} className={styles.photoOppositeDiv}>
          <div className={styles.oppositeDivHeading}>
            Join Our Platform and Reach New Heights
          </div>
          <div className={styles.oppositeDivDescription}>
            Our platform empowers professionals to elevate their businesses to
            new heights. Through our website, which hosts numerous homeowner
            projects, you can experience rapid business growth and expand your
            reach significantly.
          </div>
        </Col>
        <Col
          lg={6}
          className={styles.familyPhoto}
          style={{
            background: `linear-gradient(45deg, rgba(0,0,0,0.5), rgba(0, 0, 0, 0.5)), url("./photos/aceBackgroundPhoto.jpg")`,
          }}
        />
      </Row>

      <div className={styles.coreMembers}>
        <div className={styles.membersHeading}>Our Core Members</div>
        <div className={styles.members}>
          <div className={styles.member}>
            <img
              src={process.env.PUBLIC_URL + "/photos/ceoimage.jpg"}
              width={250}
              height={250}
              alt="CEO/Owner"
              className={styles.img}
            />
            <h3>CEO/Owner</h3>
          </div>
          <Row className={styles.otherMembers}>
            {teamData.map((item, index) => (
              <Col lg={3} className={styles.member} key={index}>
                <img
                  src={process.env.PUBLIC_URL + item.img}
                  width={200}
                  height={200}
                  alt={item.title}
                  className={styles.img}
                />
                <h4>{item.title}</h4>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <Container className={styles.forthSection}>
        <h2 className={styles.membersHeading}>More About Us</h2>
        {otherLinks.map((item, index) => (
          <div
            key={index}
            className={styles.detail}
            onClick={() => navigate(item.url)}
          >
            <div>{item.title}</div>
            <span className={styles.arrowSpan}>
              <IconArrow />
            </span>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default AboutUsComponent;
