import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import styles from "./index.module.css";
import CustomButton from "../../components/customBtn";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import Help from "../../components/help";
import ReviewCardComponent from "../../components/reviewCard";
import CompanyProjects from "../../components/companyProjects";
import { useNavigate, useParams } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import AOS from "aos";
import { GetUserData } from "../../redux/actions/actionGetUserData";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import { Fullscreen, Video, Zoom } from "yet-another-react-lightbox/plugins";

const CompanyProfile = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  console.log(id);
  const [usersAceData, setUsersAceData] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [bookmark, setbookmark] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginModal, setLoginModal] = useState();

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    AOS.init();
    if (id) {
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    try {
      // Fetch reviews data
      const reviewsResponse = await axios.post("/api/getreviews", {
        id: id,
      });
      if (reviewsResponse.status === 200) {
        if (reviewsResponse.data.message) {
          console.log(reviewsResponse.data.message);
        } else {
          console.log("Reviews data: ", reviewsResponse.data);
          setReviews(reviewsResponse.data);
        }
      }
      // Fetch user data
      const userResponse = await axios.post("/api/userdata", {
        _id: id,
      });
      if (userResponse.status === 200) {
        console.log(userResponse.data[0]);
        setUsersAceData(userResponse.data[0].aceData);
      }

      // Check bookmark status
      const bookmarkResponse = await axios.post("/api/checkbookmark", {
        clientID: id,
        customerID: localStorage.getItem("auth"),
      });
      if (bookmarkResponse.status === 200) {
        setbookmark(bookmarkResponse.data.message ? false : true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Set loading state to false once all requests are completed
      setIsLoading(false);
    }
  };

  console.log(reviews);
  const navigate = useNavigate();
  const stars = ["1", "2", "3", "4", "5"];
  const [selectedFilter, setSelectedFilter] = useState("overview");

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowFullScreen(true);
    // setIsLoading(true);
  };
  const bookmarkClicked = () => {
    // setbookmark(!bookmark);
    try {
      axios
        .post("/api/updatebookmark", {
          clientID: id,
          customerID: localStorage.getItem("auth"),
        })
        .then((response) => {
          if (response.status === 200) {
            setbookmark(
              response.data.message === "Bookmark added successfully"
                ? true
                : false
            );
          }
        })
        .catch((error) => {
          console.error("AxiosError:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const activeTab = (e) => {
    setSelectedFilter(e.target.title);
  };
  const handleLogin = () => {
    navigate(`/signin`);
  };
  const handleFeatures = (feature) => {
    const authToken = localStorage.getItem("auth");
    if (authToken) {
      if (feature === "Write a Review") {
        navigate(`/review/${id}/new`);
      } else if (feature === "Request a Service") {
        navigate(`/${id}/servicerequest`);
      } else bookmarkClicked();
    } else setLoginModal(true);
  };

  return (
    <>
      {console.log(usersAceData)}
      {usersAceData?.companyName && !isLoading ? (
        <div className={styles.customContainer}>
          <div className={styles.companyProfileBackgroundPhoto}>
            <Container className={styles.containerX}>
              <Row className={styles.complanyProfilePhotoRow}>
                <Col lg={2} className={styles.companyProfilePhoto}>
                  {usersAceData?.profilePhoto ? (
                    <img
                      src={`/images/${usersAceData.profilePhoto.path}`}
                      alt="Selected"
                      width={"350px"}
                      height={"350px"}
                      className={styles.profileImg}
                    />
                  ) : (
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/icons/default-profile-picture-male-icon.svg"
                      }
                      width={100}
                      height={100}
                      className={styles.profileImg}
                    />
                  )}
                </Col>
                <Col lg={7} className={styles.profileMainCol}>
                  <Row className={styles.profileRow}>
                    <Col lg={12} className={styles.companyName}>
                      {usersAceData.companyName
                        ? usersAceData.companyName
                        : "Name of Company"}
                    </Col>
                    <Col lg={12} className={styles.profileCol}>
                      {usersAceData?.location
                        ? usersAceData?.location
                        : "Location/Address"}
                    </Col>
                    <Col lg={12} className={styles.profileCol}>
                      {" "}
                      ({usersAceData?.totalReviews})Reviews
                    </Col>
                  </Row>
                </Col>
                <Col lg={3} className={styles.profilebtns}>
                  <ScrollLink
                    to="reviews"
                    smooth={true}
                    duration={500}
                    offset={-150}
                  >
                    <CustomButton
                      text={"Write a Review"}
                      onClick={() => handleFeatures("Write a Review")}
                    />
                  </ScrollLink>

                  <div className={styles.profilebtn}>
                    <CustomButton
                      text={"Request a service"}
                      onClick={() => handleFeatures("Request a Service")}
                    />
                  </div>
                  <div className={styles.profilebtn}>
                    <CustomButton
                      text={
                        bookmark ? "Remove from bookmark" : "Add to bookmark"
                      }
                      onClick={() => handleFeatures("Bookmark")}
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
                      selectedFilter === "overview" ? styles.activeTab : ""
                    }`}
                  >
                    Overview
                  </div>
                </ScrollLink>

                <ScrollLink
                  to="reviews"
                  smooth={true}
                  duration={500}
                  offset={-150}
                >
                  <div
                    title="reviews"
                    onClick={activeTab}
                    lg={1}
                    className={`${styles.tab} ${
                      selectedFilter === "reviews" ? styles.activeTab : ""
                    }`}
                  >
                    Reviews
                  </div>
                </ScrollLink>

                <ScrollLink
                  to="details"
                  smooth={true}
                  duration={500}
                  offset={-150}
                >
                  <div
                    title="details"
                    onClick={activeTab}
                    lg={1}
                    className={`${styles.tab} ${
                      selectedFilter === "details" ? styles.activeTab : ""
                    }`}
                  >
                    Details
                  </div>
                </ScrollLink>

                <ScrollLink
                  to="gallery"
                  smooth={true}
                  duration={500}
                  offset={-150}
                >
                  <div
                    title="gallery"
                    onClick={activeTab}
                    lg={1}
                    className={`${styles.tab} ${
                      selectedFilter === "gallery" ? styles.activeTab : ""
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
                <Row className="m-0" data-aos="zoom-in">
                  <Col className={`${styles.overviewCol} ${styles.borders}`}>
                    {usersAceData?.brief}
                  </Col>
                </Row>
                <Row className="m-0" data-aos="zoom-in">
                  <Col className={`${styles.ratingCol} ${styles.borders}`}>
                    <div className={styles.ratingDiv1}>
                      <div className={styles.ratingDiv11}>Overall Ratings</div>
                      <div className={styles.ratingDiv12}>
                        <span>
                          <BsStarFill fill="gold" />
                        </span>{" "}
                        {Math.floor(usersAceData?.overallRating)}/5
                      </div>
                    </div>
                    <div className={styles.ratingDiv2}>
                      <div className={styles.ratingDiv21}>
                        <div className={styles.ratingDiv211}>
                          Reviews Rating{" "}
                          <Help
                            text={
                              "Stars on the basis of average of all reviews given by users."
                            }
                          />
                        </div>
                        <div className={styles.allStars}>
                          {[...Array(5)].map((_, index) => {
                            const rating = Number(usersAceData?.avgRating);
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
                      </div>
                      <div className={styles.ratingDiv21}>
                        <div className={styles.ratingDiv211}>
                          Reputation{" "}
                          <Help
                            text={
                              "Stars on the basis of acceptance rate of projects"
                            }
                          />
                        </div>
                        <div className={styles.allStars}>
                          {[...Array(5)].map((_, index) => {
                            const rating = Number(usersAceData?.reputation);
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
                        <div className={styles.allStars}>
                          {[...Array(5)].map((_, index) => {
                            const rating = Number(usersAceData?.responsiveness);
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
                      </div>
                    </div>
                    <div className={styles.ratingDiv2}>
                      <div className={styles.ratingDiv21}>
                        <div className={styles.ratingDiv221}>
                          Availability
                          <Help text={"The working days of the company"} />
                        </div>
                        <div className={styles.ratingDiv212}>
                          {usersAceData?.availability}
                        </div>
                      </div>
                      <div className={styles.ratingDiv21}>
                        <div className={styles.ratingDiv221}>
                          Projects Done
                          <Help
                            text={
                              "The total number of projects done by company"
                            }
                          />
                        </div>
                        <div className={styles.ratingDiv212}>
                          {usersAceData?.projectsDone}
                        </div>
                      </div>
                      <div className={styles.ratingDiv21}>
                        <div className={styles.ratingDiv221}>
                          Project Ongoing
                          <Help text={"The total number of ongoing projects"} />
                        </div>
                        <div className={styles.ratingDiv212}>
                          {usersAceData?.projectsOngoing}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col
                className={`${styles.details} ${styles.borders}`}
                data-aos="zoom-in"
              >
                Ace awards
              </Col>
            </Row>
            <Row id="reviews" className="m-0">
              <Col lg={12} className={styles.reviewHeading} data-aos="zoom-in">
                <div>Reviews</div>
                <div className={styles.writeReview}>
                  <CustomButton
                    width={"auto"}
                    height="auto"
                    text={"Write a Review"}
                    onClick={() => handleFeatures("Write a Review")}
                  />
                </div>
              </Col>

              {!reviews && isLoading ? (
                <div className={styles.noReviews}>No Reviews Yet!!!</div>
              ) : (
                <ReviewCardComponent data={reviews} photosOf={"reviewer"} />
              )}
            </Row>

            <Row className={styles.allDetails} id="details">
              <Col lg={12} className={`${styles.nameInDetailsInner} p-0`}>
                {usersAceData?.companyName}
              </Col>
              <Col lg={8} className={styles.overview}>
                <div className={styles.detailDiv}>
                  <div className={styles.detailHeading}>Categories</div>
                  <div className={styles.detailData}>
                    {usersAceData?.categories?.map((item, index) => {
                      if (usersAceData.categories.length === index + 1) {
                        return item + ".";
                      } else return item + ", ";
                    })}
                    {/* Basement Renovation, Bathroom Renovation, General Contractors,
                Design/Build, Home Additions, Architects, Kitchen & Bathroom -
                Cabinets & Design, and Structural Engineering */}
                  </div>
                </div>
                <div className={styles.detailDiv}>
                  <div className={styles.detailHeading}>Services</div>
                  <div className={styles.detailData}>
                    {usersAceData?.services?.map((item, index) => {
                      if (usersAceData.services.length === index + 1) {
                        return item + ".";
                      } else return item + ", ";
                    })}

                    {/* Basement Renovation, Bathroom Renovation, Basement Finishing,
                Bathroom Remodeling, Kitchen Makeovers, Kitchen Renovation,
                Engineering, structural engineering, mechanical engineering,
                drafting services, home additions, rear additions, home
                extensions, rear extensions, marble installers, tile
                installation, ceramic tile setting, marble tile setting and most
                Interior Renovation Projects. */}
                  </div>
                </div>
                <div className={styles.detailDiv}>
                  <div className={styles.detailHeading}>Area's Served</div>
                  <div className={styles.detailData}>
                    {usersAceData?.serviceAreas?.map((item, index) => {
                      if (usersAceData.serviceAreas.length === index + 1) {
                        return item + ".";
                      } else return item + ", ";
                    })}

                    {/* Amritsar,Jalandhar,Ludhiana,Patiala,Beas,Riya */}
                  </div>
                </div>
                <div className={styles.detailDiv}>
                  <div className={styles.detailHeading}>Website</div>
                  <div className={styles.detailData}>
                    N/A
                    {/* Amritsar,Jalandhar,Ludhiana,Patiala,Beas,Riya */}
                  </div>
                </div>
              </Col>
              <Col className="p-0">
                <div className={styles.detailDiv}>
                  <div className={styles.detailHeading}>Year of Establised</div>
                  <div className={styles.detailData}>
                    {usersAceData?.yearOfEstablishment}
                  </div>
                </div>
                <div className={styles.detailDiv}>
                  <div className={styles.detailHeading}>Payment method</div>
                  <div className={styles.detailData}>
                    {usersAceData?.paymentMethod}
                  </div>
                </div>
                <div className={styles.detailDiv}>
                  <div className={styles.detailHeading}>Number of workers</div>
                  <div className={styles.detailData}>
                    {usersAceData?.totalWorkers}
                  </div>
                </div>
                <div className={styles.detailDiv}>
                  <div className={styles.detailHeading}>Written Contract</div>
                  <div className={styles.detailData}>
                    {usersAceData?.writtenContract === true ? "Yes" : "No"}
                  </div>
                </div>
              </Col>
            </Row>

            <Row id="gallery">
              <Col className={styles.nameInDetailsInner} lg={12}>
                Gallery
              </Col>
              {console.log(usersAceData?.media)}
              {usersAceData?.media.length === 0 ? (
                <Col>
                  <div className={styles.noImagesMessage}>
                    Sorry, no images to display.
                  </div>
                </Col>
              ) : (
                usersAceData?.media?.map((image, index) => (
                  <Col md={4} key={index} className="mb-4">
                    <Card className={styles.card}>
                      <Card.Img
                        variant="top"
                        src={`/images/${image.src.path}`}
                        alt={image.title}
                        onClick={() => handleImageClick(index)}
                      />
                      <Card.Body>
                        <div className={styles.edit}>
                          <input
                            type="text"
                            placeholder="Title"
                            value={image.title}
                            disabled={!image.editable}
                            // onChange={(e) => handleTitleChange(e, index)}
                            className={styles.title}
                            style={{ opacity: image.editable ? 1 : 0.5 }}
                          />
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Container>
          {showFullScreen && selectedImageIndex !== null && (
            <Lightbox
              index={selectedImageIndex}
              open={showFullScreen}
              close={() => setShowFullScreen(false)}
              slides={usersAceData.media.map((image) => ({
                src: `/images/${image.src.path}`,
                title: image.title,
              }))}
              plugins={[Fullscreen, Video, Zoom]}
            />
          )}
        </div>
      ) : (
        <div className={styles.spinnerDiv}>
          <Spinner animation="border" className={styles.signInLoader} />
        </div>
      )}
      <LoginModal
        show={loginModal}
        onHide={() => setLoginModal(false)}
        handleLogin={handleLogin}
      />
    </>
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
export default CompanyProfile;
