import React from "react";
import "./style.less";
import "../../global.less";

import product from "../../assets/product-image.svg";
import torus from "../../assets/torus.svg";
import pyramid from "../../assets/pyramid.svg";
import rightArrow from "../../assets/right-arrow.svg";

import { productCardsData } from "../../Data/data";
// import ecosystem from "../../assets/ecosystem.svg";
// import goal from "../../assets/goal.svg";
// import encryption from "../../assets/encryption.svg";
// import notifications from "../../assets/notifications.svg";

const Product = () => {
  return (
    <section className="product-section">
      <div className="product-wrapper container">
        <div className="product-headings">
          <span className="tag">Boost your productivity</span>
          <h2>
            A more effective way
            <br /> to track progress
          </h2>
          <p>
            Effortlessly turn your ideas into a fully functional,
            <br className="break" /> responsive, no-code SaaS website in just
            minutes with
            <br className="break" /> the set of free components for Framer.
          </p>
        </div>

        {/* Product Image */}
        <div className="product-images">
          <img src={torus} alt="torus" className="torus" />
          <img src={product} alt="product image" className="product" />
          <img src={pyramid} alt="pyramid" className="pyramid" />
        </div>

        {/* Product Features */}
        <div className="product-features-wrapper">
          <div className="product-cards">
            {productCardsData.map((product) => (
              <div className="product-card">
                <img src={product.img} />
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <button>
                  {product.button} <img src={rightArrow} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
