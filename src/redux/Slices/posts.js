import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id) => await axios.delete(`/posts/${id}`),
);

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.status = 'loaded';
      state.posts.items = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.status = 'error';
      state.posts.items = [];
    });
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.status = 'loaded';
      state.tags.items = action.payload;
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.status = 'error';
      state.tags.items = [];
    });
    builder.addCase(fetchRemovePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg);
    });
  },
});

export const postsReducer = postsSlice.reducer;
