import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import styles from "./index.module.css";
import CustomButton from "../../components/customBtn";
import { BsSearch, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import Help from "../../components/help";
import ReviewCardComponent from "../../components/reviewCard";
import CompanyProjects from "../../components/companyProjects";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

import IconFacebook from "../../components/icons/IconFacebook";
import IconInstagram from "../../components/icons/IconInstagram";
import IconLinkedIn from "../../components/icons/IconLinkedIn";
import IconTwitter from "../../components/icons/IconTwitter";
import IconYoutube from "../../components/icons/IconYoutube";

const CompanyProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const stars = ["1", "2", "3", "4", "5"];
  const description = `Agora Design Build expertly handled two renovations flawlessly. They completed both projects on time 
  and on budget. They provided excellent service and professional installers who were on-site on time, and were respectful 
  of our home. I intend to hire them again for future projects. I have told all family and friends of this company.This 
  company expertly handled two renovations flawlessly. They completed both projects on time and on budget. They provided 
  excellent service and professional installers who were on-site on time, and were respectful of our home. I intend to 
  hire them again for future projects. I have told all family and friends of this company.
  The final results exceeded our expectations and we absolutely love our updated main bath, ensuite, and basement powder 
  room. We loved working with the Agora Design Build team and look forward to our next project. We definitely recommend.`;
  const [selectedFilter, setSelectedFilter] = useState("overview");
  const socialMedia = [
    // user can give max 8 links of social media
    { link: "https://www.facebook.com/", icon: <IconFacebook /> },
    { link: "https://www.instagram.com/", icon: <IconInstagram /> },
    { link: "https://www.linkedin.com/", icon: <IconLinkedIn /> },
    { link: "https://www.youtube.com/", icon: <IconYoutube /> },
    { link: "https://www.twitter.com/", icon: <IconTwitter /> },
  ];
  const activeTab = (e) => {
    setSelectedFilter(e.target.title);
  };

  return (
    <div className={styles.customContainer}>
      <div className={styles.companyProfileBackgroundPhoto}>
        <Container className={styles.containerX}>
          <Row className={styles.complanyProfilePhotoRow}>
            <Col lg={2} className={styles.companyProfilePhoto}>
              <img
                src="/icons/default-profile-picture-male-icon.svg"
                width={100}
                height={100}
                className={styles.profileImg}
              />
            </Col>
            <Col lg={7} className={styles.profileMainCol}>
              <Row className={styles.profileRow}>
                <Col lg={12} className={styles.companyName}>
                  Name of Company
                </Col>
                <Col lg={12} className={styles.profileCol}>
                  Location/Address
                </Col>
                <Col lg={12} className={styles.profileCol}>
                  {" "}
                  (88)Reviws
                </Col>
              </Row>
            </Col>
            <Col lg={3} className={styles.profilebtns}>
              <ScrollLink
                to="overview"
                smooth={true}
                duration={500}
                offset={-150}
              >
                <CustomButton
                  text={"ContactUs"}
                  onClick={() => setSelectedFilter("overview")}
                />
              </ScrollLink>

              <div className={styles.profilebtn}>
                <CustomButton
                  text={"Request a service"}
                  onClick={() => navigate("/servicerequest")}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={styles.backGround}>
        <Container className={styles.containerY}>
          <div className={`${styles.tabs} ${styles.borderX}`}>
            <ScrollLink
              to="overview"
              smooth={true}
              duration={500}
              offset={-150}
            >
              <div
                title="overview"
                onClick={activeTab}
                lg={1}
                className={`${styles.tab} ${
                  selectedFilter == "overview" ? styles.activeTab : ""
                }`}
              >
                Overview
              </div>
            </ScrollLink>

            <ScrollLink to="reviews" smooth={true} duration={500} offset={-150}>
              <div
                title="reviews"
                onClick={activeTab}
                lg={1}
                className={`${styles.tab} ${
                  selectedFilter == "reviews" ? styles.activeTab : ""
                }`}
              >
                Reviews
              </div>
            </ScrollLink>

            <ScrollLink to="details" smooth={true} duration={500} offset={-150}>
              <div
                title="details"
                onClick={activeTab}
                lg={1}
                className={`${styles.tab} ${
                  selectedFilter == "details" ? styles.activeTab : ""
                }`}
              >
                Details
              </div>
            </ScrollLink>

            <ScrollLink to="gallery" smooth={true} duration={500} offset={-150}>
              <div
                title="gallery"
                onClick={activeTab}
                lg={1}
                className={`${styles.tab} ${
                  selectedFilter == "gallery" ? styles.activeTab : ""
                }`}
              >
                Gallery
              </div>
            </ScrollLink>
          </div>
        </Container>
      </div>
      <Container className={styles.containerX}>
        <Row className={styles.overviewSection} id="overview">
          <Col lg={8} className={styles.overview}>
            <Row className={styles.overviewRow}>
              <Col className={`${styles.overviewCol} ${styles.borders}`}>
                Here is the breif information about out company. hello there we
                are home builder and we are professional in renovation.We are
                just a small group of 10 people and looking forward to work with
                you guys. there is no rush you can check our website rating from
                the most trusted website for home renovation and then decide
                wheather you want the best of an advice of an old friend.We are
                good in bathroom reno, kitched reno and basement renovation.
                Just fill up some details and we will reply you as soon as
                possible.
              </Col>
            </Row>
            <Row className={styles.rating}>
              <Col className={`${styles.ratingCol} ${styles.borders}`}>
                <div className={styles.ratingDiv1}>
                  <div className={styles.ratingDiv11}>
                    10k Ratings <span className={styles.spanI}>I</span>
                  </div>
                  <div className={styles.ratingDiv12}>
                    <span>
                      <BsStarFill fill="gold" />
                    </span>{" "}
                    4/5
                  </div>
                </div>
                <div className={styles.ratingDiv2}>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv211}>
                      Avenrage Rating{" "}
                      <Help
                        text={
                          "Stars are awarded based on the ratings given by other customers."
                        }
                      />
                    </div>
                    <div className={styles.ratingDiv22}>
                      <BsStarFill fill="gold" />
                      <BsStarFill fill="gold" />
                      <BsStarFill fill="gold" />
                      <BsStarFill fill="gold" />
                      <BsStarHalf fill="gold" />
                    </div>
                  </div>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv211}>
                      Reputation{" "}
                      <Help
                        text={
                          "Stars are earned through the reputation built from ratings provided by other customers."
                        }
                      />
                    </div>
                    <div>
                      <BsStarFill fill="gold" />
                      <BsStarFill fill="gold" />
                      <BsStarFill fill="gold" />
                      <BsStarHalf fill="gold" />

                      <BsStar fill="gold" />
                    </div>
                  </div>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv211}>
                      Responsiveness
                      <Help
                        text={
                          "Stars are awarded based on time taken for reply."
                        }
                      />
                    </div>
                    <div>
                      <BsStarFill fill="gold" />
                      <BsStarFill fill="gold" />
                      <BsStarFill fill="gold" />
                      <BsStarFill fill="gold" />
                      <BsStarFill fill="gold" />
                    </div>
                  </div>
                </div>
                <div className={styles.ratingDiv2}>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv221}>
                      Availability
                      <Help text={"The opening timing of the company"} />
                    </div>
                    <div className={styles.ratingDiv212}>Mon-Fri</div>
                  </div>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv221}>
                      Projects Done
                      <Help
                        text={"The total number of projects done by company"}
                      />
                    </div>
                    <div className={styles.ratingDiv212}>30</div>
                  </div>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv221}>
                      Project Ongoing
                      <Help text={"The total number of ongoing projects"} />
                    </div>
                    <div className={styles.ratingDiv212}>3</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className={`${styles.details} ${styles.borders}`}>
            Ace awards
          </Col>
          {/* <Col className={`${styles.details} ${styles.borders}`}>
            <Col lg={12} className={styles.detail}>
              <h3 className={styles.detailsHeading}>Contact Details</h3>
              <div>+91-8054875055</div>
              <div>+91-8054875055</div>
            </Col>
            <Col lg={12} className={styles.detail}>
              <h3 className={styles.detailsHeading}>Email Details</h3>
              <div>hrmnsidhu2019@gmail.com</div>
            </Col>
            <Col lg={12} className={styles.detail}>
              <h3 className={styles.detailsHeading}>Website</h3>
              <div>www.myWebsite.com</div>
            </Col>
            <Col lg={12} className={styles.detail}>
              <h3 className={styles.detailsHeading}>Social media</h3>
              <div className={styles.iconDiv}>
                {socialMedia.map((item, index) => {
                  return (
                    <div key={index} className={styles.icon}>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={item.link}
                      >
                        {item.icon}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Col> */}
        </Row>
        <Row id="reviews">
          <Col lg={12} className={styles.reviewHeading}>
            <div>Reviews</div>
            <div className={styles.writeReview}>
              <CustomButton text={"Write a Review"} />
            </div>
          </Col>
          {stars.map((item, index) => {
            return <ReviewCardComponent key={index} />;
          })}
        </Row>

        <Row className={styles.allDetails} id="details">
          <Col lg={12} className={styles.nameInDetailsInner}>
            Name of Company
          </Col>
          <Col lg={8} className={styles.overview}>
            <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Categories</div>
              <div className={styles.detailData}>
                Basement Renovation, Bathroom Renovation, General Contractors,
                Design/Build, Home Additions, Architects, Kitchen & Bathroom -
                Cabinets & Design, and Structural Engineering
              </div>
            </div>
            <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Services</div>
              <div className={styles.detailData}>
                Basement Renovation, Bathroom Renovation, Basement Finishing,
                Bathroom Remodeling, Kitchen Makeovers, Kitchen Renovation,
                Engineering, structural engineering, mechanical engineering,
                drafting services, home additions, rear additions, home
                extensions, rear extensions, marble installers, tile
                installation, ceramic tile setting, marble tile setting and most
                Interior Renovation Projects.
              </div>
            </div>
            <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Area's Served</div>
              <div className={styles.detailData}>
                Amritsar,Jalandhar,Ludhiana,Patiala,Beas,Riya
              </div>
            </div>
          </Col>
          <Col>
            <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Year of Establised</div>
              <div className={styles.detailData}>2020</div>
            </div>
            <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Payment method</div>
              <div className={styles.detailData}>Cash and Cheque</div>
            </div>
            <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Number of workers</div>
              <div className={styles.detailData}>20</div>
            </div>
            <div className={styles.detailDiv}>
              <div className={styles.detailHeading}>Written Contract</div>
              <div className={styles.detailData}>Yes</div>
            </div>
          </Col>
        </Row>
        <Row id="gallery">
          <Col className={styles.overview}>
            <CompanyProjects />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CompanyProfile;
