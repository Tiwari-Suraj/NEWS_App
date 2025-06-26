import React, { useState } from "react";
import { Clock, Eye, Play, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { selectVideo } from "../redux/videoSlice";

const VideoCard = ({ video }) => {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    dispatch(selectVideo(video));
    setIsPlaying(true);
  };

  const closePlayer = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <div
        onClick={handleVideoClick}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      >
        <div className="relative overflow-hidden">
          <img
            src={video.thumbnail} // ✅ Make sure this is a valid path
            alt={video.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/fallback-thumbnail.jpg"; // Optional fallback
            }}
          />

          {/* Play button overlay */}
          <div
            className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300"
            style={{ backgroundImage: "url('/HW_News_logo.png')" }}
          >
            <div className="bg-red-600 rounded-full p-3 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
              <Play className="w-6 h-6 text-white fill-current" />
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {video.title}
          </h3>

          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span className="font-medium text-blue-600">{video.channel}</span>
            <span>{video.uploadTime}</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>{video.views} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{video.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {isPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg- p-4 rounded-lg max-w-3xl w-full relative">
            <button
              onClick={closePlayer}
              className="absolute top-2 right-2 text-white hover:text-red-500"
            >
              <X size={24} />
            </button>

            <video controls autoPlay className="w-full rounded">
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCard;
