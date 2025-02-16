import React from "react";
import { GoShieldCheck } from "react-icons/go";
import { LuAward } from "react-icons/lu";
import { RiCustomerService2Line } from "react-icons/ri";
import styles from "./index.module.css";

const WhyChooseUs = () => {
  const points = [
    {
      icon: <GoShieldCheck className={styles.gridSvg} />,
      title: "Verified Professionals",
      desc: "All our service providers undergo thorough background checks and verification processes",
    },
    {
      icon: <LuAward className={styles.gridSvg} />,
      title: "Quality Guaranteed",
      desc: "We stand behind our service quality with a 100% satisfaction guarantee",
    },
    {
      icon: <RiCustomerService2Line className={styles.gridSvg} />,
      title: "Customer Support",
      desc: "24/7 dedicated customer support to assist you with any concerns",
    },
  ];
  return (
    <div className={styles.background}>
      <section className={`container mx-auto py-5 my-5 ${styles.containerDiv}`}>
        <h2 className={styles.heading}>Why Choose Us</h2>
        <div className={styles.gridcontainer}>
          {points.map((step, index) => (
            <div
              key={index}
              //
              className={styles.oneGrid}
            >
              <span className={styles.gridSpan}>
                {step.icon}
                {/* {React.createElement(step.icon, {
                  className: "text-white",
                  size: 24,
                })} */}
              </span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.desc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
