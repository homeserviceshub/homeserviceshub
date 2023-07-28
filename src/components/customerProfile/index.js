import React from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import CustomButton from "../customBtn";
import styles from "./index.module.css";
import { useState } from "react";
import { AiFillEdit, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link as ScrollLink } from "react-scroll";
import { BiSave } from "react-icons/bi";
import ReviewCardComponent from "../reviewCard";
import { Link, useNavigate } from "react-router-dom";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { CHECKLOGIN } from "../../redux/actions/actionCheckLogin";

const CustomerProfile = () => {
  const [data, setData] = useState({
    profilePhoto: "",
    name: "Harman Sidhu",
    number: "8054875055",
    gmail: "bestapplication@gmail.com",
    password: "HustleTime",
  });
  const stars = ["1", "2", "3", "4", "5"];
  const list = ["1", "2", "3"];
  const [bookmarks, setBookmarks] = useState(list);
  const [categories, setCategories] = useState([
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

  const handlechanges = (formData) => {
    console.log(formData, "getting Data");
    setData(formData);
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
                width={"130px"}
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
            {data.profilePhoto ? (
              <img
                src={data.profilePhoto}
                width={350}
                height={350}
                className={styles.img}
              />
            ) : (
              <img
                src="/icons/default-profile-picture-male-icon.svg"
                width={350}
                height={350}
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
                value={data.name}
                onChange={(e) => {
                  setData({
                    ...data,
                    name: e.target.value,
                  });
                }}
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
                value={data.gmail}
                onChange={(e) => {
                  setData({
                    ...data,
                    gmail: e.target.value,
                  });
                }}
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
                autoComplete="off"
              />
            </Col>
          </Row>
        </div>
      </Container>
      <Container>
        <Row id="reviews">
          <Col lg={12} className={styles.reviewHeading}>
            <div>Reviews(5)</div>
          </Col>
          {stars.map((item, index) => {
            return <ReviewCardComponent key={index} />;
          })}
        </Row>
        <Row id="bookmarks">
          <Col lg={12} className={styles.reviewHeading}>
            <div>Bookmarks({bookmarks.length})</div>
          </Col>
          {bookmarks.map((item, index) => {
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
        data={data}
      />
    </div>
  );
};

export default CustomerProfile;

function ProfileModal(props) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    // Initialize the formData state with the current data
    profilePhoto: "",
    name: props.data.name,
    number: props.data.number,
    gmail: props.data.gmail,
    password: props.data.password,
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        profilePhoto: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
                onChange={handleImageChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="abc@gmail.com"
                name="gmail"
                value={formData.gmail}
                onChange={handleFormChange}
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
                value={formData.password}
                onChange={handleFormChange}
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
                value={formData.number}
                onChange={handleFormChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Joining Data</Form.Label>
              <Form.Control type="text" placeholder="27 july 2023" disabled />
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
