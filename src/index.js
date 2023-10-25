import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNewCourse from "./pages/AddNewCourse";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-new-course" element={<AddNewCourse />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
