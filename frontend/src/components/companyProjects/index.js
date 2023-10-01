import React, { useState } from "react";
import styles from "./index.module.css";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const CompanyProjects = () => {
  const [images] = useState([
    { src: "./photos/ongoing4.jpg", title: "Model 1" },
    { src: "./photos/ongoing5.jpg", title: "Model 2" },
    { src: "./photos/ongoing1.jpg", title: "Model 3" },
    { src: "./photos/ongoing2.jpg", title: "Model 4" },
    { src: "./photos/ongoing3.jpg", title: "Model 5" },
  ]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showFullScreen, setShowFullScreen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowFullScreen(true);
    setIsLoading(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
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
              <Card className={styles.card}>
                <Card.Img
                  variant="top"
                  src={image.src}
                  alt={image.title}
                  className={styles.img}
                  onClick={() => handleImageClick(index)}
                />
                <Card.Body>
                  <Card.Title contentEditable={false}>{image.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

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

export default CompanyProjects;
