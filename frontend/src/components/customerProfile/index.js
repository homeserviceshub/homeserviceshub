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
  const [dummyData, setDummyData] = useState(data);
  const stars = ["1", "2", "3", "4", "5"];
  const list = ["1", "2", "3"];
  const [bookmarks, setBookmarks] = useState(list);
  const [categories] = useState([
    "Architect",
    "General Constractor",
    "Painter",
    "Project Manager",
    "Builder",
    "Demolition",
  ]);

  const [selectedFilter, setSelectedFilter] = useState("details");
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [credField, setCredField] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("auth");

  const usersData = useSelector((state) => {
    return state.userDataReducer;
  });
  console.log(usersData.data, "getting Data");
  useEffect(() => {
    dispatch(GetUserData(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    const newData = { ...data, ...usersData.data };
    setData(newData);
    setDummyData(newData);
    console.log(newData, "combined Data");
  }, [usersData.data]);
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setDummyData({
      ...dummyData,
      [name]: value,
    });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setDummyData({
        ...dummyData,
        profile_photo: reader.result,
      });
    };
    setData({
      ...dummyData,
      profile_photo: reader.result,
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlechanges = () => {
    // console.log(formData, "Form Data");
    setData(dummyData);
    setProfileModalShow(false);
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
    console.log("logout");
    localStorage.setItem("auth", null);
    console.log(dispatch(CHECKLOGIN(false)));
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
            {/* <div
              title="Logout"
              onClick={activeTab}
              lg={1}
              className={`${styles.tab}`}
            >
              Logout
            </div> */}
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
                src="./icons/default-profile-picture-male-icon.svg"
                width="100%"
                height="100%"
                className={styles.img}
              />
            ) : (
              <img
                src={data.profile_photo}
                width="100%"
                height="100%"
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
        <Row id="reviews" className="mx-0">
          <Col lg={12} className={styles.reviewHeading}>
            <div>Reviews(5)</div>
          </Col>
          {stars.map((item, index) => {
            return <ReviewCardComponent key={index} />;
          })}
        </Row>
        <Row id="bookmarks" className="mx-0">
          <Col lg={12} className={styles.reviewHeading}>
            <div>Bookmarks({bookmarks.length})</div>
          </Col>
          {bookmarks.map((item, index) => {
            return (
              <Row className={styles.dynamicRow} key={index} data-aos="fade-up">
                <Col lg={2}>
                  {" "}
                  <img
                    src="./photos/member5.jpg"
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
                    <div className={styles.companyDetails}>(65)Reviews</div>
                    <div className={styles.companyDetails}>
                      6+ Year Experience
                    </div>
                  </div>
                  <div className={styles.companyDetails}>
                    Thank you for your feedback! We greatly appreciate your
                    satisfaction with our services. We take pride in delivering
                    quality work and ensuring customer satisfaction...{" "}
                    <Link style={{ color: "green" }} to="/companyprofile">
                      read more
                    </Link>
                  </div>
                </Col>
                <Col lg={2}>
                  <img
                    src="./photos/verified.png"
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
                  <div
                    onClick={() => navigate("/companyprofile")}
                    className={styles.firstBtn}
                  >
                    <CustomButton text={"Profile"} />
                  </div>
                  <div onClick={() => handleRemove(index)}>
                    <CustomButton text={"Remove"} />
                  </div>
                </Col>
                <Col lg={8} className={styles.categoryList}>
                  Category-{" "}
                  {categories.map((item, index) => {
                    return (
                      <span key={index} className={styles.categories}>
                        {item}
                      </span>
                    );
                  })}
                </Col>
              </Row>
            );
          })}
        </Row>
      </Container>

      <ProfileModal
        show={profileModalShow}
        onHide={() => setProfileModalShow(false)}
        handlechanges={handlechanges}
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
  console.log(props.data);
  console.log(formData, "formdata");

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
                value={formData.joining_date}
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
        <CustomButton text={"Close"} onClick={props.onHide} width={"auto"} />
        <CustomButton
          text={"Save Changes"}
          onClick={() => props.handlechanges(formData)}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}
