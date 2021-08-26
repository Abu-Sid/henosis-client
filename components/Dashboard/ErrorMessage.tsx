import React, { useState, useEffect } from "react";
import Link from "next/link";
import LoadingAnimation from "../ui/Animation/LoadingAnimation";

const ErrorMessage = () => {
  return (
    <div className="error-container">
      <div className="error-body">
        <h1>403</h1>
        <h3>Access Denied/Forbidden</h3>
        <p>
          The page you were trying to reach is absolutely forbidden by Henosis
          policy{" "}
        </p>
        <>
          Visit{" "}
          <Link href="https://henosis.vercel.app/">
            <a>https://henosis.vercel.app/</a>
          </Link>
        </>
      </div>
    </div>
  );
};
export default ErrorMessage;
