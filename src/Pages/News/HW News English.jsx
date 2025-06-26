import React from "react";
import { useSelector } from "react-redux";
import VideoCard from "../../Components/VideoCard";

const HWNews_English = () => {
  const { filteredVideos, searchTerm, selectedCategory } = useSelector(
    (state) => state.videos
  );

  return (
    <div className="p-4 mt-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-red-600 text-white font-bold text-lg px-3 py-1 rounded">
            HW NEWS English
          </div>
          <span className="text-gray-600">News Network</span>
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full">
            Folow
          </span>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea neque quia
          placeat animi numquam, in minus illum perspiciatis eaque vitae
          excepturi velit ad eius laboriosam, rem possimus culpa amet quod.
        </p>

        <button className="text-blue-600 text-sm hover:underline mt-1">
          Show more
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8">
          <button className="pb-2 border-b-2 border-blue-600 text-blue-600 font-semibold">
            Videos
          </button>
          <button className="pb-2 text-gray-600 hover:text-blue-600 transition-colors">
            Playlists
          </button>
        </div>
      </div>

      {/* Search/Filter Results */}
      {searchTerm && (
        <div className="mb-4 text-gray-600">
          Showing results for:{" "}
          <span className="font-semibold">"{searchTerm}"</span>
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* No results */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No videos found</div>
          <p className="text-gray-400">
            Try adjusting your search terms or explore different categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default HWNews_English;
