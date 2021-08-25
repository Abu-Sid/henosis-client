import React, { useState, useEffect } from "react";
import Link from "next/link";
import LoadingAnimation from "../ui/Animation/LoadingAnimation";

const ErrorMessage = () => {
  // const [loading, setLoading] = useState(true);
  // const [admins, setAdmins] = useState([]);
  // useEffect(() => {
  //   const isAdmin = async () => { 
  //     try{
  //       const res = await fetch(
  //         "https://intense-peak-24388.herokuapp.com/admin"
  //       )
  //       const data = await res.json()
  //         setAdmins(data.data)
  //     }
  //     catch (error) {
  //       console.log(error);
  //     }
  // }
  // }, [admins]);

  // useEffect(() => {
  //   if (admins.length !== 0) {
  //     setLoading(false);
  //   }
  // }, [admins]);

  return (
    <div className="error-container">
      {/* {loading ? (
        <LoadingAnimation />
      ) : ( */}
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
      {/* )} */}
    </div>
  );
};
export default ErrorMessage;
