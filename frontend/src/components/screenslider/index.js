import Carousel from "react-bootstrap/Carousel";

function ScreenSlider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/photos/homeimage2.jpg"
          alt="First slide"
          height="400px"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Monkey D Luffy in the Frame</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/photos/homeimage3.jpg"
          alt="First slide"
          height="400px"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Katakuri in the Frame</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/photos/homeimage4.avif"
          alt="Second slide"
          height="400px"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Acnologia in the Frame</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/photos/homeimage5.jpg"
          alt="Third slide"
          height="400px"
        />

        <Carousel.Caption>
          <h3>Forth slide label</h3>
          <p>Itachi Uchiha in the Frame</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ScreenSlider;
