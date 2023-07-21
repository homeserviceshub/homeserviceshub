import React, { useEffect } from "react";
import ScreenSlider from "../../components/screenslider";
import TopBuilders from "../../components/topBuilders";
import BuildingOptions from "../../components/options/buildingOptions";

function HouseRepairServices() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const buildingServices = [
    "INTERIOR DESIGNER",
    "CARPENTER",
    "PAINTER",
    "ELECTRICIAN",
  ];
  const heading = "Our Repair Services";
  return (
    <>
      <ScreenSlider />
      <BuildingOptions options={buildingServices} heading={heading} />
      <TopBuilders />
    </>
  );
}

export default HouseRepairServices;
