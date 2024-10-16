import React, { useEffect } from "react";
import { trendingServices } from "../../Data/DataList";
import OurUpdateForm from "../../components/ourUpdateForm";
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
    if (id && id !== null && id !== "null") {
      dispatch(CHECKLOGIN(true));
    } else {
      dispatch(CHECKLOGIN(false));
    }
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
