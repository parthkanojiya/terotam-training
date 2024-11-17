import React from "react";
import "./style.less";
import "../../global.less";

import logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer>
      <div class="footer-wrapper container">
        <div class="about">
          <img src={logo} alt="logo" />
          <p>
            Saas Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Consequat
          </p>
        </div>

        <div class="company">
          <h3 class="ftr-headings">Company</h3>
          <ul class="ftr-lists">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press Kit</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div class="resources">
          <h3 class="ftr-headings">Resources</h3>
          <ul class="ftr-lists">
            <li>Blog</li>
            <li>Help Center</li>
            <li>UX Research Guide</li>
            <li>Case Studies</li>
          </ul>
        </div>

        <div class="product">
          <h3 class="ftr-headings">Product</h3>
          <ul class="ftr-lists">
            <li>Pricing</li>
            <li>Enterprise</li>
            <li>Integrate</li>
            <li>What's New</li>
          </ul>
        </div>
      </div>

      <div class="copyright container">
        <p>Copyright © 2022 Musemind | All rights roserved.</p>
        <p>Terms & Privarcy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
