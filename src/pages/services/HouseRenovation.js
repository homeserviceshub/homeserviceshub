import React, { useEffect } from "react";
import ScreenSlider from "../../components/screenslider";
import TopBuilders from "../../components/topBuilders";
import BuildingOptions from "../../components/options/buildingOptions";

function HouseRenovationServices() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const buildingServices = [
    "ARCHITECT",
    "GENERAL CONTRACTOR",
    "INTERIOR DESIGNER",
    "CONSTRUCTION WORKER",
  ];
  const heading = "Our Renovation Services";
  return (
    <>
      <ScreenSlider />
      <BuildingOptions options={buildingServices} heading={heading} />
      <TopBuilders />
    </>
  );
}

export default HouseRenovationServices;
