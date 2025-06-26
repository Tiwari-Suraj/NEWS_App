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
import ProtectedRoute from "./Components/ProtectedRoute";

const AppContent = () => {
  const { selectedVideo } = useSelector((state) => state.videos);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        {isAuthenticated && <Navbar />}
        <div
          className={`flex flex-1 ${isAuthenticated ? "pt-16 md:pt-20" : ""}`}
        >
          {isAuthenticated && !selectedVideo && <Sidebar />}

          <main
            className={`flex-1 ${
              !selectedVideo && isAuthenticated ? "md:ml-0" : ""
            } overflow-y-auto`}
          >
            <Routes>
              <Route
                path="/login"
                element={
                  isAuthenticated ? <Navigate to="/" replace /> : <Login />
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    {selectedVideo ? <VideoPage /> : <Home />}
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>
          </main>
        </div>
        <Footer /> {/* ✅ Always visible */}
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
