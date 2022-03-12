const { Op } = require('sequelize');
const { Post } = require('../database/models');

// @Desc     : POST Content
// @Routes   : POST api/post
// @access   : private
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

// @Desc     : GET Content
// @Routes   : GET api/posts
// @access   : Public
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      attributes: { exclude: ['deletedAt'] },
    });

    if (posts.length == 0) {
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

// @Desc    : Get posts from user
// @Routes  : GET api/user/posts
// @access  : Private
const getAllPostsByUser = async (req, res, next) => {
  try {
    const posts = await Post.findAll({ where: { userId: req.user.id } });

    if (posts.length == 0) {
      return res.status(404).json({
        message: 'post not found',
      });
    }

    return res.status(200).json({
      message: 'successfully get all posts user',
      posts,
    });
  } catch (error) {
    next(error);
  }
};

// @Desc    : Get search post
// @Routes  : GET api/post
// @access  : public
const getSearchPost = async (req, res, next) => {
  try {
    const { title } = req.query;
    const post = await Post.findAll({
      where: {
        title: {
          [Op.substring]: `%${title}%`,
        },
      },
    });

    if (post.length == 0) {
      return res.status(404).json({
        message: 'post not found',
      });
    }

    return res.status(200).json({
      message: 'successfully search post',
      post,
    });
  } catch (error) {
    next(error);
  }
};

// @Desc    : Update Post
// @Routes  : PUT api/post/:id
// @access  : Private
const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({
        message: 'post not found',
      });
    }

    if (!req.user) {
      return res.status(404).json({
        message: 'user not found',
      });
    }

    if (post.userId !== req.user.id) {
      return res.status(401).json({
        message: 'unauthorized',
      });
    }

    await Post.update({ title, content }, { where: { id } });
    return res.status(201).json({
      message: 'successfully update post',
    });
  } catch (error) {
    next(error);
  }
};

// @Desc    : Delete Post
// @Routes  : DELETE api/post/:id
// @access  : Private
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({
        message: 'post not found',
      });
    }

    if (!req.user) {
      return res.status(404).json({
        message: 'user not found',
      });
    }

    if (post.userId !== req.user.id) {
      return res.status(401).json({
        message: 'unauthorized',
      });
    }

    await Post.destroy({ where: { id } });
    return res.status(200).json({
      message: 'successfully delete post',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getAllPostsByUser,
  getSearchPost,
  updatePost,
  deletePost,
};
