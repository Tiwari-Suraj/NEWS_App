import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  MoreHorizontal,
} from "lucide-react";

import { selectVideo } from "../redux/videoSlice"; // ✅ Adjust path if needed

const VideoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedVideo, videos } = useSelector((state) => state.videos);

  if (!selectedVideo) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No video selected
          </h2>
          <p className="text-gray-500">Please select a video to watch</p>
        </div>
      </div>
    );
  }

  const relatedVideos = videos
    .filter((video) => video.id !== selectedVideo.id)
    .slice(0, 5);

  const handleBack = () => {
    dispatch(selectVideo(null));
    navigate(-1); // ✅ Navigate back one step
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Video Section */}
        <div className="flex-1">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to videos</span>
          </button>

          {/* Video Player */}
          <div className="bg-black rounded-lg overflow-hidden mb-4">
            <div className="aspect-video flex items-center justify-center">
              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Video Info */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {selectedVideo.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-red-600 text-white font-bold text-sm px-2 py-1 rounded">
                    HW
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedVideo.channel}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedVideo.views} views • {selectedVideo.uploadTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                  <ThumbsUp size={18} />
                  <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                  <ThumbsDown size={18} />
                </button>
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                  <Share2 size={18} />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                  <Download size={18} />
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                {selectedVideo.title} - Watch this exclusive coverage by HW News
                Network. Stay updated with the latest news and analysis on
                current affairs, politics, and breaking news.
              </p>
            </div>
          </div>
        </div>

        {/* Related Videos Sidebar */}
        <div className="lg:w-80">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Related Videos
          </h3>
          <div className="space-y-4">
            {relatedVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => dispatch(selectVideo(video))}
                className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight mb-1">
                    {video.title}
                  </h4>
                  <p className="text-xs text-gray-600">{video.channel}</p>
                  <p className="text-xs text-gray-500">
                    {video.views} views • {video.uploadTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
