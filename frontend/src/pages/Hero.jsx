import React from "react";
import ContactCardsPage from "./ContactCardsPage";
import Form from "../components/Form";

const Hero = () => {
  return (
    <div className=" grid grid-cols-3">
      <div>
        <Form />
      </div>
      <div>
        <ContactCardsPage />
      </div>
    </div>
  );
};

export default Hero;
