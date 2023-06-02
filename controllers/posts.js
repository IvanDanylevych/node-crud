const Post = require("../models/post");

// CRUD controllers

//get all posts
exports.getPosts = (req, res, next) => {
  Post.findAll()
    .then((posts) => {
      res.status(200).json({ posts: posts });
    })
    .catch((err) => console.log(err));
};

// get single post by id
exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found!" });
      }
      res.status(200).json({ post: post });
    })
    .catch((err) => console.log(err));
};

//create post
exports.createPost = (req, res, next) => {
  const text = req.body.text;
  const completed = req.body.completed;
  Post.create({
    text: text,
    completed: completed,
  })
    .then((result) => {
      console.log("Created post");
      res.status(201).json({
        message: "Post created successfully!",
        post: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//update post
exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const updatedText = req.body.text;
  const updatedCompleted = req.body.completed;
  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      post.text = updatedText;
      post.completed = updatedCompleted;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Post updated", result: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete post
exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findByPk(postId).then((post) => {
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return Post.destroy({
      where: {
        id: postId,
      },
    })
      .then(() => {
        res.status(200).json({ message: "Post deleted" });
      })
      .catch((err) => console.log(err));
  });
};
