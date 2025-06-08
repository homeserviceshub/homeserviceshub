// ServiceRequests.js (updated)
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.css";
import CustomButton from "../../components/customBtn";

const ServiceRequests = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [editedCancelledBy, setEditedCancelledBy] = useState("");
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [uniqueServiceAreas, setUniqueServiceAreas] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [newRequest, setNewRequest] = useState({
    selectedService: "",
    selectedArea: "",
    accommodation: "",
    discription: "",
    serviceNeed: "",
    customerName: "",
    customerEmail: "",
    customerNumber: "",
    customerAddress: "",
    aceName: "",
    aceData: "",
  });
  //   console.log(uniqueServiceAreas);
  //   useEffect(() => {
  //     const fetchServiceRequests = async () => {
  //       try {
  //         const response = await axios.post("/api/dashboard/getservicerequests");
  //         setServiceRequests(response.data);
  //         console.log(response.data)
  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Error fetching service requests:", error);
  //         setLoading(false);
  //       }
  //     };

  //     fetchServiceRequests();
  //   }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [requestsResponse, providersResponse] = await Promise.all([
          axios.post("/api/dashboard/getservicerequests"),
          axios.post("/api/dashboard/getserviceproviders"),
        ]);

        setServiceRequests(requestsResponse.data);
        setServiceProviders(providersResponse.data.data);

        // Corrected way to get unique service areas
        const uniqueAreas = [
          ...new Set(
            providersResponse.data.data.flatMap(
              (provider) => provider.aceData.serviceAreas
            )
          ),
        ];
        const uniqueServices = [
          ...new Set(
            providersResponse.data.data.flatMap(
              (provider) => provider.aceData.services
            )
          ),
        ];
        setAllServices(uniqueServices);
        setUniqueServiceAreas(uniqueAreas);

        console.log(requestsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedStatus(serviceRequests[index].status);
    setEditedCancelledBy(serviceRequests[index].cancelledBy || "");
  };

  const handleSave = async (_id) => {
    try {
      const originalIndex = serviceRequests.findIndex((r) => r._id === _id);
      if (originalIndex === -1) return;

      const updatedRequest = {
        ...serviceRequests[originalIndex],
        status: editedStatus,
        cancelledBy: editedStatus === "cancelled" ? editedCancelledBy : "",
      };
      await axios.post("/api/dashboard/updateservicerequest", {
        _id: updatedRequest._id,
        status: updatedRequest.status,
        ...(updatedRequest.status === "cancelled" && {
          cancelledBy: updatedRequest.cancelledBy,
        }),
      });

      const updatedRequests = [...serviceRequests];
      updatedRequests[originalIndex] = updatedRequest;
      setServiceRequests(updatedRequests);
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating service request status:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  // Service options that are listed on the website
  const serviceOptions = [
    "Plumbing",
    "Electrical",
    "HVAC",
    "Carpentry",
    "Cleaning",
    "Pest Control",
    "Landscaping",
    "PAINTER",
  ];

  const accommodationOptions = ["Building", "Home"];
  const serviceNeedOptions = [
    "immediate",
    "within_a_week",
    "within_a_month",
    "time_is_flexible",
  ];

  const handleNewRequestEdit = (index) => {
    setEditIndex(index);
    setEditedStatus(serviceRequests[index].status);
    setEditedCancelledBy(serviceRequests[index].cancelledBy || "");
  };

  const handleNewRequestSave = async (index) => {
    try {
      const updatedRequest = {
        ...serviceRequests[index],
        status: editedStatus,
        cancelledBy: editedStatus === "Cancelled" ? editedCancelledBy : "",
      };
      await axios.post("/api/dashboard/updateservicerequest", {
        _id: updatedRequest._id,
        status: editedStatus,
        cancelledBy: editedStatus === "Cancelled" ? editedCancelledBy : "",
      });

      const updatedRequests = [...serviceRequests];
      updatedRequests[index] = updatedRequest;
      setServiceRequests(updatedRequests);
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating service request status:", error);
    }
  };

  const handleNewRequestChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitNewRequest = async () => {
    try {
      const response = await axios.post("/api/dashboard/createservicerequest", {
        ...newRequest,
        requestDate: new Date().toISOString(),
        status: "requested",
      });

      //   setServiceRequests((prev) => [...prev, response.data]);
      setShowNewRequestForm(false);
      setNewRequest({
        selectedService: "",
        selectedArea: "",
        accommodation: "",
        discription: "",
        serviceNeed: "",
        customerName: "",
        customerEmail: "",
        customerNumber: "",
        customerAddress: "",
        aceName: "",
        aceData: "",
      });
    } catch (error) {
      console.error("Error creating service request:", error);
    }
  };

  // Filter service providers based on selected service
  const filteredServiceProviders = newRequest.selectedService
    ? serviceProviders?.filter(
        (provider) =>
          provider.aceData.services.some((service) =>
            service
              .toLowerCase()
              .includes(newRequest.selectedService.toLowerCase())
          ) &&
          provider.aceData.serviceAreas.some((area) =>
            area.toLowerCase().includes(newRequest.selectedArea.toLowerCase())
          )
      )
    : [];

  return (
    <div className={styles.content}>
      <div className={styles.headerSection}>
        <h1>New Service Requests</h1>
        {!showNewRequestForm && (
          <CustomButton
            text={"Request Service"}
            width={"auto"}
            onClick={() => setShowNewRequestForm(true)}
          />
        )}
      </div>

      {showNewRequestForm && (
        <div className={styles.newRequestForm}>
          <h2>Create New Service Request</h2>

          <div>
            <div className={styles.formGroup}>
              <label>Requested Service:</label>
              <select
                name="selectedService"
                value={newRequest.selectedService}
                onChange={handleNewRequestChange}
                required
              >
                <option value="">Select a service</option>
                {allServices.map((service) => (
                  <option key={service} value={service}>
                    {service.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Service Area:</label>
              <select
                name="selectedArea"
                value={newRequest.selectedArea}
                onChange={handleNewRequestChange}
                required
              >
                <option value="">Select Service Area</option>
                {/* {console.log(serviceOptions, ":serviceeee")} */}
                {uniqueServiceAreas?.map((service) => (
                  <option key={service} value={service}>
                    {service.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {newRequest.selectedService && (
              <div className={styles.formGroup}>
                <label>Select Service Provider:</label>
                <div>
                  {filteredServiceProviders.length > 0 && (
                    <div className={styles.formGroup}>
                      <div className={styles.cardGrid}>
                        {filteredServiceProviders.map((provider) => (
                          <label
                            key={provider._id}
                            htmlFor={provider._id}
                            className={`${styles.providerCard} ${
                              newRequest.aceName ===
                              provider.aceData.companyName
                                ? styles.selected
                                : ""
                            }`}
                            name="aceName"
                            onClick={() => {
                              const selectedCompanyName =
                                provider.aceData.companyName;
                              const selectedAceData = {
                                _id: provider._id,
                                email: provider.aceData.companyEmail,
                                number: provider.aceData.companyNumber,
                              };

                              setNewRequest((prev) => ({
                                ...prev,
                                aceName: selectedCompanyName,
                                aceData: selectedAceData,
                              }));
                            }}
                          >
                            <div className={styles.providerInfo}>
                              <p>
                                <strong>{provider.aceData.companyName}</strong>
                              </p>
                              <p>ID: {provider._id}</p>
                              <p>Services: {provider.aceData.services}</p>
                              <p>
                                Ongoing Tasks:{" "}
                                {provider.aceData.projectsOngoing}
                              </p>
                              <p>Number: {provider.aceData.companyNumber}</p>
                              <p>Email: {provider.aceData.companyEmail}</p>
                              <p>
                                Overall Rating: {provider.aceData.overallRating}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className={styles.formGroup}>
              <label>Accommodation Type:</label>
              <select
                name="accommodation"
                value={newRequest.accommodation}
                onChange={handleNewRequestChange}
                required
              >
                <option value="">Select accommodation type</option>
                {accommodationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Service Need:</label>
              <select
                name="serviceNeed"
                value={newRequest.serviceNeed}
                onChange={handleNewRequestChange}
                required
              >
                <option value="">Select service need</option>
                {serviceNeedOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Your Name:</label>
              <input
                type="text"
                name="customerName"
                value={newRequest.customerName}
                onChange={handleNewRequestChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Your Email:</label>
              <input
                type="email"
                name="customerEmail"
                value={newRequest.customerEmail}
                onChange={handleNewRequestChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Your Phone Number:</label>
              <input
                type="tel"
                name="customerNumber"
                value={newRequest.customerNumber}
                onChange={handleNewRequestChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Your Address:</label>
              <input
                type="text"
                name="customerAddress"
                value={newRequest.customerAddress}
                onChange={handleNewRequestChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Description:</label>
              <textarea
                name="discription"
                value={newRequest.discription}
                onChange={handleNewRequestChange}
              />
            </div>
          </div>
          <div className={styles.formActions}>
            <CustomButton
              text="Submit Request"
              onClick={handleSubmitNewRequest}
              disabled={
                !newRequest.selectedService
                // || !newRequest.aceName
              }
            />
            <CustomButton
              text="Cancel"
              onClick={() => setShowNewRequestForm(false)}
              variant="secondary"
            />
          </div>
        </div>
      )}

      <div className={styles.content}>
        <h1>Service Requests</h1>
        <table className={styles.serviceTable}>
          <thead>
            <tr>
              <th>Service ID</th>
              <th>Requested Service</th>
              <th>Service Request Date & Time</th>
              <th>Accommodation Type</th>
              <th>Description</th>
              <th>Service Need</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Customer Number</th>
              <th>Form Filled Name</th>
              <th>Form Filled Email</th>
              <th>Form Filled Number</th>
              <th>Form Filled Address</th>
              <th>Ace Name</th>
              <th>Ace Number</th>
              <th>Ace Email</th>
              <th>Status</th>
              <th>Cancelled By</th>
              <th>Edit Options</th>
            </tr>
          </thead>
          <tbody>
            {serviceRequests.length > 0 ? (
              [...serviceRequests]
                .sort(
                  (a, b) => new Date(b.requestDate) - new Date(a.requestDate)
                )
                .map((request) => (
                  <tr key={request._id}>
                    <td>{request._id}</td>
                    <td>{request.selectedService}</td>
                    <td>
                      {new Date(request.requestDate).toLocaleDateString() +
                        " at " +
                        new Date(request.requestDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                    </td>
                    <td>{request.accommodation}</td>
                    <td>{request.discription}</td>
                    <td>{request.serviceNeed}</td>
                    <td>
                      {request.customerData
                        ? request.customerData.customerName
                        : "Direct"}
                    </td>
                    <td>
                      {request.customerData
                        ? request.customerData.customerEmail
                        : "Direct"}
                    </td>
                    <td>
                      {request.customerData
                        ? request.customerData.customerNumber
                        : "Direct"}
                    </td>
                    <td>{request.customerDetails.name}</td>
                    <td>{request.customerDetails.email}</td>
                    <td>{request.customerDetails.number}</td>
                    <td>{request.customerDetails.address}</td>
                    <td>{request.clientData.companyName}</td>
                    <td>{request.clientData.companyNumber}</td>
                    <td>{request.clientData.companyEmail}</td>
                    <td>
                      {editIndex === request._id &&
                      request.status !== "completed" ? (
                        <select
                          value={editedStatus}
                          onChange={(e) => setEditedStatus(e.target.value)}
                        >
                          <option value="requested" disabled>
                            Requested
                          </option>
                          <option value="accepted">Accepted</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                        </select>
                      ) : (
                        request.status
                      )}
                    </td>
                    <td>
                      {editIndex === request._id ? (
                        <select
                          value={editedCancelledBy}
                          onChange={(e) => setEditedCancelledBy(e.target.value)}
                        >
                          <option value="">Select who cancelled</option>
                          <option value="customer">Customer</option>
                          <option value="client">Client</option>
                        </select>
                      ) : (
                        request.cancelledBy || "N/A"
                      )}
                    </td>
                    <td>
                      {request.status !== "completed" &&
                        (editIndex === request._id ? (
                          <CustomButton
                            text="Save"
                            onClick={() => handleSave(request._id)}
                          />
                        ) : (
                          <CustomButton
                            text="Edit"
                            onClick={() => setEditIndex(request._id)}
                          />
                        ))}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="15" style={{ textAlign: "center" }}>
                  No service requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceRequests;
