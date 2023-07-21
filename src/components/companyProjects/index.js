import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import styles from "./index.module.css";

const CompanyProjects = () => {
  const photos = [
    "/photos/ongoing1.jpg",
    "/photos/ongoing2.jpg",
    "/photos/ongoing3.jpg",
    "/photos/ongoing4.jpg",
    "/photos/ongoing5.jpg",
    "/photos/ongoing6.jpg",
    "/photos/ongoing2.jpg",
    "/photos/ongoing4.jpg",
  ];
  const [showAll, setShowAll] = useState(false);
  const handleClick = () => {
    setShowAll(true);
  };
  return (
    <Container className={styles.containrX}>
      <div className={styles.mainHeading}>
        <div className={styles.mainHeading1}>Our Leatest Projects</div>
        {/* <div className={styles.mainHeadin2}>We love Eco friendly system</div> */}
      </div>
      <Row className={styles.builderInner}>
        {photos.slice(0, 5).map((photo, index) => {
          return (
            <div className={styles.builderItem} key={index}>
              <img
                src={photo}
                alt="photo"
                max-width="100%"
                max-height="100%"
                display="block"
              />
              <div className={styles.hover}>
                <h4>Home Residence</h4>
                <p>
                  LCD screens are uniquely modern in style, and the liquid
                  crystals that make them work have allowed humanity to create
                  slimmer.
                </p>
              </div>
            </div>
          );
        })}
        {!showAll && (
          <div className={styles.builderItem} onClick={handleClick}>
            <img
              src={photos[5]}
              alt="photo"
              max-width="100%"
              max-height="100%"
              display="block"
            />
            <div className={styles.hover}>
              <h2>See More...</h2>
            </div>
          </div>
        )}
        {showAll &&
          photos.slice(5).map((photo, index) => (
            <div className={styles.builderItem}>
              <img
                src={photo}
                alt="photo"
                max-width="100%"
                max-height="100%"
                display="block"
              />
              <div className={styles.hover}>
                <h4>Home Residence</h4>
                <p>
                  LCD screens are uniquely modern in style, and the liquid
                  crystals that make them work have allowed humanity to create
                  slimmer.
                </p>
              </div>
            </div>
          ))}
      </Row>
    </Container>
  );
};

export default CompanyProjects;
