import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Styles from "./index.module.css";
// import Carousel from "react-elastic-carousel";  I have deleted this npm package
import CustomButton from "../customBtn";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import IconMaleProfile from "../icons/IconDefaultMaleProfile";

const TopBuilders = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 850, itemsToShow: 1 },
    { width: 1200, itemsToShow: 3 },
  ];
  return (
    <>
      <Row className={Styles.headingRow}>
        <Col className={Styles.ourTopBuilders}>Our Top Builders</Col>
      </Row>
      <Row className={Styles.carouselOuter}>
        {/* <Carousel breakPoints={breakPoints}>
          <Col className={Styles.oneCard}>
            <Row>
              <Col className={Styles.outerCardCol}>
                <Row className={Styles.innerRow1}>
                  <div className={Styles.innerRow1Col1}>
                    <img
                      src="/icons/default-profile-picture-male-icon.svg"
                      alt="First slide"
                      width="120px"
                      height="120px"
                      className={Styles.cardImg}
                    />
                  </div>
                  <Col className={Styles.innerRow1Col2}>
                    <div>Harmanjot Singh Sidhu</div>
                    <div>Spaciality</div>
                    <div>Amritsar,Punjab,India</div>
                    <div>
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                      <BsStar />
                      <BsStar />
                    </div>
                  </Col>
                </Row>
                <Row className={Styles.innerRow2}>
                  <div className={Styles.innerRowHeading}>About</div>
                  <div className={Styles.innerRowData}>
                    this is the demo of about information and lenght should be
                    limited
                  </div>
                </Row>
                <Row className={Styles.innerRow3}>
                  <div className={Styles.innerRowHeading}>Experience</div>
                  <div className={Styles.innerRowData}>
                    5 years in specific field
                  </div>
                </Row>
                <Row className={Styles.innerRow4}>
                  <div className={Styles.innerRowHeading}>Charges</div>
                </Row>
                <Row className={Styles.innerRow5}>
                  <Col lg={7} style={{ paddingLeft: "0px" }}>
                    <CustomButton
                      text={"Request a Service"}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Col>
                  <Col lg={5}>
                    <CustomButton text={"Profile"} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className={Styles.oneCard}>
            <Row>
              <Col className={Styles.outerCardCol}>
                <Row className={Styles.innerRow1}>
                  <div className={Styles.innerRow1Col1}>
                    <img
                      src="/photos/member2.avif"
                      alt="First slide"
                      width="120px"
                      height="120px"
                      className={Styles.cardImg}
                    />
                  </div>
                  <Col className={Styles.innerRow1Col2}>
                    <div>Harmanjot Singh Sidhu</div>
                    <div>Spaciality</div>
                    <div>Amritsar,Punjab,India</div>
                    <div>
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                      <BsStar />
                      <BsStar />
                    </div>
                  </Col>
                </Row>
                <Row className={Styles.innerRow2}>
                  <div className={Styles.innerRowHeading}>About</div>
                  <div className={Styles.innerRowData}>
                    this is the demo of about information and lenght should be
                    limited
                  </div>
                </Row>
                <Row className={Styles.innerRow3}>
                  <div className={Styles.innerRowHeading}>Experience</div>
                  <div className={Styles.innerRowData}>
                    5 years in specific field
                  </div>
                </Row>
                <Row className={Styles.innerRow4}>
                  <div className={Styles.innerRowHeading}>Charges</div>
                </Row>
                <Row className={Styles.innerRow5}>
                  <Col lg={7} style={{ paddingLeft: "0px" }}>
                    <CustomButton
                      text={"Request a Service"}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Col>
                  <Col lg={5}>
                    <CustomButton text={"Profile"} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className={Styles.oneCard}>
            <Row>
              <Col className={Styles.outerCardCol}>
                <Row className={Styles.innerRow1}>
                  <div className={Styles.innerRow1Col1}>
                    <img
                      src="/photos/member3.avif"
                      alt="First slide"
                      width="120px"
                      height="120px"
                      className={Styles.cardImg}
                    />
                  </div>
                  <Col className={Styles.innerRow1Col2}>
                    <div>Harmanjot Singh Sidhu</div>
                    <div>Spaciality</div>
                    <div>Amritsar,Punjab,India</div>
                    <div>
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                      <BsStar />
                      <BsStar />
                    </div>
                  </Col>
                </Row>
                <Row className={Styles.innerRow2}>
                  <div className={Styles.innerRowHeading}>About</div>
                  <div className={Styles.innerRowData}>
                    this is the demo of about information and lenght should be
                    limited
                  </div>
                </Row>
                <Row className={Styles.innerRow3}>
                  <div className={Styles.innerRowHeading}>Experience</div>
                  <div className={Styles.innerRowData}>
                    5 years in specific field
                  </div>
                </Row>
                <Row className={Styles.innerRow4}>
                  <div className={Styles.innerRowHeading}>Charges</div>
                </Row>
                <Row className={Styles.innerRow5}>
                  <Col lg={7} style={{ paddingLeft: "0px" }}>
                    <CustomButton
                      text={"Request a Service"}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Col>
                  <Col lg={5}>
                    <CustomButton text={"Profile"} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className={Styles.oneCard}>
            <Row>
              <Col className={Styles.outerCardCol}>
                <Row className={Styles.innerRow1}>
                  <div className={Styles.innerRow1Col1}>
                    <img
                      src="/photos/member4.jpg"
                      alt="First slide"
                      width="120px"
                      height="120px"
                      className={Styles.cardImg}
                    />
                  </div>
                  <Col className={Styles.innerRow1Col2}>
                    <div>Harmanjot Singh Sidhu</div>
                    <div>Spaciality</div>
                    <div>Amritsar,Punjab,India</div>
                    <div>
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                      <BsStar />
                      <BsStar />
                    </div>
                  </Col>
                </Row>
                <Row className={Styles.innerRow2}>
                  <div className={Styles.innerRowHeading}>About</div>
                  <div className={Styles.innerRowData}>
                    this is the demo of about information and lenght should be
                    limited
                  </div>
                </Row>
                <Row className={Styles.innerRow3}>
                  <div className={Styles.innerRowHeading}>Experience</div>
                  <div className={Styles.innerRowData}>
                    5 years in specific field
                  </div>
                </Row>
                <Row className={Styles.innerRow4}>
                  <div className={Styles.innerRowHeading}>Charges</div>
                </Row>
                <Row className={Styles.innerRow5}>
                  <Col lg={7} style={{ paddingLeft: "0px" }}>
                    <CustomButton
                      text={"Request a Service"}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Col>
                  <Col lg={5}>
                    <CustomButton text={"Profile"} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className={Styles.oneCard}>
            <Row>
              <Col className={Styles.outerCardCol}>
                <Row className={Styles.innerRow1}>
                  <div className={Styles.innerRow1Col1}>
                    <img
                      src="/photos/member5.jpg"
                      alt="First slide"
                      width="120px"
                      height="120px"
                      className={Styles.cardImg}
                    />
                  </div>
                  <Col className={Styles.innerRow1Col2}>
                    <div>Harmanjot Singh Sidhu</div>
                    <div>Spaciality</div>
                    <div>Amritsar,Punjab,India</div>
                    <div>
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                      <BsStar />
                      <BsStar />
                    </div>
                  </Col>
                </Row>
                <Row className={Styles.innerRow2}>
                  <div className={Styles.innerRowHeading}>About</div>
                  <div className={Styles.innerRowData}>
                    this is the demo of about information and lenght should be
                    limited
                  </div>
                </Row>
                <Row className={Styles.innerRow3}>
                  <div className={Styles.innerRowHeading}>Experience</div>
                  <div className={Styles.innerRowData}>
                    5 years in specific field
                  </div>
                </Row>
                <Row className={Styles.innerRow4}>
                  <div className={Styles.innerRowHeading}>Charges</div>
                </Row>
                <Row className={Styles.innerRow5}>
                  <Col lg={7} style={{ paddingLeft: "0px" }}>
                    <CustomButton
                      text={"Request a Service"}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Col>
                  <Col lg={5}>
                    <CustomButton text={"Profile"} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className={Styles.oneCard}>
            <Row>
              <Col className={Styles.outerCardCol}>
                <Row className={Styles.innerRow1}>
                  <div className={Styles.innerRow1Col1}>
                    <img
                      src="/photos/member6.jpg"
                      alt="First slide"
                      width="120px"
                      height="120px"
                      className={Styles.cardImg}
                    />
                  </div>
                  <Col className={Styles.innerRow1Col2}>
                    <div>Harmanjot Singh Sidhu</div>
                    <div>Spaciality</div>
                    <div>Amritsar,Punjab,India</div>
                    <div>
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                      <BsStar />
                      <BsStar />
                    </div>
                  </Col>
                </Row>
                <Row className={Styles.innerRow2}>
                  <div className={Styles.innerRowHeading}>About</div>
                  <div className={Styles.innerRowData}>
                    this is the demo of about information and lenght should be
                    limited
                  </div>
                </Row>
                <Row className={Styles.innerRow3}>
                  <div className={Styles.innerRowHeading}>Experience</div>
                  <div className={Styles.innerRowData}>
                    5 years in specific field
                  </div>
                </Row>
                <Row className={Styles.innerRow4}>
                  <div className={Styles.innerRowHeading}>Charges</div>
                </Row>
                <Row className={Styles.innerRow5}>
                  <Col lg={7} style={{ paddingLeft: "0px" }}>
                    <CustomButton
                      text={"Request a Service"}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Col>
                  <Col lg={5}>
                    <CustomButton text={"Profile"} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Carousel> */}
      </Row>
    </>
  );
};

export default TopBuilders;
