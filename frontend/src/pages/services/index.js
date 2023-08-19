import React, { useEffect } from "react";
import ScreenSlider from "../../components/screenslider";
import BuildingOptions from "../../components/options/buildingOptions";
import { allServices } from "../../Data/DataList";

function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heading = "Our All Services";
  return (
    <>
      <ScreenSlider />
      <BuildingOptions options={allServices} heading={heading} />
    </>
  );
}

export default Services;
