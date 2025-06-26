import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load user data from localStorage
const loadUserFromStorage = () => {
    try {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error loading user data:', error);
        return null;
    }
};

// Save user data to localStorage
const saveUserToStorage = (userData) => {
    try {
        localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
        console.error('Error saving user data:', error);
    }
};

// Remove user data from localStorage
const removeUserFromStorage = () => {
    try {
        localStorage.removeItem('userData');
    } catch (error) {
        console.error('Error removing user data:', error);
    }
};

// Load registered users from localStorage
const loadRegisteredUsers = () => {
    try {
        return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    } catch (error) {
        console.error('Error loading registered users:', error);
        return [];
    }
};

// Save registered users to localStorage
const saveRegisteredUsers = (users) => {
    try {
        localStorage.setItem('registeredUsers', JSON.stringify(users));
    } catch (error) {
        console.error('Error saving registered users:', error);
    }
};

const initialState = {
    isAuthenticated: !!loadUserFromStorage(),
    user: loadUserFromStorage(),
    loading: false,
    error: null,
    registeredUsers: loadRegisteredUsers(),
};

// Async thunk for login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { getState, rejectWithValue }) => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const { registeredUsers } = getState().auth;
            const user = registeredUsers.find(
                user => user.email === credentials.email && user.password === credentials.password
            );

            if (user) {
                const userData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    loginTime: new Date().toISOString(),
                    rememberMe: credentials.rememberMe || false,
                };

                saveUserToStorage(userData);
                return { success: true, user: userData };
            } else {
                return rejectWithValue('Invalid email or password');
            }
        } catch (error) {
            return rejectWithValue('Login failed. Please try again.');
        }
    }
);

// Async thunk for registration with auto-login
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { getState, dispatch, rejectWithValue }) => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const { registeredUsers } = getState().auth;
            const existingUser = registeredUsers.find(user => user.email === userData.email);

            if (existingUser) {
                return rejectWithValue('User with this email already exists');
            } else {
                const newUser = {
                    ...userData,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                };

                const updatedUsers = [...registeredUsers, newUser];
                saveRegisteredUsers(updatedUsers);

                // Auto-login after successful registration
                const loginData = {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    loginTime: new Date().toISOString(),
                    registrationTime: newUser.createdAt,
                };

                saveUserToStorage(loginData);

                return {
                    success: true,
                    user: loginData,
                    newUser: newUser,
                    autoLogin: true
                };
            }
        } catch (error) {
            return rejectWithValue('Registration failed. Please try again.');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.loading = false;
            removeUserFromStorage();
        },
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })
            // Registration cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.registeredUsers.push(action.payload.newUser);
                state.error = null;

                // Auto-login after registration
                if (action.payload.autoLogin) {
                    state.isAuthenticated = true;
                    state.user = action.payload.user;
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    logout,
    clearError,
    setLoading,
} = authSlice.actions;

export default authSlice.reducer;