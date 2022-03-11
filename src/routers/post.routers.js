const router = require('express').Router();

const { createPost, getAllPosts } = require('../controllers/post.controllers');
const { isAuthentication } = require('../middlewares/auth.middlewares');

router.get('/posts', isAuthentication, getAllPosts);
router.post('/post', isAuthentication, createPost);

module.exports = router;
