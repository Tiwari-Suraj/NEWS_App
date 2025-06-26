import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-600 text-sm ">
      <div className="flex flex-col items-center py-6 space-y-4">
        <div className="flex items-center">
          <div className=" text-black font-semibold text-2xl px-2 py-1 rounded-md mr-2 italic">
            DAILYMOTION
          </div>
        </div>

        {/* First row of links */}
        <ul className="flex flex-wrap justify-center gap-4 font-medium text-gray-800">
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Press</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Jobs</a>
          </li>
          <li>
            <a href="#">Advertisers</a>
          </li>
          <li>
            <a href="#">Dailymotion Pro</a>
          </li>
          <li>
            <a href="#">Developers</a>
          </li>
          <li>
            <a href="#">Help Center</a>
          </li>
        </ul>

        {/* Second row of links */}
        <ul className="flex flex-wrap justify-center gap-4">
          <li>
            <a href="#">Privacy and Cookie Policy</a>
          </li>
          <li>
            <a href="#">Accessibility</a>
          </li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>
            <a href="#">Legal notices</a>
          </li>
          <li>
            <a href="#">
              Hide sensitive content: <strong>On</strong>
            </a>
          </li>
          <li>
            <a href="#">All videos</a>
          </li>
          <li>
            <a href="#">
              Location: <strong>India</strong>
            </a>
          </li>
        </ul>

        {/* Social icons */}
        <div className="flex gap-4 text-xl">
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-center mt-2">
          Designed and build by Suraj Tiwari, 2025 © All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
