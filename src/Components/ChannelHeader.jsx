import React from "react";
import logo from "../assets/HW_News_logo.png"; // adjust the path if needed

const ChannelHeader = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="HW News Logo"
          className="w-24 h-24 rounded-md object-cover"
        />
        <div>
          <h1 className="text-xl font-bold">HW News Network</h1>
          <p className="text-gray-600 text-sm max-w-xs">
            In the highly patronized, clichéd and oblique media world, HW News
            emerges as an upright news channel that breaks stereotype and speaks
            truth.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2  mt-4 rounded-md">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;
