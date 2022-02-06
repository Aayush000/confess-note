import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Aboutus from "./pages/Aboutus";

const App = () => {
  return (
    <Router>
      <Navbar /> {/*since it is in both pages*/}
      <Routes>
        {/* path="/" or index --> same ho */}
        <Route path="/" element={<Homepage />} />
        <Route path="/aboutus" element={<Aboutus />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
