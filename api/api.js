var router = require('express').Router();
var users = require('./users/userRouter');
var categories = require('./categories/categoryRouter');
var posts = require('./posts/postRouter');

router.use('/users',users);
router.use('/categories', categories);
router.use('/posts', posts);

module.exports = router;