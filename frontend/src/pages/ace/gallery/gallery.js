import React, { useState, useRef } from "react";
import { Card, Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import styles from "./index.module.css";
import CustomButton, { CustomRedButton } from "../../../components/customBtn";
import Lightbox from "yet-another-react-lightbox";
import { Fullscreen, Video, Zoom } from "yet-another-react-lightbox/plugins";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AceGallery = () => {
  const [images, setImages] = useState([
    // Photos will be added here
  ]);
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [aceData, setAceData] = useState();
  useEffect(() => {
    const id = localStorage.getItem("aauth");
    if (id) {
      try {
        axios
          .post("/api/acedata", {
            id: id,
          })
          .then((response) => {
            if (response.status === 200) {
              if (response.data.message) {
                console.log(response.data.message);
              } else {
                setAceData(response.data.aceData);
                setImages(response.data.aceData.media);
              }
            }
          })
          .catch((error) => {
            console.error("AxiosError:", error);
            console.log(error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      navigate("/ace/signin", {
        replace: true,
      });
    }
  }, []);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowFullScreen(true);
    setIsLoading(true);
  };
  const handleAddImage = async () => {
    if (isLoading) return;

    if (images.length >= 10) {
      alert("Maximum of 10 photos can be uploaded.");
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      const file = fileInputRef.current.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("media", file);
      formData.append("id", localStorage.getItem("aauth"));

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.status === 200) {
        const mediaObject = {
          path: response.data.fileUrl,
          type: "image",
        };

        const newImage = {
          src: mediaObject,
          title: "Image Title",
          editable: false,
        };

        const updatedImages = [...images, newImage];
        const updatedAceData = {
          ...aceData,
          media: updatedImages,
        };

        await axios.post("/api/updateaceuser", {
          data: updatedAceData,
          id: localStorage.getItem("aauth"),
        });

        setImages(updatedImages);
        setAceData(updatedAceData);

        alert("New Photo Added Successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    try {
      const newImages = [...images];
      newImages.splice(deleteIndex, 1);

      setImages(newImages);

      const updatedAceData = {
        ...aceData,
        media: aceData.media.filter((_, i) => i !== deleteIndex),
      };

      setAceData(updatedAceData);

      await axios.post("/api/updateaceuser", {
        data: updatedAceData,
        id: localStorage.getItem("aauth"),
      });
      setDeleteModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
    // alert("Image deleted successfully");
  };
  const handleEditTitle = async (index) => {
    const updatedImages = [...images];
    updatedImages[index].editable = !updatedImages[index].editable;
    setImages(updatedImages);

    // If the title is no longer editable, send the update to the backend
    if (!updatedImages[index].editable) {
      try {
        const updatedAceData = {
          ...aceData,
          media: updatedImages,
        };

        await axios.post("/api/updateacetitle", {
          data: updatedAceData,
          id: localStorage.getItem("aauth"),
        });

        setAceData(updatedAceData);
        alert("Title updated successfully");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const handleTitleChange = (event, index) => {
    const updatedImages = [...images];
    updatedImages[index].title = event.target.value;
    setImages(updatedImages);
  };

  return (
    <Container>
      <h1 className="mt-4 mb-3">Gallery</h1>
      <Row>
        {console.log(images)}
        {images == undefined || images.length === 0 ? (
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
                  src={image.src.path}
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
                      onChange={(e) => handleTitleChange(e, index)}
                      className={styles.title}
                      style={{ opacity: image.editable ? 1 : 0.5 }}
                    />
                    <FaEdit
                      className={styles.icon}
                      onClick={() => handleEditTitle(index)}
                    />
                  </div>
                  <CustomRedButton
                    text={"Remove"}
                    onClick={() => {
                      setDeleteIndex(index);
                      setDeleteModal(true);
                    }}
                  />
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
      {showFullScreen && selectedImageIndex !== null && (
        <Lightbox
          index={selectedImageIndex}
          open={showFullScreen}
          close={() => setShowFullScreen(false)}
          slides={images.map((image) => ({
            src: `/images/${image.src.path}`,
            title: image.title,
          }))}
          plugins={[Fullscreen, Video, Zoom]}
        />
      )}
      <DeleteModal
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        handleRemoveImage={handleRemoveImage}
      />
    </Container>
  );
};

function DeleteModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure to delete this media?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <CustomRedButton
          width={"auto"}
          text={"Delete"}
          onClick={props.handleRemoveImage}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default AceGallery;
