import { createSlice } from "@reduxjs/toolkit";

const initialVideos = [
    {
        id: 1,
        title: 'Maharashtra Politics: Sharad Pawar की छवि में दिक्कत में Ajit Pawar के लिए गाहर',
        duration: '7:18',
        views: '45K',
        channel: 'HW News Network',
        thumbnail: '/thumbnails/HW_News_logo.png',
        uploadTime: '7/6/2023',
        category: 'politics'
    },
    {
        id: 2,
        title: 'Sidhi Viral Video Case: Pravesh Shukla का दर्द, पर MP सरकार और पुलिस का Damage Control',
        duration: '3:52',
        views: '28K',
        channel: 'HW News Network',
        thumbnail: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=400&h=250&fit=crop',
        uploadTime: '7/6/2023',
        category: 'news'
    },
    {
        id: 3,
        title: 'Maharashtra Political Crisis: Ajit Pawar ने Sharad Pawar को National President के रूप में हटाया',
        duration: '13:17',
        views: '67K',
        channel: 'HW News Network',
        thumbnail: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop',
        uploadTime: '7/5/2023',
        category: 'politics'
    },
    {
        id: 4,
        title: 'तो पेट्रोल मिलेगा 15 रुपए लीटर : नीति आयोग की रिपोर्ट',
        duration: '4:01',
        views: '89K',
        channel: 'HW News Network',
        thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop',
        uploadTime: '7/5/2023',
        category: 'economy'
    },
    {
        id: 5,
        title: 'शरद पवार VS अजित पवार पावर का शक्ति प्रदर्शन',
        duration: '8:45',
        views: '34K',
        channel: 'HW News Network',
        thumbnail: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=250&fit=crop',
        uploadTime: '7/4/2023',
        category: 'politics'
    },
    {
        id: 6,
        title: 'बालाकोट ट्रेन हादसे के कारणों का हुआ खुलासा!',
        duration: '6:22',
        views: '156K',
        channel: 'HW News Network',
        thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=250&fit=crop',
        uploadTime: '7/4/2023',
        category: 'news'
    },
    {
        id: 7,
        title: 'मोदी वार्निंग मुखर के पास दो दिन',
        duration: '9:15',
        views: '78K',
        channel: 'HW News Network',
        thumbnail: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=250&fit=crop',
        uploadTime: '7/3/2023',
        category: 'politics'
    },
    {
        id: 8,
        title: 'SCO की बैठक में पीएम मोदी ने उठाया आतंकवाद का मुद्दा',
        duration: '5:30',
        views: '92K',
        channel: 'HW News Network',
        thumbnail: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400&h=250&fit=crop',
        uploadTime: '7/3/2023',
        category: 'international'
    }
];

