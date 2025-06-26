import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HWNewsLogo from "../assets/HW_News_logo.png";
import { MdVerified } from "react-icons/md";

import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  Play,
  MoreHorizontal,
  Verified,
  UserPlus,
  UserCheck,
} from "lucide-react";
import {
  selectVideo,
  toggleLikeVideo,
  toggleSaveVideo,
  toggleFollowUser,
  updateExploreInteraction,
} from "../redux/videoSlice";

const Explore = () => {
  const dispatch = useDispatch();
  const { filteredExploreData, likedVideos, savedVideos, followingUsers } =
    useSelector((state) => state.videos);

  const [showComments, setShowComments] = useState({});

  const handleVideoClick = (item) => {
    dispatch(selectVideo(item.originalVideo));
  };

  const handleLike = (videoId, e) => {
    e.stopPropagation();
    dispatch(toggleLikeVideo(videoId));
  };

  const handleSave = (videoId, e) => {
    e.stopPropagation();
    dispatch(toggleSaveVideo(videoId));
  };

  const handleFollow = (username, e) => {
    e.stopPropagation();
    dispatch(toggleFollowUser(username));
  };

  const handleComment = (videoId, e) => {
    e.stopPropagation();
    setShowComments((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
    dispatch(updateExploreInteraction({ videoId, type: "comment" }));
  };

  const handleShare = (videoId, e) => {
    e.stopPropagation();
    dispatch(updateExploreInteraction({ videoId, type: "share" }));
    // Add share functionality here
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="max-w-2xl mx-auto  min-h-screen mt-10 ">
      <div className="space-y-0">
        {filteredExploreData.slice(0, 10).map((item) => (
          <div key={item.id} className="bg-white border-b border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={HWNewsLogo}
                  alt={item.displayName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-gray-900 text-sm">
                      {item.username}
                    </span>
                    {item.verified && (
                      <MdVerified className="w-4 h-4 text-black fill-current" />
                    )}
                  </div>
                  <span className="text-gray-500 text-xs">
                    {item.uploadTime}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => handleFollow(item.username, e)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    followingUsers.has(item.username)
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : "bg-gradient-to-r from-purple-500 to-pink-500"
                  }`}
                >
                  {followingUsers.has(item.username) ? (
                    <>
                      <UserCheck size={14} />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={14} />
                      <span>Follow</span>
                    </>
                  )}
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
              <p className="text-gray-900 text-sm leading-relaxed mb-2">
                {item.content}
              </p>
              <div className="flex flex-wrap gap-1">
                {item.hashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="text-blue-600 text-sm hover:underline cursor-pointer"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>

            {/* Video/Image */}
            <div className="relative">
              <div
                className="relative cursor-pointer"
                onClick={() => handleVideoClick(item)}
              >
                <img
                  src={item.thumbnail}
                  alt={item.content}
                  className="w-full h-80 object-cover"
                />

                {/* Play button overlay */}
                <div
                  className="absolute inset-0  bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300 group"
                  style={{ backgroundImage: "url('/HW_News_logo.png')" }}
                >
                  <div className="bg-red-600 bg-opacity-90 rounded-full p-4 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {item.duration}
                </div>

                {/* Views badge */}
                <div className="absolute bottom-3 left-3 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {item.views} views
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-6">
                <button
                  onClick={(e) => handleLike(item.id, e)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart
                    size={20}
                    className={
                      likedVideos.has(item.id)
                        ? "fill-red-500 text-red-500"
                        : ""
                    }
                  />
                  <span className="text-sm">{formatNumber(item.likes)}</span>
                </button>

                <button
                  onClick={(e) => handleComment(item.id, e)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle size={20} />
                  <span className="text-sm">{formatNumber(item.comments)}</span>
                </button>

                <button
                  onClick={(e) => handleShare(item.id, e)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
                >
                  <Share size={20} />
                  <span className="text-sm">{formatNumber(item.shares)}</span>
                </button>
              </div>

              <button
                onClick={(e) => handleSave(item.id, e)}
                className="text-gray-600 hover:text-yellow-500 transition-colors"
              >
                <Bookmark
                  size={20}
                  className={
                    savedVideos.has(item.id)
                      ? "fill-yellow-500 text-yellow-500"
                      : ""
                  }
                />
              </button>
            </div>

            {/* Comments Section */}
            {showComments[item.id] && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="pt-4 space-y-3">
                  <div className="flex space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <p className="text-sm text-gray-900">
                          Great analysis! Thanks for sharing this important
                          news.
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">2h</span>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Like
                        </button>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face"
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <p className="text-sm text-gray-900">
                          Very informative content. Keep up the good work!
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">1h</span>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Like
                        </button>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Add Comment Input */}
                  <div className="flex space-x-3 pt-2">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
                      alt="You"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More */}
    </div>
  );
};

export default Explore;
