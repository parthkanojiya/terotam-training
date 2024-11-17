import React from "react";
import "./style.less";
import "../../global.less";

import RightArrow from "../../assets/right-arrow.svg";
import cylinder from "../../assets/cylinder.svg";
import visual from "../../assets/visual.svg";
import halfTorus from "../../assets/half-torus.svg";

const Hero = () => {
  return (
    <section className="hero-section hero-gradient">
      <div className="hero-wrapper container flex item-center justify-between">
        {/* Content */}
        <div className="hero-content">
          <span className="tag">Version 2.0 is here</span>
          <h1>Pathway to productivity</h1>
          <p className="hero-description">
            Celebrate the joy of accomplishment with an
            <br className="break" /> app designed to track your progress,
            motivate
            <br className="break" /> your efforts, and celebrate your successes.
          </p>
          <div className="hero-cta flex item-center gap-4">
            <button className="cta-btn">Get for free</button>
            <span className="flex item-center gap-4 font-medium">
              Learn more <img src={RightArrow} alt="arrow" />
            </span>
          </div>
        </div>
        {/* Image */}
        <div className="hero-img">
          <img src={cylinder} alt="cylinder" className="cylinder" />
          <img src={visual} alt="visual" className="visual" />
          <img src={halfTorus} alt="halfTorus" className="halfTorus" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
