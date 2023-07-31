import React, { useState } from "react";
import { Container, Row, Col, Modal, Form, InputGroup } from "react-bootstrap";
import styles from "./index.module.css";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import Help from "../../../components/help";
import { Link } from "react-router-dom";
import IconFacebook from "../../../components/icons/IconFacebook";
import IconInstagram from "../../../components/icons/IconInstagram";
import IconLinkedIn from "../../../components/icons/IconLinkedIn";
import IconYoutube from "../../../components/icons/IconYoutube";
import IconTwitter from "../../../components/icons/IconTwitter";
import CustomButton from "../../../components/customBtn";

const AceProfile = () => {
  const socialMedia = [
    // user can give max 8 links of social media
    { link: "https://www.facebook.com/", icon: <IconFacebook /> },
    { link: "https://www.instagram.com/", icon: <IconInstagram /> },
    { link: "https://www.linkedin.com/", icon: <IconLinkedIn /> },
    { link: "https://www.youtube.com/", icon: <IconYoutube /> },
    { link: "https://www.twitter.com/", icon: <IconTwitter /> },
  ];
  const [profileModalShow, setProfileModalShow] = useState(false);
  const [discriptionModalShow, setDiscriptionModalShow] = useState(false);
  const [socialModalShow, setSocialModalShow] = useState(false);
  const [detailModalShow, setDetailModalShow] = useState(false);
  const [projectsModalShow, setProjectsModalShow] = useState(false);

  const [discription, setDiscription] = useState(
    "Here is the breif information about out company. hello there we are home builder and we are professional in renovation.We are just a small group of 10 people and looking forward to work with you guys. there is no rush you can check our website rating from the most trusted website for home renovation and then decide wheather you want the best of an advice of an old friend.We are good in bathroom reno, kitched reno and basement renovation. Just fill up some details and we will reply you as soon as possible."
  );

  const [selectedImage, setSelectedImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  console.log(coverImage);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.customContainer}>
      <div
        className={styles.companyProfileBackgroundPhoto}
        style={{
          background: coverImage
            ? `radial-gradient(
              circle,
              rgba(0, 0, 0, 0.2) 0%,
              rgba(0, 0, 0, 0.6) 100%
            ),url(${coverImage})`
            : `radial-gradient(
        circle,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.6) 100%
      ),
      url("/photos/companyBackgroundPhoto.jpg")`,
        }}
      >
        <Container className={styles.containerX}>
          <Row className={styles.complanyProfilePhotoRow}>
            <Col lg={2} className={styles.companyProfilePhoto}>
              <div>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    width={100}
                    height={100}
                    className={styles.profileImg}
                  />
                ) : (
                  <img
                    src="/icons/default-profile-picture-male-icon.svg"
                    width={100}
                    height={100}
                    className={styles.profileImg}
                  />
                )}
              </div>
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
              <div className={styles.profilebtn}>
                <CustomButton text={"See Plans"} />
              </div>
              <div className={styles.profilebtn}>
                <CustomButton
                  text={"Edit Profile"}
                  onClick={() => setProfileModalShow(true)}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className={styles.containerY}>
        <Row></Row>
        <Row id="overview">
          <Col lg={8} className={styles.overview}>
            <Row className={styles.overviewRow}>
              <Col className={`${styles.overviewCol} ${styles.borders}`}>
                <span
                  className={styles.editIcon}
                  onClick={() => setDiscriptionModalShow(true)}
                >
                  <FaEdit />
                </span>
                {discription}
              </Col>
            </Row>
            <Row className={styles.rating}>
              <Col className={`${styles.ratingCol} ${styles.borders}`}>
                <span
                  className={styles.editIcon}
                  onClick={() => setProjectsModalShow(true)}
                >
                  <FaEdit />
                </span>
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
                        text={"Stars on the basis of time taken for reply"}
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
                        text={"Stars on the basis of time taken for reply"}
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
                        text={"Stars on the basis of time taken for reply"}
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
                      Projects Done
                      <Help
                        text={"Stars on the basis of time taken for reply"}
                      />
                    </div>
                    <div className={styles.ratingDiv212}>30</div>
                  </div>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv221}>
                      Project Ongoing
                      <Help
                        text={"Stars on the basis of time taken for reply"}
                      />
                    </div>
                    <div className={styles.ratingDiv212}>3</div>
                  </div>
                  <div className={styles.ratingDiv21}>
                    <div className={styles.ratingDiv221}>
                      Availability
                      <Help
                        text={"Stars on the basis of time taken for reply"}
                      />
                    </div>
                    <div className={styles.ratingDiv212}>Mon-Fri</div>
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
              <span
                className={styles.editIcon}
                onClick={() => setSocialModalShow(true)}
              >
                <FaEdit />
              </span>
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
        <Row className={styles.allDetails}>
          <span
            className={styles.editIcon}
            onClick={() => setDetailModalShow(true)}
          >
            <FaEdit />
          </span>
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
      </Container>
      <ProfileModal
        show={profileModalShow}
        onHide={() => setProfileModalShow(false)}
        handleImageChange={handleImageChange}
        handleCoverChange={handleCoverChange}
      />
      <SocialModal
        show={socialModalShow}
        onHide={() => setSocialModalShow(false)}
      />
      <DetailModal
        show={detailModalShow}
        onHide={() => setDetailModalShow(false)}
      />
      <DiscriptionModal
        show={discriptionModalShow}
        onHide={() => setDiscriptionModalShow(false)}
      />
      <ProjectsModal
        show={projectsModalShow}
        onHide={() => setProjectsModalShow(false)}
      />
    </div>
  );
};

