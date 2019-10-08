const logger = require('./../../logger');
const db = require('./../../models/index');

const getBlogs = async(req, res, next) => {

    try {
        
		const blogs = await db.Blog.findAll({ attributes: { exclude: ['content'] } });

		res.status(200).json({
			success: true,
			blogs: blogs
		});

	} catch (error) {
        
		logger.error('Error fetching blogs ', error);

		res.status(500).json({
			success: false,
			message: error.message
		})

	}

}

const getBlogById = async(req, res, next) => {

    try {
		
		const blogId = req.params.blogId;
        
		await db.Blog.findOne({ where: { id: blogId } }).then(blog => {

			return res.status(200).json({
				success: true,
				blog: blog
			});

		})


	} catch (error) {
		
		logger.error('Error finding blog ', error);

		return res.status(500).json({
			success: false,
			message: 'Error finding blog'
		})
		
	}

}

const addBlog = async(req, res, next) => {

    const blog = req.body.blog;

	try {

		await db.Blog.create(blog).then(newBlog => {
			return res.status(200).json({
				success: true,
				user: newBlog,
				message: 'Blog added successfully'
			});
		})
	} catch (error) {
		
        logger.error('Error adding blog', error);
        
		return res.status(500).json({
			success: false,
			message: 'Error adding blog'
		})

	}

}

const updateBlog = async(req, res, next) => {

    const blogId = req.body.blogId;
	const updatedBlog = req.body.blog;

	try {
        
		await db.Blog.update(updatedBlog, { where: { id: blogId } }).then(blog => {
			logger.info('Update Blog res ' + blog);
			logger.info('Updated Blog ' + updatedBlog);

			res.status(200).json({
				status: true,
				message: 'Blog updated successfully'
			});

		}).catch(error => {
			throw Error(error);
		})

	} catch (error) {
        
		logger.error('Error updating Blog ' + error);

		res.status(500).json({
			status: false,
			message: 'Error updating Blog'
		});

	}

}

const deleteBlog = async(req, res, next) => {

    const blogId = req.body.blogId;

	try {
        
		await db.Blog.destroy({ where: { id: blogId } }).then(() => {
            
			logger.info('Blog deleted successfully' + blogId);

			res.status(200).json({
				status: true,
				message: 'Blog deleted successfully'
			})

		}).catch(error => {
			throw Error(error);
		})

	} catch (error) {
        
		logger.error('Error deleting Blog' + blogId);

		res.status(500).json({
			status: false,
			message: 'Error deleting Blog'
		})

	}

}

module.exports = { getBlogs, getBlogById, addBlog, updateBlog, deleteBlog }