import React, { useEffect } from "react";
import CustomerProfile from "../../components/customerProfile";
function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <CustomerProfile />;
}

export default Profile;
