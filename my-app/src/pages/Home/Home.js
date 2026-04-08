import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

// TODO: Add content for Home page (welcome message or description)
// TODO: Use useContext to access theme and style accordingly
function Home() {
  const { theme } = useContext(ThemeContext);
  return <div>
    <h1>Welcome</h1>
    <p> The theme is {theme}</p>
  </div>;
}

export default Home;