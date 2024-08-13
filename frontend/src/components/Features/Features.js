import React from "react";
import Feature from "../Feature/Feature";
import "../Features/Features.css";

const Features = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <Feature
        imgSrc="./img/icon-chat.png"
        imgAlt="Chat Icon"
        title="You are our #1 priority"
      >
        Need to talk to a representative? You can get in touch through our 24/7
        chat or through a phone call in less than 5 minutes.
      </Feature>
      <Feature
        imgSrc="./img/icon-money.png"
        imgAlt="Money Icon"
        title="More savings means higher rates"
      >
        The more you save with us, the higher your interest rate will be!
      </Feature>
      <Feature
        imgSrc="./img/icon-security.png"
        imgAlt="Security Icon"
        title="Security you can trust"
      >
        We use top of the line encryption to make sure your data and money is
        always safe.
      </Feature>
    </section>
  );
};

export default Features;
