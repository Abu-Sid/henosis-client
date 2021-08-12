import Link from "next/link";
import React from "react";
import { FaFacebookSquare, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='container'>
      <div className='row'>
        <div>
          <h4>Contact</h4>
          <p>Phone: +88 017 123 654 45</p>
          <p>Address: 385 Lane - 6, Dhaka, 1206</p>
          <div className='icons'>
            <span>
              <FaFacebookSquare />
            </span>
            <span>
              <FaLinkedin />
            </span>
          </div>
        </div>
        <div>
          <h4>Menu</h4>
          <p>
            <Link href='/features'>
              <a>Features</a>
            </Link>
          </p>
          <p>
            <Link href='/'>
              <a>Pricing</a>
            </Link>
          </p>
          <p>
            <Link href='/features'>
              <a>Create a new workspace</a>
            </Link>
          </p>
          <p>
            <Link href='/features'>
              <a>Existing workspace</a>
            </Link>
          </p>
        </div>
        <div>
          <div className='footer-sign-up'>
            <p>
              Sign up and get started with Henosis today. <br />A world of productive teamwork awaits!
            </p>
            <div className='act-input'>
              <input type='text' placeholder='Email' />
              <button className='button-primary'>Signup</button>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-purple-ball'></div>
      <div className='footer-purple-dots'></div>
      <div className='footer-gray-dots'></div>

      <div className='footer-bottom'>
        <p>
          &copy; Copyright {new Date().getFullYear()}. All Rights Reserved by
          Henosis.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
