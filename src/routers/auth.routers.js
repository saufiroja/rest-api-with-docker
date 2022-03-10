const router = require('express').Router();

const { regitser, login } = require('../controllers/auth.controllers');

router.post('/register', regitser);
router.post('/login', login);

module.exports = router;
