import React, { useEffect } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import CustomButton from "../customBtn";
import styles from "./index.module.css";
import { useState } from "react";
import { AiFillEdit, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";
// import { BiSave } from "react-icons/bi";
import ReviewCardComponent from "../reviewCard";
import { Link, useNavigate } from "react-router-dom";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { CHECKLOGIN } from "../../redux/actions/actionCheckLogin";
import { GetUserData } from "../../redux/actions/actionGetUserData";
import axios from "axios";
import moment from "moment";
// import moment from "moment";

const CustomerProfile = () => {
  const [data, setData] = useState({
    profile_photo: null,
    username: "",
    number: "",
    email: "",
    password: "",
    joining_date: "",
  });
  const [userReviews, setUserReviews] = useState([]);
  const [userRequestData, setUserRequestData] = useState([]);
  const [dummyData, setDummyData] = useState(data);
  const stars = ["1", "2", "3", "4", "5"];
  const list = ["1", "2", "3"];
  const [bookmarks, setBookmarks] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("details");
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [credField, setCredField] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("auth");

  const usersData = useSelector((state) => {
    return state.userDataReducer;
  });
  useEffect(() => {
    dispatch(GetUserData(userId));
  }, [userId, dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setIsLoading(true);
        const response = await axios.post(
          "http://localhost:8000/getreviewdata",
          {
            id: localStorage.getItem("auth"),
          }
        );
        if (response.status === 200) {
          // setIsLoading(false);
          setUserReviews(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      try {
        // setIsLoading(true);
        const response = await axios.post(
          "http://localhost:8000/getrequestdata",
          {
            customerID: localStorage.getItem("auth"),
          }
        );
        if (response.status === 200) {
          setUserRequestData(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
      try {
        // setIsLoading(true);
        const response = await axios.post(
          "http://localhost:8000/getbookmarksdata",
          {
            customerID: localStorage.getItem("auth"),
          }
        );
        if (response.status === 200) {
          if (response.data?.message !== "No Bookmarks Yet") {
            setBookmarks(response.data);
          }
          // setIsLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const newData = { ...data, ...usersData.data };
    setData(newData);
    setDummyData(newData);
  }, [usersData.data]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setDummyData({
      ...dummyData,
      [name]: value,
    });
  };
  const handleImageChange = (event) => {
    setDummyData({
      ...dummyData,
      profile_photo: event.target.files[0],
    });
  };
  const handleClose = () => {
    setDummyData({
      ...data,
    });
    setProfileModalShow(false);
  };

  const handlechanges = async () => {
    var profileData;
    if (dummyData.profile_photo) {
      try {
        const formData = new FormData();
        formData.append("media", dummyData.profile_photo);

        const response = await axios.post(
          "http://localhost:8000/upload",
          formData
        );

        if (response.status === 200) {
          const mediaObject = {
            path: response.data.filePath.filename,
            type: dummyData.profile_photo.type.startsWith("image")
              ? "image"
              : "video",
          };
          profileData = mediaObject;
          setData((prevData) => ({
            ...prevData,
            ...dummyData,
            profile_photo: mediaObject,
          }));
        }
      } catch (error) {
        console.error("Error uploading media:", error);
      }
    }
    setData((prevData) => ({
      ...prevData,
      ...dummyData,
      profile_photo: profileData ? profileData : data.profile_photo,
    }));
    try {
      // setIsLoading(true);
      await axios
        .post("http://localhost:8000/updateuser", {
          email: dummyData.email,
          number: dummyData.number,
          password: dummyData.password,
          profile_photo: profileData,
          username: dummyData.username,
          id: dummyData._id,
        })
        .then((response) => {
          if (response.status === 200) {
            alert("Users data updated Successfully");
          }
        })
        .catch((error) => {
          console.error("AxiosError:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
    setProfileModalShow(false);
  };
  // alter changes in this function accordingly
  // const handleCategoryClicked = (item) => {
  //   setClickedCategory(item);
  //   window.scrollTo(0, 0);
  //   const queryParams = new URLSearchParams();
  //   dispatch(SELECTEDSERVICE(item));
  //   for (const key in searchData) {
  //     if (searchData[key]) {
  //       queryParams.append(key, searchData[key]);
  //     }
  //   }
  //   console.log(item);
  //   console.log("before:", searchData.category);
  //   setSearchData((prevData) => ({
  //     ...prevData,
  //     category: item,
  //   }));
  //   console.log("after:", searchData.category);
  //   const url = `/services/service?category=${item}&location=${searchData.location}&sortedBy=${searchData.sortedBy}`;
  //   navigate(url);
  // };
  const bookmarkRemove = (id) => {
    // setbookmark(!bookmark);
    try {
      axios
        .post("http://localhost:8000/updatebookmark", {
          clientID: id,
          customerID: localStorage.getItem("auth"),
        })
        .then((response) => {
          if (response.status === 200) {
            alert("Bookmark Removed Successfully");
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
  const handleRemove = (indexToRemove) => {
    const updatedBookmarks = bookmarks.filter(
      (bookmark, index) => index !== indexToRemove
    );
    setBookmarks(updatedBookmarks);
  };
  const logout = () => {
    localStorage.setItem("auth", null);

    dispatch(CHECKLOGIN(false));
    navigate("/");
  };
  return (
    <div className={styles.backgroundColor}>
      <div className={styles.backGround}>
        <Container className={`${styles.containerY}`}>
          <div className={`${styles.tabs} ${styles.borderX} `}>
            <div className={`${styles.tabs} ${styles.borderX} `}>
              <ScrollLink
                to="details"
                smooth={true}
                duration={500}
                offset={-160}
              >
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
                    selectedFilter == "reviews" ? styles.activeTab : ""
                  }`}
                >
                  My Reviews
                </div>
              </ScrollLink>
              <ScrollLink
                to="bookmarks"
                smooth={true}
                duration={500}
                offset={-150}
              >
                <div
                  title="bookmarks"
                  onClick={activeTab}
                  lg={1}
                  className={`${styles.tab} ${
                    selectedFilter == "bookmarks" ? styles.activeTab : ""
                  }`}
                >
                  Bookmarks({bookmarks.length})
                </div>
              </ScrollLink>
            </div>
            <div className={styles.btnDiv}>
              <CustomButton
                text={"logout"}
                width={"auto"}
                height={"auto"}
                className={styles.btn}
                onClick={logout}
              />
            </div>
          </div>
        </Container>
      </div>
      <Container id="details" className={styles.containerX}>
        <Row>
          <div className={styles.imgDiv}>
            {data.profile_photo === null ? (
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/icons/default-profile-picture-male-icon.svg"
                }
                className={styles.img}
              />
            ) : (
              <img
                src={`http://localhost:8000/images/${data.profile_photo.path}`}
                className={styles.img}
              />
            )}
          </div>
        </Row>
        <div className={styles.outerDiv}>
          <div className={styles.editing}>
            <AiFillEdit onClick={() => setProfileModalShow(true)} />
          </div>
          <Row className={styles.infoDiv}>
            <Col lg={12} className={styles.info}>
              <input
                type="text"
                className="form-control"
                value={data.username}
                onChange={(e) => {
                  setData({
                    ...data,
                    name: e.target.value,
                  });
                }}
                disabled
                autoComplete="off"
              />
            </Col>
          </Row>
          <Row className={styles.infoDiv}>
            <Col md={12} className={styles.info}>
              <input
                type={credField ? "text" : "password"}
                className="form-control"
                value={data.password}
                onChange={(e) => {
                  setData({
                    ...data,
                    password: e.target.value,
                  });
                }}
                disabled
                autoComplete="off"
              />
              <span
                className={styles.floatingEye}
                onClick={() => setCredField(!credField)}
              >
                {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </Col>
          </Row>
          <Row className={styles.infoDiv}>
            <Col lg={12} className={styles.info}>
              <input
                type="text"
                className="form-control"
                value={data.email}
                onChange={(e) => {
                  setData({
                    ...data,
                    email: e.target.value,
                  });
                }}
                disabled
                autoComplete="off"
              />
            </Col>
          </Row>
          <Row className={styles.infoDiv}>
            <Col lg={12} className={styles.info}>
              <input
                type="text"
                className="form-control"
                value={data.number}
                onChange={(e) => {
                  setData({
                    ...data,
                    number: e.target.value,
                  });
                }}
                disabled
                autoComplete="off"
              />
            </Col>
          </Row>
        </div>
      </Container>
      <Container className="mb-0">
        <Row id="projects" className="mx-0">
          <Col lg={12} className={styles.reviewHeading}>
            <div>My Projects</div>
          </Col>
          {userRequestData?.length > 0 ? (
            userRequestData.map((item, index) => {
              return <div key={index}>{item.status}</div>;
            })
          ) : (
            <div className={styles.noReviews}>No Reviews Yet!!!</div>
          )}
        </Row>
        <Row id="reviews" className="mx-0">
          <Col lg={12} className={styles.reviewHeading}>
            <div>My Reviews</div>
          </Col>
          {userReviews?.length > 0 ? (
            <ReviewCardComponent data={userReviews} photosOf={"index"} />
          ) : (
            <div className={styles.noReviews}>No Reviews Yet!!!</div>
          )}
        </Row>

        <Row id="bookmarks" className="mx-0">
          <Col lg={12} className={styles.reviewHeading}>
            <div>Bookmarks({bookmarks?.length})</div>
          </Col>
          {bookmarks.length > 0 ? (
            bookmarks.map((item, index) => {
              return (
                <Row
                  className={styles.dynamicRow}
                  key={index}
                  data-aos="fade-up"
                >
                  <Col lg={8} className={styles.bookmarkData}>
                    <div className={styles.bookmarkPhoto}>
                      <img
                        src={
                          item.aceData.profilePhoto
                            ? `http://localhost:8000/images/${item.aceData.profilePhoto.path}`
                            : process.env.PUBLIC_URL +
                              "/icons/default-profile-picture-male-icon.svg"
                        }
                        alt="Selected"
                        width={150}
                        height={150}
                        className={styles.profilePhoto}
                      />
                    </div>
                    <div style={{ width: "75%" }}>
                      <div className={styles.companyName}>
                        {item.aceData.companyName}
                      </div>
                      <div className={styles.companyDetails}>
                        {[...Array(5)].map((_, idx) => {
                          const rating = Number(item.aceData?.overallRating);
                          const fullStars = Math.floor(rating);
                          const hasHalfStar = rating - fullStars >= 0.5;
                          return (
                            <span key={idx}>
                              {idx < fullStars ? (
                                <BsStarFill fill="gold" />
                              ) : idx === fullStars && hasHalfStar ? (
                                <BsStarHalf fill="gold" />
                              ) : (
                                <BsStar fill="gold" />
                              )}
                            </span>
                          );
                        })}
                      </div>
                      <div className={styles.companySmallDetails}>
                        <div className={styles.companyDetails}>
                          ({item.aceData.totalReviews}) Reviews
                        </div>
                        <div className={styles.companyDetails}>
                          {new Date().getFullYear() -
                            item.aceData.yearOfEstablishment}
                          + Year Experience
                        </div>
                      </div>
                      <div className={styles.companyDetails}>
                        {item.aceData.brief.length <= 160
                          ? item.aceData.brief
                          : `${item.aceData.brief.slice(0, 160)}...`}
                        <Link
                          style={{ color: "green" }}
                          to={`/companyprofile/${item._id}`}
                        >
                          read more
                        </Link>
                      </div>
                    </div>
                  </Col>

                  <Col lg={2} className={styles.verifiedPhotoDiv}></Col>

                  <Col lg={2}>
                    <div
                      onClick={() => navigate(`/${item._id}/servicerequest`)}
                      className={styles.firstBtn}
                    >
                      <CustomButton text={"Request a service"} />
                    </div>
                    <div
                      onClick={() => navigate(`/companyprofile/${item._id}`)}
                      className={styles.firstBtn}
                    >
                      <CustomButton text={"Profile"} />
                    </div>
                    <div onClick={() => handleRemove(index)}>
                      <CustomButton
                        onClick={() => bookmarkRemove(item._id)}
                        text={"Remove"}
                      />
                    </div>
                  </Col>

                  <Col lg={8} className={styles.categoryList}>
                    Category:{" "}
                    {item.aceData.categories.map((cat, catIndex) => (
                      <span
                        key={catIndex}
                        // onClick={() => handleCategoryClicked(cat)}
                        className={styles.categories}
                      >
                        {cat}
                      </span>
                    ))}
                  </Col>
                </Row>
              );
            })
          ) : (
            <div className={styles.noReviews}>No Bookmarks Yet!!!</div>
          )}
        </Row>
      </Container>

      <ProfileModal
        show={profileModalShow}
        onHide={() => setProfileModalShow(false)}
        handlechanges={handlechanges}
        handleClose={handleClose}
        handleFormChange={handleFormChange}
        handleImageChange={handleImageChange}
        data={dummyData}
      />
    </div>
  );
};

export default CustomerProfile;

function ProfileModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(
    // Initialize the formData state with the current data
    props.data
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Change Profile</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={props.handleImageChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full name"
                name="username"
                value={props.data.username}
                onChange={props.handleFormChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="abc@email.com"
                name="email"
                value={props.data.email}
                onChange={props.handleFormChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="******"
                name="password"
                value={props.data.password}
                onChange={props.handleFormChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="XXXXX-XXXXX"
                name="number"
                value={props.data.number}
                onChange={props.handleFormChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Joining Data</Form.Label>

              <Form.Control
                type="text"
                placeholder=""
                value={moment(props.data.joiningDate).format(
                  "Do MMMM YYYY, h:mm:ss A"
                )}
                disabled
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton
          text={"Close"}
          onClick={() => props.handleClose()}
          width={"auto"}
        />
        <CustomButton
          text={"Save Changes"}
          onClick={() => props.handlechanges(formData)}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}
