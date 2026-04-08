import React from "react";
import { Link } from "react-router-dom";
import { useContext} from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Navbar.css";

// TODO: Add navigation links to Home and CounterPage
// TODO: Add a theme toggle button
// TODO: Use useContext to access theme and toggle function
// TODO: Apply class "navbar-light" or "navbar-dark" using ternary operator based on theme
// TODO: Create Navbar.css with styles for navbar-light and navbar-dark
function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return <nav className={theme === "dark" ? "navbar navbar-dark" : "navbar navbar-light"}>
    <Link className="nav-link" to="/home">Home</Link>
    <Link className="nav-link" to="/counter">Counter</Link>
    <button onClick={toggleTheme}>Toggle Theme</button>
  </nav>;
}

export default Navbar;