import React, { useEffect } from "react";
import FAQs from "../../components/FAQs";

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <FAQs />;
};

export default Faq;
