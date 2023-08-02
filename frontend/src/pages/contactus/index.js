import React, { useEffect } from "react";
import ContactUsComponent from "../../components/contactUs";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <ContactUsComponent />;
};

export default ContactUs;
