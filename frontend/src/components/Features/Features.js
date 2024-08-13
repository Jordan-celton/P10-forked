import React from "react";
import Feature from "../Feature/Feature";
import "../Features/Features.css";
import iconChat from "./icon-chat.webp";
import iconMoney from "./icon-money.webp";
import iconSecurity from "./icon-security.webp";

const Features = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      <Feature
        imgSrc={iconChat}
        imgAlt="Chat Icon"
        title="You are our #1 priority"
      >
        Need to talk to a representative? You can get in touch through our 24/7
        chat or through a phone call in less than 5 minutes.
      </Feature>
      <Feature
        imgSrc={iconMoney}
        imgAlt="Money Icon"
        title="More savings means higher rates"
      >
        The more you save with us, the higher your interest rate will be!
      </Feature>
      <Feature
        imgSrc={iconSecurity}
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
