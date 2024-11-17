import React from "react";
import "./style.less";
import "../../global.less";

import { TestimonialsData } from "../../Data/data";

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-wrapper container">
        <div className="testimonials-heading">
          <span className="tag">Testimonials</span>
          <h2>What our users say</h2>
        </div>

        {/* Testimonials Cards */}

        <div className="testimonials-cards">
          {TestimonialsData.map((testimonial) => (
            <div className="testimonial-card">
              <p>{testimonial.description}</p>
              <div className="profile flex item-center gap-4">
                <img src={testimonial.userImg} className="user-img" />
                <div className="user-detail">
                  <h3>{testimonial.displayName}</h3>
                  <span>{testimonial.userName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
