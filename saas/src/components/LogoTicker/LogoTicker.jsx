import React from "react";
import Marquee from "react-fast-marquee";

import "./style.less";
import "../../global.less";

// Images
import acme from "../../assets/acme.svg";
import apex from "../../assets/apex.svg";
import celestia from "../../assets/celestia.svg";
import echo from "../../assets/echo.svg";
import pulse from "../../assets/pulse.svg";
import quantum from "../../assets/quantum.svg";

const logos = [acme, apex, celestia, echo, pulse, quantum];

const LogoTicker = () => {
  return (
    <section className="logo-ticker">
      <div className="logo-ticker-wrapper container">
        <Marquee
          className="flex item-center justify-between gap-8"
          autoFill={true}
          pauseOnHover={true}
          gradient={true}
          speed={40}
        >
          {logos.map((logo, index) => (
            <span className="flex item-center justify-between gap-8">
              <img src={logo} key={index} />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default LogoTicker;
