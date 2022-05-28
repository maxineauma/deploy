import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Members from "./pages/Members";
import Logout from "./pages/Logout";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Navigate to="/dashboard" />} />
        <Route exact path="/dashboard" element={<Home />} />
        <Route exact path="/members" element={<Members />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
