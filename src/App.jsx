import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './Home.jsx';
import Contact from './Contact.jsx';
import About from './About.jsx';
import Login from './Login.jsx'
import './App.css';
import Menu from './Menu.jsx';
import Dashboard from "./Dashboard.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (username, password) => {
    const newUser = { name: username, password }; // store both
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser)); // persist login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      <Menu user={user} handleLogout={handleLogout} />

      <h1>Hi this is Draft Webpage</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/dashboard" element={ <Dashboard user={user} />} />
      </Routes>
    </>
  );
}
