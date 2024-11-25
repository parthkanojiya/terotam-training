/* Default Light Mode Code with local storage */

import React, { Component } from "react";

const ThemeContext = React.createContext();

export class ThemeProvider extends Component {
  constructor(props) {
    super(props);
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    const storedTheme = localStorage.getItem("theme");

    this.state = {
      isDarkMode: storedTheme ? storedTheme === "dark" : prefersDark,
    };
  }

  toggleTheme = () => {
    const newTheme = !this.state.isDarkMode;
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    this.setState({ isDarkMode: newTheme });
    document.documentElement.setAttribute(
      "data-theme",
      newTheme ? "dark" : "light"
    );
  };

  componentDidMount() {
    const theme = this.state.isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }

  render() {
    const theme = this.state.isDarkMode ? "dark" : "light";
    return (
      <ThemeContext.Provider
        value={{
          theme,
          toggleTheme: this.toggleTheme,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeContext;
