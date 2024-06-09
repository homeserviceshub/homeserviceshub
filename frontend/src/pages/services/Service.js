import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Form } from "react-bootstrap";
import CustomButton from "../../components/customBtn";
import styles from "./index.module.css";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import CustomeDropdown from "../../components/customDropdown";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SELECTEDSERVICE } from "../../redux/actions/action1";
import AOS from "aos";
import axios from "axios";

function Service() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1); // Initialize page number
  const [pageSize, setPageSize] = useState(5); // Set the number of items per page
  const clickedData = useSelector((state) => state.reducer1);
  const [allAceCategoryData, setAllAceCategoryData] = useState([]);
  const [allAceCompanyData, setAllAceCompanyData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("CategoryName");
  const [hasMoreCategoryData, setHasMoreCategoryData] = useState(false);
  const [hasMoreCompanyData, setHasMoreCompanyData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryEmpty, setIsCategoryEmpty] = useState(false);
  const [isLocationEmpty, setIsLocationEmpty] = useState(false);
  const [clickedCategory, setClickedCategory] = useState(false);
  const [totalCategories, setTotalCategories] = useState(null);
  const [totalCompanies, setTotalCompanies] = useState(null);

  const [searchData, setSearchData] = useState({
    category: clickedData || searchParams.get("category") || "",
    location: searchParams.get("location") || "",
    sortedBy: searchParams.get("sortedBy") || "Top Customer Ratings",
  });
  const handleNavigation = (city) => {
    const url = `/services/service?category=${searchData.category}&location=${
      searchData.location ? searchData.location : city
    }&sortedBy=${searchData.sortedBy}`;
    navigate(url, { replace: true });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init();
    const funct = async () => {
      await axios
        .get("https://ipapi.co/json/")
        .then((response) => {
          const { city } = response.data;
          !searchParams.get("location") &&
            setSearchData({
              ...searchData,
              location: city,
            });
          if (city) {
            fetchData(city);
          }

          handleNavigation(city);
        })
        .catch((error) => {
          console.error("Error fetching geolocation data:", error);
        });
    };
    funct();
  }, []);
  useEffect(() => {
    if (clickedCategory) {
      console.log("runnign 3");
      fetchData();
    }
  }, [clickedCategory]);
  const fetchData = async (city) => {
    setIsLoading(true);
    const authToken = localStorage.getItem("auth");
    // setHasMoreCategoryData(true);
    // setHasMoreCompanyData(true);
    try {
      const queryParams = {};
      if (searchData.category) {
        queryParams.category = searchData.category;
      }
      if (searchData.location) {
        queryParams.location = searchData.location;
      } else {
        queryParams.location = city;
      }
      if (searchData.sortedBy) {
        queryParams.sortedBy = searchData.sortedBy;
      }

      // Fetch category data
      const categoryResponse = await axios.post(
        `http://localhost:8000/filtercategorydata`,
        {
          pageNumber: 1,
          pageSize: 5,
          ...queryParams,
          authId: authToken,
        }
      );

      if (categoryResponse.status === 200) {
        setAllAceCategoryData(categoryResponse.data.users);
        setTotalCategories(categoryResponse.data.totalResults);
        if (
          categoryResponse.data.users.length === 5 &&
          categoryResponse.data.users.length <
            categoryResponse.data.totalResults
        ) {
          setHasMoreCategoryData(true);
        } else {
          setHasMoreCategoryData(false);
        }

        setPageNumber(2);
      } else {
        setHasMoreCategoryData(false);
      }

      // Fetch company data
      const companyResponse = await axios.post(
        `http://localhost:8000/filtercompanydata`,
        {
          pageNumber: 1,
          pageSize: 5,
          ...queryParams,
          authId: authToken,
        }
      );

      if (companyResponse.status === 200) {
        setAllAceCompanyData(companyResponse.data.users);
        setTotalCompanies(companyResponse.data.totalResults);
        if (
          companyResponse.data.users.length === 5 &&
          companyResponse.data.users.length < companyResponse.data.totalResults
        ) {
          setHasMoreCompanyData(true);
        } else {
          setHasMoreCompanyData(false);
        }
        setPageNumber(2);
      } else {
        setHasMoreCompanyData(false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const loadMoreCategoryData = async () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    const authToken = localStorage.getItem("auth");
    // setHasMoreCategoryData(true)
    try {
      const queryParams = {};
      if (searchData.category) {
        queryParams.category = searchData.category;
      }
      if (searchData.location) {
        queryParams.location = searchData.location;
      }
      if (searchData.sortedBy) {
        queryParams.sortedBy = searchData.sortedBy;
      }

      const response = await axios.post(
        `http://localhost:8000/filtercategorydata`,
        {
          pageNumber,
          pageSize,
          ...queryParams,
          authId: authToken,
        }
      );

      if (response.status === 200) {
        setAllAceCategoryData((prevData) => {
          const newData = response.data.users.filter(
            (newUser) =>
              !prevData.some((prevUser) => prevUser._id === newUser._id)
          );
          return [...prevData, ...newData];
        });
        if (response.data.users.length !== 5) {
          setHasMoreCategoryData(false);
        }
      } else {
        setHasMoreCategoryData(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const loadMoreCompanyData = async () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    // setIsLoading(true);
    try {
      const queryParams = {};
      if (searchData.category) {
        queryParams.category = searchData.category;
      }
      if (searchData.location) {
        queryParams.location = searchData.location;
      }
      if (searchData.sortedBy) {
        queryParams.sortedBy = searchData.sortedBy;
      }

      const response = await axios.post(
        `http://localhost:8000/filtercompanydata`,
        {
          pageNumber,
          pageSize,
          ...queryParams,
          authId: authToken,
        }
      );

      if (response.status === 200) {
        // setIsLoading(false);
        setAllAceCompanyData((prevData) => {
          const newData = response.data.users.filter(
            (newUser) =>
              !prevData.some((prevUser) => prevUser._id === newUser._id)
          );
          return [...prevData, ...newData];
        });
        if (response.data.users.length !== 5) {
          setHasMoreCompanyData(false);
        }
      } else {
        setHasMoreCompanyData(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleClick = (e) => {
    console.log(e.target.title);
    setSelectedFilter(e.target.title);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    // Check if any fields are empty
    const isCategoryFieldEmpty = searchData.category.trim() === "";
    const isLocationFieldEmpty = searchData.location.trim() === "";

    setIsCategoryEmpty(isCategoryFieldEmpty);
    setIsLocationEmpty(isLocationFieldEmpty);

    // If any fields are empty, do not proceed with the search
    if (isCategoryFieldEmpty || isLocationFieldEmpty) {
      return;
    }
    const queryParams = new URLSearchParams();
    dispatch(SELECTEDSERVICE(searchData.category));
    for (const key in searchData) {
      if (searchData[key]) {
        queryParams.append(key, searchData[key]);
      }
    }
    navigate(`/services/service?${queryParams.toString()}`);
    fetchData();
  };
  const handleCategoryClicked = (item) => {
    setClickedCategory(item);
    window.scrollTo(0, 0);
    const queryParams = new URLSearchParams();
    dispatch(SELECTEDSERVICE(item));
    for (const key in searchData) {
      if (searchData[key]) {
        queryParams.append(key, searchData[key]);
      }
    }
    console.log(item);
    console.log("before:", searchData.category);
    setSearchData((prevData) => ({
      ...prevData,
      category: item,
    }));
    console.log("after:", searchData.category);
    const url = `/services/service?category=${item}&location=${searchData.location}&sortedBy=${searchData.sortedBy}`;
    navigate(url);
  };
  return (
    <>
      <div className={styles.locationSectionOuter}>
        <Container className={styles.container}>
          <Form onSubmit={handleSearch}>
            <Row className={styles.locationSection}>
              <Col lg={3} className="py-1">
                <input
                  type="text"
                  placeholder="e.g. Plumbing, Kitchen"
                  className={`${styles.customInputField} ${
                    isCategoryEmpty ? styles.empty : ""
                  }`}
                  value={searchData.category}
                  // onChange={(e) => {
                  //   setSearchData({
                  //     ...searchData,
                  //     category: e.target.value,
                  //   });
                  // }}
                  onChange={(e) => {
                    setSearchData({
                      ...searchData,
                      category: e.target.value,
                    });
                    // Reset category field validity if the field is filled
                    if (e.target.value.trim() !== "") {
                      setIsCategoryEmpty(false);
                    }
                  }}
                />
              </Col>
              <Col lg={1} className={styles.nearText}>
                near
              </Col>
              <Col lg={3} className="py-1">
                <input
                  type="text"
                  placeholder="e.g. Punjab"
                  className={`${styles.customInputField} ${
                    isLocationEmpty ? styles.empty : ""
                  }`}
                  value={searchData.location}
                  onChange={(e) => {
                    setSearchData({
                      ...searchData,
                      location: e.target.value,
                    });
                    // Reset location field validity if the field is filled
                    if (e.target.value.trim() !== "") {
                      setIsLocationEmpty(false);
                    }
                  }}
                />
                {/* {isLocationEmpty && (
                  <span style={{ color: "red" }}>Location cannot be empty</span>
                )} */}
              </Col>
              <Col className={`${styles.dropdownBtn} py-4`}>
                <CustomeDropdown
                  onChange={(selectedService) => {
                    setSearchData({
                      ...searchData,
                      sortedBy: selectedService,
                    });
                  }}
                />
              </Col>
              <Col className={`${styles.searchBtn} py-2`} lg={2}>
                <CustomButton
                  text={"Search"}
                  type={"submit"}
                  // onSubmit={handleSearch}
                  // onClick={() => console.log(searchData)}
                />
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <div className={styles.totalResultSectionOuter}>
        <Container className={styles.container}>
          <div className={styles.totalResultSection}>
            <div
              lg={3}
              title="CategoryName"
              className={`${styles.totalResultSectionCol} ${
                selectedFilter == "CategoryName" ? styles.active : ""
              }`}
              onClick={handleClick}
            >
              Category Matched({totalCategories})
            </div>
            <div
              title="CompanyName"
              lg={3}
              className={`${styles.totalResultSectionCol} ${
                selectedFilter == "CompanyName" ? styles.active : ""
              }`}
              onClick={handleClick}
            >
              Company Matched({totalCompanies})
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.mainDynamicSectionOuter}>
        <Container className={styles.container}>
          {selectedFilter === "CategoryName" ? (
            // Check if not loading
            !isLoading ? (
              // All Ace Category Data Section
              allAceCategoryData.length ? (
                <Row className={styles.mainDynamicSection}>
                  <Col lg={12}>
                    {allAceCategoryData?.map((item, index) => (
                      <Row
                        className={styles.dynamicRow}
                        key={index}
                        data-aos="fade-up"
                      >
                        <Col lg={2}>
                          <img
                            src={
                              item.aceData.profilePhoto
                                ? `http://localhost:8000/images/${item.aceData.profilePhoto.path}`
                                : process.env.PUBLIC_URL +
                                  "/icons/default-profile-picture-male-icon.svg"
                            }
                            onClick={() =>
                              navigate(`/companyprofile/${item._id}`)
                            }
                            width={160}
                            height={130}
                            className={styles.profilePhoto}
                          />
                        </Col>
                        <Col lg={6}>
                          <div
                            className={styles.companyName}
                            onClick={() =>
                              navigate(`/companyprofile/${item._id}`)
                            }
                          >
                            {item.aceData.companyName}
                          </div>
                          <div className={styles.companyDetails}>
                            {[...Array(5)].map((_, index) => {
                              const rating = Number(
                                item.aceData?.overallRating
                              );
                              const fullStars = Math.floor(rating);
                              const hasHalfStar = rating - fullStars >= 0.5;
                              return (
                                <span key={index}>
                                  {index < fullStars ? (
                                    <BsStarFill fill="gold" />
                                  ) : index === fullStars && hasHalfStar ? (
                                    <BsStarHalf fill="gold" />
                                  ) : (
                                    <BsStar fill="gold" />
                                  )}
                                </span>
                              );
                            })}
                          </div>
                          <div className={styles.companySmallDetails}>
                            <div className={styles.companyDetails}>
                              ({item.aceData.totalReviews}) Reviews
                            </div>
                            <div className={styles.companyDetails}>
                              {new Date().getFullYear() -
                                item.aceData.yearOfEstablishment}
                              + Year Experience
                            </div>
                          </div>
                          <div className={styles.companyDetails}>
                            {item.aceData.brief.length <= 160
                              ? item.aceData.brief
                              : `${item.aceData.brief.slice(0, 160)}... `}
                            <Link
                              style={{ color: "green" }}
                              to={`/companyprofile/${item._id}`}
                            >
                              read more
                            </Link>
                          </div>
                        </Col>
                        <Col lg={2} className={styles.verifiedPhotoDiv}></Col>
                        <Col lg={2} className={styles.bothBtns}>
                          <CustomButton
                            text="Request a service"
                            height="auto"
                            onClick={() =>
                              navigate(`/${item._id}/servicerequest`)
                            }
                          />
                          <CustomButton
                            text="Profile"
                            height="auto"
                            onClick={() =>
                              navigate(`/companyprofile/${item._id}`)
                            }
                          />
                        </Col>
                        <Col lg={8} className={styles.categoryList}>
                          Category:{" "}
                          {item.aceData.categories.map((category, index) => (
                            <span
                              key={index}
                              onClick={() => handleCategoryClicked(category)}
                              className={styles.categories}
                            >
                              {category}
                            </span>
                          ))}
                        </Col>
                      </Row>
                    ))}
                  </Col>
                  {hasMoreCategoryData && (
                    <CustomButton
                      text={
                        isLoading ? (
                          <Spinner
                            animation="border"
                            className={styles.signInLoader}
                          />
                        ) : (
                          "Load More"
                        )
                      }
                      onClick={loadMoreCategoryData}
                    />
                  )}
                </Row>
              ) : (
                // No data found message and suggestions
                <Row className={styles.mainDynamicSection}>
                  <Col lg={12} className={styles.error}>
                    Oops! Nothing was found for your search. Please try
                    different search criteria.
                  </Col>
                  <Col lg={12} className={styles.errorSuggestion}>
                    Top Searches: Carpenter, Kitchen Renovation, or See all
                    categories
                  </Col>
                  <h3 className={styles.errorSuggestionHeading}>
                    Some suggestions:
                  </h3>
                  <ul className={styles.errorSuggestionList}>
                    <li>Double check your spelling</li>
                    <li>Try another search</li>
                    <li>Add a company to our directory</li>
                  </ul>
                </Row>
              )
            ) : (
              // Display loading spinner when isLoading is true
              <div className={styles.spinnerDiv}>
                <Spinner animation="border" className={styles.signInLoader} />
              </div>
            )
          ) : // Handle other filters case
          !isLoading ? (
            allAceCompanyData.length ? (
              <Row className={styles.mainDynamicSection}>
                <Col lg={12}>
                  {allAceCompanyData?.map((item, index) => (
                    <Row
                      className={styles.dynamicRow}
                      key={index}
                      data-aos="fade-up"
                    >
                      <Col lg={2}>
                        <img
                          src={
                            item.aceData.profilePhoto
                              ? `http://localhost:8000/images/${item.aceData.profilePhoto.path}`
                              : process.env.PUBLIC_URL +
                                "/icons/default-profile-picture-male-icon.svg"
                          }
                          width={160}
                          height={130}
                          className={styles.profilePhoto}
                        />
                      </Col>
                      <Col lg={6}>
                        <div className={styles.companyName}>
                          {item.aceData.companyName}
                        </div>
                        <div className={styles.companyDetails}>
                          {[...Array(5)].map((_, index) => {
                            const rating = Number(item.aceData?.overallRating);
                            const fullStars = Math.floor(rating);
                            const hasHalfStar = rating - fullStars >= 0.5;
                            return (
                              <span key={index}>
                                {index < fullStars ? (
                                  <BsStarFill fill="gold" />
                                ) : index === fullStars && hasHalfStar ? (
                                  <BsStarHalf fill="gold" />
                                ) : (
                                  <BsStar fill="gold" />
                                )}
                              </span>
                            );
                          })}
                        </div>
                        <div className={styles.companySmallDetails}>
                          <div className={styles.companyDetails}>
                            ({item.aceData.totalReviews}) Reviews
                          </div>
                          <div className={styles.companyDetails}>
                            {new Date().getFullYear() -
                              item.aceData.yearOfEstablishment}
                            + Year Experience
                          </div>
                        </div>
                        <div className={styles.companyDetails}>
                          {item.aceData.brief.length <= 160
                            ? item.aceData.brief
                            : `${item.aceData.brief.slice(0, 160)}... `}
                          <Link
                            style={{ color: "green" }}
                            to={`/companyprofile/${item._id}`}
                          >
                            read more
                          </Link>
                        </div>
                      </Col>
                      <Col lg={2} className={styles.verifiedPhotoDiv}></Col>
                      <Col lg={2} className={styles.bothBtns}>
                        <CustomButton
                          text="Request a service"
                          height="auto"
                          onClick={() =>
                            navigate(`/${item._id}/servicerequest`)
                          }
                        />
                        <CustomButton
                          text="Profile"
                          height="auto"
                          onClick={() =>
                            navigate(`/companyprofile/${item._id}`)
                          }
                        />
                      </Col>
                      <Col lg={8} className={styles.categoryList}>
                        Category:{" "}
                        {item.aceData.categories.map((category, index) => (
                          <span
                            key={index}
                            onClick={() => handleCategoryClicked(category)}
                            className={styles.categories}
                          >
                            {category}
                          </span>
                        ))}
                      </Col>
                    </Row>
                  ))}
                </Col>
                {hasMoreCompanyData && (
                  <CustomButton
                    text={
                      isLoading ? (
                        <Spinner
                          animation="border"
                          className={styles.signInLoader}
                        />
                      ) : (
                        "Load More"
                      )
                    }
                    onClick={loadMoreCompanyData}
                  />
                )}
              </Row>
            ) : (
              // No data found message and suggestions
              <Row className={styles.mainDynamicSection}>
                <Col lg={12} className={styles.error}>
                  Oops! Nothing was found for your search. Please try different
                  search criteria.
                </Col>
                <Col lg={12} className={styles.errorSuggestion}>
                  Top Searches: Carpenter, Kitchen Renovation, or See all
                  categories
                </Col>
                <h3 className={styles.errorSuggestionHeading}>
                  Some suggestions:
                </h3>
                <ul className={styles.errorSuggestionList}>
                  <li>Double check your spelling</li>
                  <li>Try another search</li>
                  <li>Add a company to our directory</li>
                </ul>
              </Row>
            )
          ) : (
            // Display loading spinner when isLoading is true
            <div className={styles.spinnerDiv}>
              <Spinner animation="border" className={styles.signInLoader} />
            </div>
          )}
        </Container>
      </div>
    </>
  );
}

export default Service;
