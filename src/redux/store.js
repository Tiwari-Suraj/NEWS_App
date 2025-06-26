import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './videoSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        videos: videoReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'videos/toggleLikeVideo',
                    'videos/toggleSaveVideo',
                    'videos/toggleFollowUser',
                    'auth/loginUser/pending',
                    'auth/loginUser/fulfilled',
                    'auth/loginUser/rejected',
                    'auth/registerUser/pending',
                    'auth/registerUser/fulfilled',
                    'auth/registerUser/rejected'
                ],
                ignoredPaths: [
                    'videos.likedVideos',
                    'videos.savedVideos',
                    'videos.followingUsers'
                ],
            },
        }),
});

export default store;