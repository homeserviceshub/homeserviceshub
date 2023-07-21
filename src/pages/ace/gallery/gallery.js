import React, { useState, useRef } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Modal,
} from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import styles from "./index.module.css";
import CustomButton from "../../../components/customBtn";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const AceGallery = () => {
  const [images, setImages] = useState([
    // Photos will be added here
  ]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowFullScreen(true);
    setIsLoading(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleAddImage = () => {
    const file = fileInputRef.current.files[0];
    if (!file) return; // No image selected

    const reader = new FileReader();
    reader.onloadend = () => {
      // If an image is selected for editing, replace it

      // Add the selected image to the gallery
      setImages([...images, { src: reader.result, title: "New Image" }]);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleEditTitle = (index) => {
    if (selectedImageIndex === index) {
      setSelectedImageIndex(null);
    } else {
      setSelectedImageIndex(index);
    }
  };

  const handleTitleChange = (event, index) => {
    const updatedImages = [...images];
    updatedImages[index].title = event.target.textContent;
    setImages(updatedImages);
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Container>
      <h1 className="mt-4 mb-3">Gallery</h1>
      <Row>
        {images.length === 0 ? (
          <Col>
            <div className={styles.noImagesMessage}>
              Sorry, no images to display.
            </div>
          </Col>
        ) : (
          images.map((image, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={image.src}
                  alt={image.title}
                  onClick={() => handleImageClick(index)}
                />
                <Card.Body>
                  <Card.Title
                    className={styles.title}
                    contentEditable={selectedImageIndex === index}
                    suppressContentEditableWarning
                    onBlur={(event) => handleTitleChange(event, index)}
                  >
                    {image.title}
                    <FaEdit
                      onClick={() => handleEditTitle(index)}
                      className={styles.edit}
                    />
                  </Card.Title>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <CustomButton
        text={"Add Image"}
        onClick={() => fileInputRef.current.click()}
        width={"auto"}
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleAddImage}
      />
      {/* <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showFullScreen}
        onHide={handleCloseFullScreen}
      >
        <Modal.Body className={styles.fullScreenContainer}>
          <div className={styles.imageWrapper}>
            <img
              src={images[selectedImageIndex]?.src}
              alt={images[selectedImageIndex]?.title}
              width="100%"
              height="100%"
            />
          </div>
          <div className={styles.titleWrapper}>
            <h3>{images[selectedImageIndex]?.title}</h3>
          </div>
          <div className={styles.navigationWrapper}>
            <CustomButton
              text={"Previous"}
              onClick={handlePrevImage}
              width={"auto"}
            />{" "}
            <CustomButton
              text={"Next"}
              onClick={handleNextImage}
              width={"auto"}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <CustomButton
            text={"Close"}
            onClick={handleCloseFullScreen}
            width={"auto"}
          />
        </Modal.Footer>
      </Modal> */}
      {showFullScreen && selectedImageIndex !== null && (
        <Lightbox
          mainSrc={images[selectedImageIndex].src}
          nextSrc={images[(selectedImageIndex + 1) % images.length].src}
          prevSrc={
            images[(selectedImageIndex + images.length - 1) % images.length].src
          }
          onCloseRequest={() => setShowFullScreen(false)}
          onMovePrevRequest={() =>
            setSelectedImageIndex(
              (selectedImageIndex + images.length - 1) % images.length
            )
          }
          onMoveNextRequest={() =>
            setSelectedImageIndex((selectedImageIndex + 1) % images.length)
          }
          onImageLoad={handleImageLoad}
        />
      )}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <Spinner animation="border" role="status" variant="light" />
        </div>
      )}
    </Container>
  );
};

export default AceGallery;
