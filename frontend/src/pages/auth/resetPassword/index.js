// import styles from "./ResetPassword.module.css";
// import React from "react";
// import { Form, Container, Row, Col, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// function ResetPasword() {
//   const navigate = useNavigate();

//   function gotoSignIn() {
//     navigate("/", {
//       replace: true,
//     });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//   }
//   return (
//     <Container fluid className={styles.containerX}>
//       <Row className=" justify-content-center align-items-center h-100">
//         <Col md={4} className={` p-5 ${styles.containerY}`}>
//           <div className="text-center">
//             <img src="/img/logo.png" alt="logox" />
//           </div>
//           <Form onSubmit={handleSubmit} className={styles.formDesign}>
//             <Container className="p-0">
//               <Row className="py-3 justify-content-center">
//                 <Col md={12}>
//                   <h2>Reset Password</h2>
//                 </Col>
//                 <Col md={12} className={styles.formText}>
//                   <div>
//                     Enter the mail associated with your account and we’ll send
//                     an email with instruction to reset your password
//                   </div>
//                 </Col>
//                 <Col md={12}>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Email Address"
//                   />
//                 </Col>

//                 <Col md={12} className="text-center">
//                   {/* <button className="btn w-100">Sign In</button> */}

//                   <Button
//                     type="submit"
//                     onClick={gotoSignIn}
//                     className={styles.signInLink}
//                   >
//                     Send Mail
//                   </Button>
//                 </Col>
//               </Row>
//             </Container>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
// export default ResetPasword;

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Extract token from URL
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setMessage("Invalid or expired link");
    }
  }, [location]);

  const handlePasswordReset = async () => {
    if (!newPassword) return alert("Please enter a new password");

    try {
      // const response = await axios.post(
      //   "https://homeserviceshub.in/api/reset-password",
      //   {
      //     token,
      //     newPassword,
      //   }
      // );

      // setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000); // Redirect after success
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      {message && <p>{message}</p>}
      {token ? (
        <div>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handlePasswordReset}>Reset Password</button>
        </div>
      ) : (
        <p>Invalid or expired link</p>
      )}
    </div>
  );
};

export default ResetPassword;
