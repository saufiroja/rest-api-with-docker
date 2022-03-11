const { Post } = require('../database/models');

// Desc     : POST Content
// Routes   : POST api/post
// access   : private
const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!req.user) {
      return res.status(400).json({
        message: 'unauthorized',
      });
    }

    const post = await Post.create({
      title,
      content,
      userId: req.user.id,
    });

    return res.status(201).json({
      message: 'success create post',
      post,
    });
  } catch (error) {
    next(error);
  }
};

// Desc     : GET Content
// Routes   : GET api/posts
// access   : Public
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      attributes: { exclude: ['deletedAt'] },
    });

    if (posts < 0) {
      return res.status(404).json({
        message: 'posts not found',
      });
    }

    return res.status(200).json({
      message: 'successfully find all posts',
      posts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createPost, getAllPosts };
