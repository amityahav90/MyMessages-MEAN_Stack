const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');
const app = express();

mongoose.connect("mongodb+srv://amitya:rvKpvZYq5g5uPSB0@cluster0-yd3qs.mongodb.net/angular-node?retryWrites=true")
  .then(() => {
    console.log('Connected to database!');
})
  .catch(() => {
    console.log('Connected failed...');
});

app.use(bodyParser.json());

// Headers setup //
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully!',
      postId: createdPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfuly!',
        posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
  .then(createdPost => {
    console.log(createdPost);
    res.status(200).json({message: "Post deleted!"});
  });
});


module.exports = app;
