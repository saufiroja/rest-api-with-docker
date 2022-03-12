const router = require('express').Router();

const {
  createPost,
  getAllPosts,
  getAllPostsByUser,
  getSearchPost,
  updatePost,
  deletePost,
} = require('../controllers/post.controllers');
const { isAuthentication } = require('../middlewares/auth.middlewares');

router.get('/posts', getAllPosts);
router.get('/post', getSearchPost);
router.get('/user/posts', isAuthentication, getAllPostsByUser);

router.post('/post', isAuthentication, createPost);

router.put('/post/:id', isAuthentication, updatePost);

router.delete('/post/:id', isAuthentication, deletePost);

module.exports = router;
