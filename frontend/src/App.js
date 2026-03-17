import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavigationBar";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/home";
import RoomsPage from "./pages/Room";
import ContactPage from "./pages/Contact";
import BookRoom from "./pages/BookRoom";
import ServicesPage from './pages/Services';


const WithNavbar = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<WithNavbar><HomePage /></WithNavbar>} />
        <Route path="/rooms" element={<WithNavbar><RoomsPage /></WithNavbar>} />
      <Route path="/services" element={<WithNavbar><ServicesPage /></WithNavbar>} />
        <Route path="/book-room" element={<WithNavbar><BookRoom /></WithNavbar>} />

        

        <Route path="/contact" element={<WithNavbar><ContactPage /></WithNavbar>} />
      </Routes>
    </Router>
  );
}

export default App;
