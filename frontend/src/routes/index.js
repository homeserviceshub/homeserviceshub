import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import Layout, { Layout2 } from "../components/layout";
import Signin from "../pages/auth/signIn";
import Services from "../pages/services";
import Signup from "../pages/auth/signUp";
import ResetPasword from "../pages/auth/resetPassword";
import Profile from "../pages/profile";
import ServiceRequest from "../pages/ace/serviceRequest";
import CompanyProfile from "../pages/companyProfile";
import PageNotFound from "../pages/pageNotFound";
import AceReviews from "../pages/ace/reviews/reviews";
import AceProfile from "../pages/ace/profile/profile";
import AceGallery from "../pages/ace/gallery/gallery";
import AceSignUp from "../pages/ace/auth/signUp";
import AceSignIn from "../pages/ace/auth/signIn";
import AboutUs from "../pages/aboutUs";
import Faq from "../pages/faq";
import Careers from "../pages/careers";
import ContactUs from "../pages/contactus";
import Service from "../pages/services/Service";
import RequestaService from "../pages/requestAservice";
import NewReview from "../pages/newReview";
import PrivateRoute from "./privateRoute";
import AuthCheckRoute from "./authCheckRoute";
import Verification from "../pages/ace/verification";
import Plans from "../pages/plans";
import AceCheckRoute from "./aceCheckRoute";
import Dashboard from "../pages/dashboard";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPasword />} />
        <Route path="/ace" element={<AceSignUp />} />
        <Route path="/ace/signin" element={<AceSignIn />} />
        <Route path="/ace/verification" element={<Verification />} />

        <Route path="/api/admin/dashboard/*" element={<Dashboard />} />

        <Route element={<Layout />}>
          <Route path="/user/profile" element={<PrivateRoute />}>
            <Route path="/user/profile" element={<Profile />} />
          </Route>
          <Route element={<AuthCheckRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/service" element={<Service />} />
            <Route path="/:id/servicerequest" element={<RequestaService />} />
            <Route path="/review/:id/new" element={<NewReview />} />
            <Route path="/companyprofile/:id" element={<CompanyProfile />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Route>

        <Route element={<Layout2 />}>
          <Route element={<AceCheckRoute />}>
            <Route path="/ace">
              <Route path="/ace/reviews" element={<AceReviews />} />
              <Route path="/ace/profile" element={<AceProfile />} />
              <Route path="/ace/gallery" element={<AceGallery />} />
              <Route path="/ace/request" element={<ServiceRequest />} />
              <Route path="/ace/plans" element={<Plans />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
