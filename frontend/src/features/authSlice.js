import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk('auth/login', async (cred) => {
  const res = await fetch('https://blogplatformbackend.onrender.com/api/user/login', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ uname: cred.uname, pass: cred.pass}),
  });
  const data = await res.json();
  return data;
})

export const register = createAsyncThunk('auth/register', async (cred) => {
  const res = await fetch('https://blogplatformbackend.onrender.com/api/user/register', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({ uname: cred.uname, pass: cred.pass, email: cred.email }),
  });
  const data = await res.json();
  return data;
})

export const update = createAsyncThunk('user/update', async (cred) => {
  console.log(cred);
  const res = await fetch(`https://blogplatformbackend.onrender.com/api/users/update/${cred.id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": JSON.parse(localStorage.getItem('token'))
    },
    body: JSON.stringify({
      name: cred.name,
      username: cred.username,
    })
  });
  const data = await res.json();
  return data;
})

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : {
    username: "",
    name: "",
    id: "",
    email: "",
  },
  token: JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : "",
  isLogin: JSON.parse(localStorage.getItem('user')) ? true : false
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.token = "";
      state.user = {
        username: "",
        name: "",
        id: "",
        email: "",
      };
      localStorage.clear('user');
      localStorage.clear('token');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLogin = true;
      state.token = action.payload.token;
      state.user.email = action.payload.user.email;
      state.user.username = action.payload.user.username;
      state.user.id = action.payload.user._id;
      state.user.name = action.payload.user.name;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
    })

    builder.addCase(register.fulfilled, (state, action) => {
      state.isLogin = true;
      state.token = action.payload.token;
      state.user.email = action.payload.user.email;
      state.user.username = action.payload.user.username;
      state.user.id = action.payload.user._id;
      state.user.name = action.payload.user.name;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
    })

    builder.addCase(update.fulfilled, (state, action) => {
      state.user.username = action.payload.username;
      state.user.name = action.payload.name;
      localStorage.setItem('user', JSON.stringify(action.payload));
    })
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;