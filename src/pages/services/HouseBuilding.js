import React, { useEffect } from "react";
import Navbar from "../../components/navbar";
import ScreenSlider from "../../components/screenslider";
// import Gellary from "../components/gellary";
// import SearchBar from "../components/searchBar";

import TopBuilders from "../../components/topBuilders";
// import FAQs from "../components/FAQs";
import OurUpdateForm from "../../components/ourUpdateForm";
import Footer from "../../components/footer";
import MainPhoto from "../../components/mainPhoto";
import BuildingOptions from "../../components/options/buildingOptions";

function HouseBuildingServices() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const buildingServices = [
    "ARCHITECT",
    "GENERAL CONTRACTOR",
    "INTERIOR DESIGNER",
    "CARPENTER",
    "PAINTER",
    "CONSTRUCTION WORKER",
    "BUILDING INSPECTOR",
    "ELECTRICIAN",
  ];
  const heading = "Our Building Services";
  return (
    <>
      <ScreenSlider />
      <BuildingOptions options={buildingServices} heading={heading} />
      <TopBuilders />
    </>
  );
}

export default HouseBuildingServices;
