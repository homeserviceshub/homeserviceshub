import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import ScreenSlider from "../../components/screenslider";
import { trendingServices } from "../../Data/DataList";
// import Gellary from "../components/gellary";
// import SearchBar from "../components/searchBar";

import TopBuilders from "../../components/topBuilders";
// import FAQs from "../components/FAQs";
import OurUpdateForm from "../../components/ourUpdateForm";
import Footer from "../../components/footer";
import MainPhoto from "../../components/mainPhoto";
import BuildingOptions from "../../components/options/buildingOptions";
import { Featured } from "../../components/featured";
import AreYouServiceProvider from "../../components/AreYouAce/AreYouService Provider";
import FindLocalAce from "../../components/findLocalAce";
import HomePageReviews from "../../components/homePageReviews";
import axios from "axios";
import { CHECKLOGIN } from "../../redux/actions/actionCheckLogin";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    const id = localStorage.getItem("auth");
    id !== "null" && console.log(id, "id hegi");
    if (id && id !== null && id !== "null") {
      dispatch(CHECKLOGIN(true));
    } else {
      dispatch(CHECKLOGIN(false));
    }
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8000/usersData")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  const ourOfferedServicesHeading = "Our Offered Services";
  const trendingheading = "Trending Services";
  return (
    <>
      <MainPhoto />
      <BuildingOptions options={trendingServices} heading={trendingheading} />
      <FindLocalAce />
      <Featured heading={"Our Top Ace"} />
      <OurUpdateForm />
      <HomePageReviews />
      <AreYouServiceProvider />
    </>
  );
}

export default Home;
