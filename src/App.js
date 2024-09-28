import React from "react";
import Users from "./pages/Users";
import Invite from "./pages/Invite";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";
import ErrorScreen from "./pages/ErrorScreen";
import Notifications from "./pages/Notifications";
import Layout from "./components/layout/Layout.jsx";
import AuthLayout from "./components/layout/Auth.jsx";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/admin" element={<Layout />}>
        <Route path="/admin/Notifications" element={<Notifications />} />
        <Route path="/admin/dashboard" exact element={<Dashboard />} />
        <Route path="/admin/invite-users" element={<Invite />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="*" element={<ErrorScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  </BrowserRouter>
);

export default App;
