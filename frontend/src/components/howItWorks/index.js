import React from "react";
import { BsSearch } from "react-icons/bs";
import { LuUsers, LuCircleCheckBig } from "react-icons/lu";
import styles from "./index.module.css";

const HowItWorks = () => {
  const points = [
    {
      icon: <BsSearch className={styles.gridSvg} />,
      title: "Search",
      desc: "Find the service you need",
    },
    {
      icon: <LuUsers className={styles.gridSvg} />,
      title: "Connect",
      desc: "Choose from trusted providers",
    },
    {
      icon: <LuCircleCheckBig className={styles.gridSvg} />,
      title: "Book",
      desc: "Schedule and pay securely",
    },
  ];
  return (
    <div className={styles.background}>
      <section className={`container mx-auto py-5 my-5 ${styles.containerDiv}`}>
        <h2 className={styles.heading}>How It Works</h2>
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
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className={styles.desc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
