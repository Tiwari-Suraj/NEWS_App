import React from "react";
import {
  Home,
  Compass,
  CheckCircle,
  Star,
  Tv,
  Music,
  Newspaper,
  LogOut,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeSidebar, setCategory, setCurrentPage } from "../redux/videoSlice";
import { logout } from "../redux/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sidebarOpen, currentPage, selectedCategory } = useSelector(
    (state) => state.videos
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    dispatch(closeSidebar());
  };

  const handleForYouClick = () => {
    dispatch(setCurrentPage("forYou"));
    dispatch(setCategory("all"));
    dispatch(closeSidebar());
  };

  const handleExploreClick = () => {
    dispatch(setCurrentPage("explore"));
    dispatch(setCategory("all"));
    dispatch(closeSidebar());
  };

  const handleHWNewsClick = () => {
    dispatch(setCurrentPage("hwNews"));
    dispatch(setCategory("all"));
    dispatch(closeSidebar());
  };

  const handleHWNewsEnglishClick = () => {
    dispatch(setCurrentPage("hwNewsEnglish"));
    dispatch(setCategory("all"));
    dispatch(closeSidebar());
  };

  const handleLoginClick = () => {
    navigate("/login");
    dispatch(closeSidebar());
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeSidebar());
  };

  return (
    <aside
      className={` bg-white w-60 p-4 space-y-4 fixed md:sticky top-14 md:top-0 left-0 h-full md:h-[calc(100vh-100px)] z-50 md:z-20 transition-transform duration-500 overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] scrollbar-none ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="space-y-4">
        {/* Main Nav */}
        <ul className="space-y-2">
          <li
            onClick={handleForYouClick}
            className={`flex items-center gap-3 cursor-pointer font-semibold p-2 rounded-lg transition-colors ${
              currentPage === "forYou"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 "
                : "text-gradient-to-r from-purple-500 to-pink-500 "
            }`}
          >
            <Home size={20} /> For you
          </li>
          <li
            onClick={handleExploreClick}
            className={`flex items-center gap-3 cursor-pointer font-semibold p-2 rounded-lg transition-colors ${
              currentPage === "explore"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 "
                : "text-gradient-to-r from-purple-500 to-pink-500 "
            }`}
          >
            <Compass size={20} /> Explore
          </li>
          <li
            onClick={() => handleCategoryClick("following")}
            className={`flex items-center gap-3 cursor-pointer font-semibold p-2 rounded-lg transition-colors ${
              selectedCategory === "following"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 "
                : "text-gradient-to-r from-purple-500 to-pink-500 "
            }`}
          >
            <CheckCircle size={20} /> Following
          </li>
        </ul>

        {/* Auth Section */}
        <div className="pt-4 border-t border-gray-200">
          {isAuthenticated ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center gap-2  text-white hover:text-black hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white rounded-lg w-full hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              Log in
            </button>
          )}
        </div>

        {/* Popular */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-gray-700 font-semibold mb-3">Popular</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li
              onClick={handleHWNewsClick}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
                currentPage === "hwNews"
                  ? "text-black bg-blue-50"
                  : "hover:text-black hover:bg-blue-50"
              }`}
            >
              <Tv size={16} /> HW News Network
            </li>
            <li
              onClick={() => handleCategoryClick("cinemaForChange")}
              className="flex items-center gap-3 cursor-pointer hover:text-black hover:bg-blue-50 p-2 rounded-lg transition-colors"
            >
              <CheckCircle size={16} /> Cinema for change
            </li>
            <li
              onClick={handleHWNewsEnglishClick}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
                currentPage === "hwNewsEnglish"
                  ? "text-black bg-blue-50"
                  : "hover:text-black hover:bg-blue-50"
              }`}
            >
              <Tv size={16} /> HW News English
            </li>
            <li
              onClick={() => handleCategoryClick("hwNewsMarathi")}
              className="flex items-center gap-3 cursor-pointer hover:text-black hover:bg-blue-50 p-2 rounded-lg transition-colors"
            >
              <Tv size={16} /> HW News Marathi
            </li>
            <li
              onClick={() => handleCategoryClick("comedyTadka")}
              className="flex items-center gap-3 cursor-pointer hover:text-black hover:bg-blue-50 p-2 rounded-lg transition-colors"
            >
              <Star size={16} /> Comedy Tadka
            </li>
            <li
              onClick={() => handleCategoryClick("tukTukTV")}
              className="flex items-center gap-3 cursor-pointer hover:text-black hover:bg-blue-50 p-2 rounded-lg transition-colors"
            >
              <Star size={16} /> Tuk Tuk TV
            </li>
            <li
              onClick={() => handleCategoryClick("moxxMusic")}
              className="flex items-center gap-3 cursor-pointer hover:text-black hover:bg-blue-50 p-2 rounded-lg transition-colors"
            >
              <Music size={16} /> Moxx Music Bhakti
            </li>
            <li
              onClick={() => handleCategoryClick("aajTak")}
              className="flex items-center gap-3 cursor-pointer hover:text-black hover:bg-blue-50 p-2 rounded-lg transition-colors"
            >
              <Newspaper size={16} /> Aaj Tak
            </li>
            <li
              onClick={() => handleCategoryClick("indiaToday")}
              className="flex items-center gap-3 cursor-pointer hover:text-black hover:bg-blue-50 p-2 rounded-lg transition-colors"
            >
              <Newspaper size={16} /> India Today
            </li>
            <li
              onClick={() => handleCategoryClick("newsNation")}
              className="flex items-center gap-3 cursor-pointer hover:text-black hover:bg-blue-50 p-2 rounded-lg transition-colors"
            >
              <Newspaper size={16} /> NewsNation
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-gray-700 font-semibold mb-3">Categories</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            {[
              "gaming",
              "sports",
              "technology",
              "entertainment",
              "educational",
            ].map((category) => (
              <li
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer p-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "text-blue-600 bg-blue-50"
                    : "hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
