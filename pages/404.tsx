import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="error-container">
      <div className="error-body">
        <h1>404</h1>
        <h3>Oops! Page Not Found</h3>
        <p>We are sorry, the page you were trying to reach is not found </p>
      </div>
    </div>
  );
};

export default NotFound;
