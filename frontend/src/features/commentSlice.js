import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk('comments/get', async (id) => {
  const res = await fetch(`https://blogplatformbackend.onrender.com/api/blogs/comments/${id}`);
  const data = await res.json();
  return data;
})

let delid; 

export const addComment = createAsyncThunk('comments/add', async (comment) => {
  console.log(comment);
  const res = await fetch(`https://blogplatformbackend.onrender.com/api/blogs/comments/add/${comment.blog}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
      "Authorization": JSON.parse(localStorage.getItem('token'))
    },
    body: JSON.stringify({
      username: comment.username,
      comm: comment.comm
    })
  })
  const data = await res.json();
  return data;
})

export const remComment = createAsyncThunk('comments/remove', async (id) => {
  delid = id;
  const res = await fetch(`https://blogplatformbackend.onrender.com/api/blogs/comments/remove/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-type": "application/json",
      "Authorization": JSON.parse(localStorage.getItem('token'))
    }
  })
  const data = await res.json();
})

const commentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      return action.payload;
    })

    builder.addCase(addComment.fulfilled, (state, action) => {
      state.push(action.payload);
    })

    builder.addCase(remComment.fulfilled, (state) => {
      return state.filter(el => el._id !== delid);
    })
  },
})

export const { } = commentSlice.actions;
export default commentSlice.reducer;