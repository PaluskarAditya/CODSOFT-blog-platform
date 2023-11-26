const express = require('express');
const app = express();
const cors = require('cors');
const BlogPost = require('./blogpostModel');
const User = require('./userModel');
const auth = require('./authMiddleware');
const bcrypt = require('bcrypt'); ``
const conn = require('./db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());
app.use(cors());
conn();

// Generates a jwt token
const token = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET);
}

// test request
app.get('/', (req, res) => res.send('Hi'));

// @GET -> get random blogpost
app.get('/api/blogs/random', async (req, res) => {
  try {
    const randomBlogPost = await BlogPost.aggregate([{ $sample: { size: 1 } }]);

    if (!randomBlogPost || randomBlogPost.length === 0) {
      res.status(404).json({ err: "No blogposts found" });
    } else {
      res.status(200).json(randomBlogPost[0]);
    }

  } catch (error) {
    console.log(error.message);
  }
})

// @POST -> create a blogpost
app.post('/api/blogs/create', auth, async (req, res) => {
  try {
    const { img1, img2, img3, title, text, category, author } = req.body;
    const blog = await new BlogPost({
      user_id: req.id,
      text: text.trim(),
      img1,
      img2,
      img3,
      author,
      category,
      title,
    })
    if (blog) {
      blog.save();
      res.json(blog);
    } else {
      res.json({ err: "failed to create post, please try again" });
    }
  } catch (error) {
    console.log(error.message);
  }
})

// @GET -> get blogpost by id
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blogpost = await BlogPost.findById(id);
    if (!blogpost) {
      res.status(404).json({ err: "no blogpost found" });
    } else {
      res.status(200).json(blogpost);
    }
  } catch (error) {
    console.log(error.message);
  }
})

// @GET -> get blogposts according to limit param

// @GET -> get blogposts according to category

// @GET -> get most viewed blogpost

// @POST -> user login
app.post('/api/user/login', async (req, res) => {
  try {
    const { uname, pass } = req.body;
    if (!uname || !pass) {
      res.json({ err: 'please fill all fields' });
    }
    const usr = await User.findOne({ username: uname });
    if (!usr) {
      res.json({ err: 'user not found' });
    } else if (usr && await bcrypt.compare(pass, usr.password)) {
      res.json({ success: 'logged in', user: usr, token: token(usr.id) });
    } else if (await bcrypt.compare(pass, usr.password) !== true) {
      res.json({ err: 'invalid data' });
    }
  } catch (error) {
    console.log(error.message);
  }
})

// @POST -> signup a user
app.post('/api/user/register', async (req, res) => {
  try {
    const { name, email, uname, pass } = req.body
    if (!uname || !pass || !email) {
      res.json({ err: 'please fill all fields' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(pass, salt);
      const user = await User({
        name,
        username: uname,
        email,
        password: hashed,
      })
      user.save()
      user ? res.json({ user: user, token: token(user.id) }) : res.json({ err: 'please try again' });
    }
  } catch (error) {
    console.log(error.message);
  }
})

// @GET -> get random blogs according to limit
app.get('/api/blogs/random/:limit', async (req, res) => {
  const limit = parseInt(req.params.limit);

  try {
    const uniqueBlogPosts = await BlogPost.aggregate([
      { $sample: { size: limit } }, // Sample the specified number of documents randomly
      { $group: { _id: '$title', data: { $first: '$$ROOT' } } }, // Group by title to ensure uniqueness
      { $replaceRoot: { newRoot: '$data' } }, // Replace the root with the original document
    ]);

    res.json(uniqueBlogPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// @GET -> get all blogposts
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await BlogPost.find();
    if (blogs) {
      res.status(200).json(blogs);
    } else {
      res.status(404).json({err: "no blogposts found"});
    }
  } catch (error) {
    console.log(error.message);
  }
})

app.listen(8080, console.log('Listening on 8080'));