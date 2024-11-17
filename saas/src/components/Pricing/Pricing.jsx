import React from "react";
import "./style.less";
import "../../global.less";

import { pricingData } from "../../Data/data";

import checkmark from "../../assets/checkmark.svg";
import whiteCheckmark from "../../assets/white-checkmark.svg";

const Pricing = () => {
  return (
    <section className="pricing-section">
      <div className="pricing-wrapper container">
        {/* Pricing Heading */}
        <div className="pricing-headings">
          <span className="tag">Boost your productivity</span>
          <h2>
            A more effective way
            <br className="break" /> to track progress
          </h2>
          <p>
            Effortlessly turn your ideas into a fully functional,{" "}
            <br className="break" /> responsive, no-code SaaS website in just
            minutes with <br className="break" /> the set of free components for
            Framer.
          </p>
        </div>

        {/* Pricing Cards */}

        <div className="pricing-cards">
          {pricingData.map((item) => (
            <div className={`pricing-card ${item.planType}`}>
              <div className="flex item-center justify-between width-full">
                <span className="plan-type">{item.planType}</span>
                {item.planType === "Pro" ? (
                  <span className="tag">Most Popular</span>
                ) : (
                  ""
                )}
              </div>
              <div className="flex item-center">
                <h3>${item.price}</h3>
                <span>/{item.duration}</span>
              </div>
              <button className="cta-btn">{item.button}</button>
              <ul className="pricing-features">
                {item.features.map((feature) => (
                  <li className="flex item-center gap-4">
                    <img
                      src={item.planType === "Pro" ? whiteCheckmark : checkmark}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
