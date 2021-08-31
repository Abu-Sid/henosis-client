import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`https://intense-peak-24388.herokuapp.com/user`)
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, []);
  return (
    <footer className="container">
      <div className="row">
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Phone: +88 017 123 654 45</p>
          <p>Address: 385 Lane - 6, Dhaka, 1206</p>
          <div className="icons">
            <span>
              <FaInstagram />
            </span>
            <span>
              <FaFacebook />
            </span>
            <span>
              <FaTwitter />
            </span>
            <span>
              <FaLinkedinIn />
            </span>
          </div>
        </div>
        <div className="footer-menu">
          <h4>Menu</h4>
          <p>
            <Link href="/features">
              <a>Features</a>
            </Link>
          </p>
          <p>
            <Link href="/pricing">
              <a>Pricing</a>
            </Link>
          </p>
          <p>
            <Link href="/new-workspace">
              <a>Create a new workspace</a>
            </Link>
          </p>
          <p>
            <Link href="/workspaces">
              <a>Existing workspace</a>
            </Link>
          </p>
        </div>
        <div>
          <div className="footer-sign-up">
            <h3>We have {users.length - 1}+ users</h3>
            <p>
              Sign up and get started with Henosis today. <br />A world of
              productive teamwork awaits!
            </p>
            <div className="act-input">
              <input type="text" placeholder="Email" />
              <button className="button-primary">Signup</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-purple-ball"></div>
      <div className="footer-purple-dots"></div>
      <div className="footer-gray-dots"></div>

      <div className="footer-bottom">
        <p>
          &copy; Copyright {new Date().getFullYear()}. All Rights Reserved by
          Henosis.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
