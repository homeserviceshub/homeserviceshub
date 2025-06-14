import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import CustomButton from "../../components/customBtn";

const VerificationRequest = () => {
  const [verificationRequests, setVerificationRequests] = useState();
  useEffect(() => {
    fetchVerifications();
  }, []);
  const fetchVerifications = async () => {
    const response = await axios.post("/api/verificationrequests");
    if (response.status === 200) {
      setVerificationRequests(response.data.data);
      console.log(response.data.data);
    }
  };
  const handleDone = async (id) => {
    try {
      const response = await axios.post("/api/verificationrequestsdone", {
        id,
      });

      if (response.status === 200) {
        fetchVerifications();
      }
    } catch (error) {
      console.error("Error marking verification as done:", error);
    }
  };

  return (
    <div className={styles.content}>
      <h1>Service Requests</h1>
      <table className={styles.serviceTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Number</th>
            <th>Done</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {verificationRequests?.length > 0 ? (
            verificationRequests.map((request) => (
              <tr key={request._id}>
                <td>{request._id}</td>

                <td>{request.aceData.companyName}</td>
                <td>{request.aceData.companyNumber}</td>
                <td>
                  <CustomButton
                    text="Done"
                    onClick={() => handleDone(request._id)}
                  />
                </td>
                <td>
                  <CustomButton
                    text="Cancel"
                    onClick={() => handleDone(request._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="15" style={{ textAlign: "center" }}>
                No requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VerificationRequest;
