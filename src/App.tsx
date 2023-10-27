import React, { useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/courses");
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return <></>;
}

export default App;
