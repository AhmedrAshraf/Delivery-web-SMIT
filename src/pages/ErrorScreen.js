import React from "react";
import { Link } from "react-router-dom";
import "./ErrorScreen.css";

const ErrorScreen = () => {
  return (
    <div id="errorScreen">
      <div className="notfound">
        <div className="errorCode">
          <h1>Error 404</h1>
        </div>
        <h2>We are sorry, Page not found!</h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link to="/admin/dashboard">Back To HomePage</Link>
      </div>
    </div>
  );
};

export default ErrorScreen;
