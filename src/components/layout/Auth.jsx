import React from "react";
import Login from "../../pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";

const Auth = () => (
  <div style={{ width: "100%" }}>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  </div>
);
export default Auth