import { useRef } from "react";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./screenslider.css";
import "swiper/css";
import "swiper/css/navigation";

function ScreenSlider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const adImages = [
    "/photos/homeimage2.jpg",
    "/photos/homeimage3.jpg",
    "/photos/homeimage4.avif",
    "/photos/homeimage5.jpg",
  ];
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        cssMode={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
        className={` mySwiper `}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        {/* {console.log()} */}
        {adImages &&
          adImages.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                className="d-block w-100"
                src={process.env.PUBLIC_URL + item}
                alt="First slide"
                height="400px"
              />
            </SwiperSlide>
          ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      {/* <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + "/photos/homeimage2.jpg"}
          alt="First slide"
          height="400px"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + "./photos/homeimage3.jpg"}
          alt="First slide"
          height="400px"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + "./photos/homeimage4.avif"}
          alt="Second slide"
          height="400px"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + "./photos/homeimage5.jpg"}
          alt="Third slide"
          height="400px"
        />

        <Carousel.Caption>
          <h3>Forth slide label</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel> */}
    </>
  );
}

export default ScreenSlider;