// Generate explore data based on existing videos
const generateExploreData = (videos) => {
    return videos.map((video, index) => ({
        id: video.id,
        username: video.channel.toLowerCase().replace(/\s+/g, ''),
        displayName: video.channel,
        verified: true,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + index}?w=40&h=40&fit=crop&crop=face`,
        content: video.title,
        hashtags: getHashtagsFromCategory(video.category),
        thumbnail: video.thumbnail,
        duration: video.duration,
        views: video.views,
        uploadTime: video.uploadTime,
        likes: Math.floor(Math.random() * 50000) + 1000,
        comments: Math.floor(Math.random() * 5000) + 100,
        shares: Math.floor(Math.random() * 1000) + 50,
        category: video.category,
        originalVideo: video,
        description: `${video.title} - Watch this exclusive coverage by HW News Network. Stay updated with the latest news and analysis on current affairs, politics, and breaking news.`
    }));
};

const getHashtagsFromCategory = (category) => {
    const hashtagMap = {
        politics: ['#politics', '#news', '#india', '#breaking'],
        news: ['#news', '#viral', '#trending', '#update'],
        economy: ['#economy', '#business', '#finance', '#india'],
        international: ['#international', '#world', '#diplomacy', '#global']
    };
    return hashtagMap[category] || ['#trending', '#viral'];
};

const initialExploreData = generateExploreData(initialVideos);

const videoSlice = createSlice({
    name: "videos",
    initialState: {
        sidebarOpen: false,
        videos: initialVideos,
        filteredVideos: initialVideos,
        exploreData: initialExploreData,
        filteredExploreData: initialExploreData,
        selectedCategory: 'all',
        searchTerm: '',
        selectedVideo: null,
        currentPage: 'forYou',
        likedVideos: new Set(),
        savedVideos: new Set(),
        followingUsers: new Set(),
        showLoginModal: false,
    },
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        closeSidebar: (state) => {
            state.sidebarOpen = false;
        },
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
            if (action.payload === 'all') {
                state.filteredVideos = state.videos;
                state.filteredExploreData = state.exploreData;
            } else {
                state.filteredVideos = state.videos.filter(video =>
                    video.category === action.payload
                );
                state.filteredExploreData = state.exploreData.filter(item =>
                    item.category === action.payload
                );
            }
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            if (action.payload === '') {
                state.filteredVideos = state.videos;
                state.filteredExploreData = state.exploreData;
            } else {
                state.filteredVideos = state.videos.filter(video =>
                    video.title.toLowerCase().includes(action.payload.toLowerCase()) ||
                    video.channel.toLowerCase().includes(action.payload.toLowerCase())
                );
                state.filteredExploreData = state.exploreData.filter(item =>
                    item.content.toLowerCase().includes(action.payload.toLowerCase()) ||
                    item.displayName.toLowerCase().includes(action.payload.toLowerCase()) ||
                    item.hashtags.some(tag => tag.toLowerCase().includes(action.payload.toLowerCase()))
                );
            }
        },
        selectVideo: (state, action) => {
            state.selectedVideo = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        toggleLikeVideo: (state, action) => {
            const videoId = action.payload;
            const newLiked = new Set(state.likedVideos);
            if (newLiked.has(videoId)) {
                newLiked.delete(videoId);
            } else {
                newLiked.add(videoId);
            }
            state.likedVideos = newLiked;

            // Update like count in explore data
            const exploreItem = state.exploreData.find(item => item.id === videoId);
            if (exploreItem) {
                if (newLiked.has(videoId)) {
                    exploreItem.likes += 1;
                } else {
                    exploreItem.likes -= 1;
                }
            }
        },
        toggleSaveVideo: (state, action) => {
            const videoId = action.payload;
            const newSaved = new Set(state.savedVideos);
            if (newSaved.has(videoId)) {
                newSaved.delete(videoId);
            } else {
                newSaved.add(videoId);
            }
            state.savedVideos = newSaved;
        },
        toggleFollowUser: (state, action) => {
            const username = action.payload;
            const newFollowing = new Set(state.followingUsers);
            if (newFollowing.has(username)) {
                newFollowing.delete(username);
            } else {
                newFollowing.add(username);
            }
            state.followingUsers = newFollowing;
        },
        updateExploreInteraction: (state, action) => {
            const { videoId, type } = action.payload;
            const exploreItem = state.exploreData.find(item => item.id === videoId);
            if (exploreItem) {
                switch (type) {
                    case 'comment':
                        exploreItem.comments += 1;
                        break;
                    case 'share':
                        exploreItem.shares += 1;
                        break;
                    default:
                        break;
                }
            }
        },
        setShowLoginModal: (state, action) => {
            state.showLoginModal = action.payload;
        },
    },
});

export const {
    toggleSidebar,
    closeSidebar,
    setCategory,
    setSearchTerm,
    selectVideo,
    setCurrentPage,
    toggleLikeVideo,
    toggleSaveVideo,
    toggleFollowUser,
    updateExploreInteraction,
    setShowLoginModal,
} = videoSlice.actions;

export default videoSlice.reducer;