const express = require('express');
const router = express.Router();

const blogController = require('./../controllers/blog');

router
	.route('/')
	.get(blogController.getBlogs)
	.post(blogController.updateBlog)

router
	.route('/:blogId')
	.get(blogController.getBlogById)
	.delete(blogController.deleteBlog)

module.exports = router;
