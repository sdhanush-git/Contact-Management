import React from "react";
import ContactCardsPage from "./ContactCardsPage";
import Form from "../components/Form";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5">
        <Form />
      </div>
      <div className="lg:col-span-7">
        <ContactCardsPage />
      </div>
    </div>
  );
};

export default Hero;
