import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CustomButton from "../../components/customBtn";
import styles from "./index.module.css";
import {  BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import CustomeDropdown from "../../components/customDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SELECTEDSERVICE } from "../../redux/actions/action1";

function Service() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const clickedData = useSelector((state) => {
    return state.reducer1;
  });
  console.log(clickedData, "check kr oee");
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("CategoryName");
  const [categories, setCategories] = useState([
    "Architect",
    "General Constractor",
    "Painter",
    "Project Manager",
    "Builder",
    "Demolition",
  ]);
  const dispatch = useDispatch();
  const adList = ["1", "2", "3"];
  const list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const handleClick = (e) => {
    console.log(e.target.title);
    setSelectedFilter(e.target.title);
  };
  return (
    <>
      <div className={styles.locationSectionOuter}>
        <Container className={styles.container}>
          <Row className={styles.locationSection}>
            <Col lg={3}>
              <input
                type="text"
                placeholder="e.g. Plumbing, Kitchen"
                className={styles.customInputField}
                value={clickedData}
              />
            </Col>
            <Col lg={1} className={styles.nearText}>
              near
            </Col>
            <Col lg={3}>
              <input
                type="text"
                placeholder="e.g. Punjab"
                className={styles.customInputField}
              />
            </Col>
            <Col className={styles.dropdownBtn}>
              <CustomeDropdown />
            </Col>
            <Col className={styles.searchBtn} lg={2}>
              {/* <span className={styles.searchSpan}>
                <BsSearch />
              </span> */}
              <CustomButton text={"Search"} />
            </Col>
          </Row>
        </Container>
      </div>
      <div className={styles.totalResultSectionOuter}>
        <Container className={styles.container}>
          <Row className={styles.totalResultSection}>
            <Col
              lg={3}
              title="CategoryName"
              className={`${styles.totalResultSectionCol} ${
                selectedFilter == "CategoryName" ? styles.active : ""
              }`}
              onClick={handleClick}
            >
              Category Matched(100)
            </Col>
            <Col
              title="CompanyName"
              lg={3}
              className={`${styles.totalResultSectionCol} ${
                selectedFilter == "CompanyName" ? styles.active : ""
              }`}
              onClick={handleClick}
            >
              Company Matched(0)
            </Col>
          </Row>
        </Container>
      </div>
      <div className={styles.mainDynamicSectionOuter}>
        <Container className={styles.container}>
          {selectedFilter === "CategoryName" ? (
            <Row className={styles.mainDynamicSection}>
              <Col lg={12} className={styles.dynamicHeading}>
                {clickedData}
              </Col>
              <Col lg={12} className={styles.dynamicSectionPhrase}>
                It may typically be the last reno to tackle in your home, but a
                renovated basement can be many people's favourite part of their
                home. From gyms to playrooms home theatres, the basement is
                often reserved for whatever we love doing most. Let one of our
                trusted and reviewed basement pros build the basement you've
                always dreamed of!
              </Col>
              <Col lg={12}>
                {adList.map((item, index) => {
                  return (
                    <Row className={styles.dynamicRow} key={index}>
                      <Col lg={2}>
                        {" "}
                        <img
                          src="/photos/member5.jpg"
                          width={160}
                          height={130}
                          className={styles.profilePhoto}
                        />
                      </Col>
                      <Col lg={6}>
                        <div className={styles.companyName}>Company Name</div>
                        <div className={styles.companyDetails}>
                          {" "}
                          <BsStarFill fill={"gold"} />
                          <BsStarFill fill={"gold"} />
                          <BsStarHalf fill={"gold"} />
                          <BsStar fill={"gold"} />
                          <BsStar fill={"gold"} />
                        </div>
                        <div className={styles.companySmallDetails}>
                          <div className={styles.companyDetails}>
                            (65)Reviews
                          </div>
                          <div className={styles.companyDetails}>
                            6+ Year Experience
                          </div>
                        </div>
                        <div className={styles.companyDetails}>
                          Thank you for your feedback! We greatly appreciate
                          your satisfaction with our services. We take pride in
                          delivering quality work and ensuring customer
                          satisfaction...{" "}
                          <Link style={{ color: "green" }} to="/companyprofile">
                            read more
                          </Link>
                        </div>
                      </Col>
                      <Col lg={2}>
                        <img
                          src="/photos/verified.png"
                          width={100}
                          height={100}
                          className={styles.verifyPhoto}
                        />
                      </Col>
                      <Col lg={2}>
                        <div
                          onClick={() => navigate("/servicerequest")}
                          className={styles.firstBtn}
                        >
                          <CustomButton text={"Request a service"} />
                        </div>
                        <div onClick={() => navigate("/companyprofile")}>
                          <CustomButton text={"Profile"} />
                        </div>
                      </Col>
                      <Col lg={8} className={styles.categoryList}>
                        Category-{" "}
                        {categories.map((item, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => {
                                window.scrollTo(0, 0);
                                dispatch(SELECTEDSERVICE(item));
                              }}
                              className={styles.categories}
                            >
                              {item}
                            </span>
                          );
                        })}
                      </Col>
                      <Col className={styles.adDiv}>
                        <span className={styles.ad}>Ad</span>
                      </Col>
                    </Row>
                  );
                })}
                {list.map((item, index) => {
                  return (
                    <Row className={styles.dynamicRow} key={index}>
                      <Col lg={2}>
                        {" "}
                        <img
                          src="/photos/member5.jpg"
                          width={160}
                          height={130}
                          className={styles.profilePhoto}
                        />
                      </Col>
                      <Col lg={6}>
                        <div className={styles.companyName}>Company Name</div>
                        <div className={styles.companyDetails}>
                          {" "}
                          <BsStarFill fill={"gold"} />
                          <BsStarFill fill={"gold"} />
                          <BsStarHalf fill={"gold"} />
                          <BsStar fill={"gold"} />
                          <BsStar fill={"gold"} />
                        </div>
                        <div className={styles.companySmallDetails}>
                          <div className={styles.companyDetails}>
                            (65)Reviews
                          </div>
                          <div className={styles.companyDetails}>
                            6+ Year Experience
                          </div>
                        </div>
                        <div className={styles.companyDetails}>
                          Thank you for your feedback! We greatly appreciate
                          your satisfaction with our services. We take pride in
                          delivering quality work and ensuring customer
                          satisfaction...{" "}
                          <Link style={{ color: "green" }} to="/companyprofile">
                            read more
                          </Link>
                        </div>
                      </Col>
                      <Col lg={2}>
                        <img
                          src="/photos/verified.png"
                          width={100}
                          height={100}
                          className={styles.verifyPhoto}
                        />
                      </Col>
                      <Col lg={2}>
                        <div
                          onClick={() => navigate("/servicerequest")}
                          className={styles.firstBtn}
                        >
                          <CustomButton text={"Request a service"} />
                        </div>
                        <div onClick={() => navigate("/companyprofile")}>
                          <CustomButton text={"Profile"} />
                        </div>
                      </Col>
                      <Col lg={8} className={styles.categoryList}>
                        Category-{" "}
                        {categories.map((item, index) => {
                          return (
                            <span
                              key={index}
                              onClick={() => {
                                window.scrollTo(0, 0);
                                dispatch(SELECTEDSERVICE(item));
                              }}
                              className={styles.categories}
                            >
                              {item}
                            </span>
                          );
                        })}
                      </Col>
                    </Row>
                  );
                })}
              </Col>
            </Row>
          ) : (
            <Row className={styles.mainDynamicSection}>
              <Col lg={12} className={styles.error}>
                Oops! Nothing was found for your search.Please try different
                search criteria.
              </Col>
              <Col lg={12} className={styles.errorSuggestion}>
                Did you mean: Heating & Air Conditioning, Roofing, or Windows &
                Doors Installation & Service? See all categories
              </Col>
              <h3 className={styles.errorSuggestionHeading}>
                Some suggestions:
              </h3>
              <ul className={styles.errorSuggestionList}>
                <li>Double check your spelling </li>
                <li>Try another search</li>
                <li>Add a company to our directory</li>
              </ul>
            </Row>
          )}
        </Container>
      </div>
    </>
  );
}

export default Service;
