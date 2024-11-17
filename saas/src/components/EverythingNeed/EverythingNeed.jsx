import React from "react";
import "./style.less";
import "../../global.less";

import cubeHelix from "../../assets/cube-helix.svg";
import cubeHelix2 from "../../assets/cube-helix-2.svg";

const EverythingNeed = () => {
  return (
    <section className="everything-section">
      <div className="everything-wrapper container">
        <div className="everything-headings">
          <span className="tag">Everything you need</span>
          <h2>
            Streamlined for easy
            <br className="break" /> management
          </h2>
          <p>
            Enjoy customizable lists, team work tools, and smart
            <br className="break" /> tracking all in one place. Set tasks, get
            <br className="break" /> reminders, and
            <br className="break" /> see your progress simply and quickly.
          </p>
        </div>

        {/* everythings cards */}
        <div className="everything-cards">
          <div className="everything-card">
            <img src={cubeHelix} alt="cubeHelix" />
            <h3>Integration ecosystem</h3>
            <p>
              Enhance your productivity by connecting with your favorite tools,
              keeping all your essentials in one place.
            </p>
          </div>

          <div className="everything-card">
            <img src={cubeHelix2} alt="cubeHelix2" />
            <h3>Integration ecosystem</h3>
            <p>
              Enhance your productivity by connecting with your favorite tools,
              keeping all your essentials in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EverythingNeed;
