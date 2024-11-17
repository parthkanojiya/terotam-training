import React from "react";
import "./style.less";
import "../../global.less";

// Logo
import Logo from "../../assets/logo.svg";

const navLinks = ["About", "Features", "Customers", "Updates", "Help"];

const Header = () => {
  return (
    <header>
      <div className="header-wrapper px-5 flex justify-between item-center">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>

        <div className="navbar-cta flex justify-between item-center gap-4">
          <nav>
            <ul className="flex justify-between item-center gap-8">
              {navLinks.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </nav>
          <button className="cta-btn">Get for free</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