function ProfileModal(props) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                defaultValue="Harman"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                defaultValue="Sidhu"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Company name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Company name"
                defaultValue="Home Makers"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Change Profile</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={props.handleImageChange}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Change Cover Photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={props.handleCoverChange}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Address..." required />
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
          // onClick={handleSubmit}
          onClick={props.onHide}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}
function ProjectsModal(props) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Projects Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="days you are available..."
                defaultValue="Mon-Fri"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton text={"Close"} onClick={props.onHide} width={"auto"} />
        <CustomButton
          text={"Save Changes"}
          // onClick={handleSubmit}
          onClick={props.onHide}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}
function DiscriptionModal(props) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Discription
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Summary</Form.Label>
              <Form.Control
                required
                as="textarea"
                placeholder="Summary..."
                style={{ height: "100px" }}
                defaultValue=""
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton text={"Close"} onClick={props.onHide} width={"auto"} />
        <CustomButton
          text={"Save Changes"}
          // onClick={handleSubmit}
          onClick={props.onHide}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}
function SocialModal(props) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Social Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Contact Detail</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="XXXXX-XXXXXX"
                defaultValue=""
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Contact Detail</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="XXXXX-XXXXXX"
                defaultValue=""
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="abc@gmail.com"
                defaultValue=""
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                placeholder="www.housemakers.com"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid website.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Facebook Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="www.facebook.com"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid website.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Instagram Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="www.instagram.com"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid website.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>LinkedIn Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="www.linkedin.com"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid website.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Youtube Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="www.youtube.com"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid website.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Twitter Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="www.twitter.com"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid website.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton text={"Close"} onClick={props.onHide} width={"auto"} />
        <CustomButton
          text={"Save Changes"}
          // onClick={handleSubmit}
          onClick={props.onHide}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}
function DetailModal(props) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Company Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Categories</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Categories..."
                defaultValue=""
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Services</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Services..."
                defaultValue=""
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Services Provided in Areas</Form.Label>
              <Form.Control
                type="text"
                placeholder="Amritsar,Jalandhar,Ludhiana"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Year Established</Form.Label>
              <Form.Control type="text" placeholder="e.g.2000" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Payment method</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g.cash/card/UPI"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Number of workers</Form.Label>
              <Form.Control type="text" placeholder="e.g.20" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Written Contract</Form.Label>
              <Form.Control type="text" placeholder="Yes/No" required />
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
          // onClick={handleSubmit}
          onClick={props.onHide}
          width={"auto"}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default AceProfile;
