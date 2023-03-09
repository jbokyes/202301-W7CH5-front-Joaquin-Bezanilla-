import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/home/home";
import { RegisterForm } from "../components/register.form/register.form";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/register" element={<RegisterForm></RegisterForm>}></Route>
      </Routes>
    </div>
  );
}

export default App;
