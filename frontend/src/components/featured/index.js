import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import CustomButton from "../customBtn";
import styles from "./index.module.css";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Featured = ({ heading }) => {
  const navigate = useNavigate();
  const [perPage, setPerPage] = useState(3);
  const [viewType, setViewType] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [topAce, setTopAce] = useState([]);
  const [loginModal, setLoginModal] = useState();

  // Update perPage value based on the window width
  useEffect(() => {
    function getViewType() {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        return "1";
      } else if (screenWidth <= 1240) {
        return "2";
      } else if (screenWidth <= 1640) {
        return "2";
      } else {
        return "3";
      }
    }
    function handleScreenSizeChange() {
      const newViewType = getViewType();
      setViewType(newViewType);
    }
    // Add an event listener to monitor screen size changes
    window.addEventListener("resize", handleScreenSizeChange);
    // Initial check of the screen size
    handleScreenSizeChange();
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleScreenSizeChange);
    };
  }, []);
  useEffect(() => {
    fetchTopAce();
  }, []);
  const fetchTopAce = async () => {
    setIsLoading(true); // Set loading state
    try {
      // Await fetching geolocation data
      // const response = await axios.get("https://ipapi.co/json/");
      // const { country_name } = response.data;
      // setCountry(country_name);

      // Fetch top Ace data based on the retrieved country
      const topAceResponse = await axios.post("/api/filtertopcountryacedata", {
        country: "Amritsar",
      });
      // Check the response status
      if (topAceResponse.status === 200) {
        setTopAce(topAceResponse.data.users);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  const handleLogin = () => {
    navigate(`/signin`);
  };
  const handleFeatures = (item) => {
    const authToken = localStorage.getItem("auth");
    if (authToken) {
      navigate(`/${item._id}/servicerequest`);
    } else setLoginModal(true);
  };
  return (
    <div className={styles.containerX}>
      <h2 className={styles.title}>{heading}</h2>
      <Swiper
        slidesPerView={viewType}
        spaceBetween={30}
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className={` mySwiper ${styles.outer}`}
      >
        {topAce ? (
          topAce.map((item, index) => (
            <SwiperSlide key={index} className={styles.slideOne}>
              <div className={styles.oneCard}>
                <Row>
                  <div className={styles.imgDiv}>
                    <img
                      src={
                        item.aceData.profilePhoto &&
                        item.aceData.profilePhoto?.url?.length > 0
                          ? item.aceData.profilePhoto.url
                          : process.env.PUBLIC_URL +
                            "/icons/default-profile-picture-male-icon.svg"
                      }
                      alt="slide"
                      width={150}
                      height={150}
                      className={styles.img}
                    />
                  </div>
                  <Col className={styles.aceData}>
                    <div
                      className={styles.largerFont}
                      onClick={() => {
                        navigate(`/companyprofile/${item._id}`);
                      }}
                    >
                      {item.aceData.companyName}
                    </div>
                    <p className={styles.mediumFont}>{item.aceData.location}</p>

                    <div className={styles.stars}>
                      {[...Array(5)].map((_, index) => {
                        const rating = Number(item.aceData.overallRating);
                        const fullStars = Math.floor(rating);
                        const hasHalfStar = rating - fullStars >= 0.5;

                        return (
                          <span key={index}>
                            {index < fullStars ? (
                              <BsStarFill fill="gold" />
                            ) : index === fullStars && hasHalfStar ? (
                              <BsStarHalf fill="gold" />
                            ) : (
                              <BsStar fill="gold" />
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </Col>
                </Row>
                <Row className={styles.innerDiv}>
                  <h4>About</h4>
                  <p>
                    {`${item.aceData.brief.slice(0, 100)}${
                      item.aceData.brief.length > 100 ? "..." : ""
                    }`}
                    {item.aceData.brief.length > 100 && (
                      <Link
                        style={{ color: "green" }}
                        to={"/companyprofile/" + item._id}
                      >
                        read more
                      </Link>
                    )}
                  </p>
                </Row>
                {/* <Row>
                  <h4>Experience</h4>
                  <p>
                    Hello there I have an experience of{" "}
                    {new Date().getFullYear() -
                      item.aceData.yearOfEstablishment}{" "}
                    years and we deal in{" "}
                    {item.aceData.categories[0].slice(0, 20)},...
                    <Link
                      style={{ color: "green" }}
                      to={"/companyprofile/" + item._id}
                    >
                      see all
                    </Link>
                  </p>
                </Row> */}
                {/* <Row>
                  <Col className={styles.btnDiv}>
                    <CustomButton
                      text={"Request a service"}
                      height={"auto"}
                      onClick={() => handleFeatures("Write a Review")}
                    />
                  </Col>
                  <Col className={styles.btnDiv}>
                    <CustomButton
                      text={"Profile"}
                      height={"auto"}
                      onClick={() => navigate(`/companyprofile/${item._id}`)}
                    />
                  </Col>
                </Row> */}
              </div>
            </SwiperSlide>
          ))
        ) : (
          <>Loading...</>
        )}
      </Swiper>
      <LoginModal
        show={loginModal}
        onHide={() => setLoginModal(false)}
        handleLogin={handleLogin}
      />
    </div>
  );
};
function LoginModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login First
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Oops this feature cannot be used without being registered</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.handleLogin}>Sign Up/Login</Button>
      </Modal.Footer>
    </Modal>
  );
}
