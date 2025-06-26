// src/Components/Home.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ForYou from "./ForYou";
import HWNews from "./News/HW News";
import Explore from "./Explore";
import HWNews_English from "./News/HW News English";

import { setCurrentPage, setCategory } from "../redux/videoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.videos);

  useEffect(() => {
    if (!currentPage) {
      dispatch(setCurrentPage("explore"));
      dispatch(setCategory("all"));
    }
  }, [currentPage, dispatch]);

  const renderPage = () => {
    switch (currentPage) {
      case "explore":
        return <Explore />;
      case "hwNews":
        return <HWNews />;
      case "hwNewsEnglish":
        return <HWNews_English />;
      case "forYou":
        return <ForYou />;
      default:
        return <Explore />;
    }
  };

  return <div>{renderPage()}</div>;
};

export default Home;
