import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import CounterPage from "./pages/CounterPage/CounterPage";
import { Routes, Route } from "react-router-dom";


// TODO: Add Routes for Home and CounterPage
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/counter" element={<CounterPage />}/>
      </Routes>
    </div>
  );
}

export default App;