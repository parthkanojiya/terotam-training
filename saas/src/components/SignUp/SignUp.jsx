import React from "react";
import "./style.less";
import "../../global.less";

import rightArrow from "../../assets/right-arrow.svg";
import emojistar from "../../assets/emojistar.svg";
import helix2 from "../../assets/helix2.svg";

const SignUp = () => {
  return (
    <section className="sign-up-section">
      <div className="sign-up-wrapper container">
        <img src={emojistar} className="emojistar" />
        <div className="sign-up-content">
          <h2>Sign up for free today</h2>
          <p>
            Celebrate the joy of accomplishment with an app designed
            <br /> to track your progress and motivate your efforts.
          </p>
          <div className="sign-up-cta flex item-center gap-4">
            <button className="cta-btn">Get for free</button>
            <span class="flex item-center gap-4 font-medium">
              Learn more
              <img src={rightArrow} alt="arrow" />
            </span>
          </div>
        </div>
        <img src={helix2} className="helix2" />
      </div>
    </section>
  );
};

export default SignUp;
