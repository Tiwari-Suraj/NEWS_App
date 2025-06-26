import React, { useState } from "react";
import { Menu, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSidebar, setSearchTerm } from "../redux/videoSlice";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchInput));
  };

  return (
    <nav className=" bg-white fixed top-0 z-50 w-full">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-35">
          <div className="flex items-center">
            <div className=" text-black font-semibold text-2xl px-2 py-1 rounded-md mr-2 italic">
              DAILYMOTION
            </div>
          </div>
          <button onClick={handleToggleSidebar} className="md:hidden block">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Searchbar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center w-1/3"
        >
          <input
            type="text"
            placeholder=" search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border border-gray-300 bg-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        <div className="flex items-center gap-2">
          <button className="bg-black px-4 py-2 text-white rounded-md hover:bg-gray-800 transition-colors text-sm hidden sm:block">
            Connect
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-3 md:hidden">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Type here to search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border border-gray-300 bg-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
