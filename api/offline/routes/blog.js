const express = require('express');
const router = express.Router();

const blogController = require('./../../server/controllers/blog');

router
	.route('/')
	.get(blogController.getBlogs)
	
	router
	.route('/:blogId')
	.get(blogController.getBlogById)

module.exports = router;
