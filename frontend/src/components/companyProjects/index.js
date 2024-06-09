import React, { useState } from "react";
import styles from "./index.module.css";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import Lightbox from "yet-another-react-lightbox";
import { Fullscreen, Video, Zoom } from "yet-another-react-lightbox/plugins";

const CompanyProjects = () => {
  const [images] = useState([
    //   alt: "image 1",
    //   width: "100%",
    //   height: "100%",
    {
      src: process.env.PUBLIC_URL + "/photos/familyphoto2.jpg",

      title: "Model 1",
    },
    {
      src: process.env.PUBLIC_URL + "/photos/ongoing4.jpg",

      title: "Model 2",
    },
    {
      src: process.env.PUBLIC_URL + "/photos/ongoing1.jpg",

      title: "Model 3",
    },
    {
      src: process.env.PUBLIC_URL + "/photos/ongoing2.jpg",

      title: "Model 4",
    },
    {
      src: process.env.PUBLIC_URL + "/photos/ongoing3.jpg",

      title: "Model 5",
    },
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
          index={selectedImageIndex}
          open={showFullScreen}
          close={() => setShowFullScreen(false)}
          slides={images.map((image) => {
            return image;
          })}
          plugins={[Fullscreen, Video, Zoom]}
        />
      )}
    </Container>
  );
};

export default CompanyProjects;
