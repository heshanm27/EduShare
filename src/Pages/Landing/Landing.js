import React from "react";
import Footer from "../../Components/Footer/Footer";
import CustomNavBar from "../../Components/NavBar/CustomNavBar";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./ContactUs/ContactUs";
import Home from "./Home/Home";
import NewOpportunities from "./NewOpportunities/NewOpportunities";
import Partnered from "./Partnered/Partnered";

export default function Landing() {
  return (
    <>
      <CustomNavBar />
      <Home />
      <AboutUs />
      <NewOpportunities />
      <Partnered />
      <ContactUs />
      <Footer />
    </>
  );
}
