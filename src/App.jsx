import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Footer from "./Pages/Footer";
import Login from "./Pages/Login";
import VideoPage from "./Pages/VideoPage";
import Home from "./Pages/Home";

const AppContent = () => {
  const { selectedVideo } = useSelector((state) => state.videos);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Always show navbar */}
        <Navbar />

        <div className="flex flex-1 pt-16 md:pt-20">
          {/* Always show sidebar when no video is selected */}
          {!selectedVideo && <Sidebar />}

          <main
            className={`flex-1 ${
              !selectedVideo ? "md:ml-0" : ""
            } overflow-y-auto`}
          >
            <Routes>
              {/* Optional login route - users can still login if they want */}
              <Route
                path="/login"
                element={
                  isAuthenticated ? <Navigate to="/" replace /> : <Login />
                }
              />

              {/* Main route - no authentication required */}
              <Route
                path="/"
                element={selectedVideo ? <VideoPage /> : <Home />}
              />

              {/* Video route for direct video access */}
              <Route path="/video/:id" element={<VideoPage />} />

              {/* Catch all route - redirect to home instead of login */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        {/* Always show footer except on login page */}
        {window.location.pathname !== "/login" && <Footer />}
      </div>
    </Router>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
