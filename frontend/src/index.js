import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "swiper/css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@splidejs/react-splide/css";
import "aos/dist/aos.css";
import "yet-another-react-lightbox/styles.css";
// // or other themes
// import "@splidejs/react-splide/css/skyblue";
// import "@splidejs/react-splide/css/sea-green";

import AppRoutes from "./routes";
import { Provider } from "react-redux";
import MyStore from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={MyStore}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
);
