/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
const bcrypt = require('bcrypt');
const db = require('./../../models/index');
const logger = require('./../../logger');
const Op = require('sequelize').Op;

getAll = async(req, res, next) => {

	try {
        
		const users = await db.User.findAll({ attributes: { exclude: ['password'] } });

		res.status(200).json({
			success: true,
			users: users
		});

	} catch (error) {
        
		logger.error('Error fetching users ', error);

		res.status(500).json({
			success: false,
			message: error.message
		})

	}

}

getAllFiltered = async(req, res, next) => {

	try {
        
		const users = await db.User.findAll({ 
			where: {
				VillageId: {
					[Op.not]: req.user.VillageId,

				},
				role: { 
					[Op.notLike]: '%administrator' 
				},
			}, 
			attributes: { exclude: ['password'] } 
		});

		res.status(200).json({
			success: true,
			users: users
		});

	} catch (error) {
        
		logger.error('Error fetching users ', error);

		res.status(500).json({
			success: false,
			message: error.message
		})

	}

}

getAllExceptAdministrator = async(req, res, next) => {

	try {
        
		const users = await db.User.findAll({ where: { 
			role: { 
				[Op.notLike]: '%administrator' 
			},
		}, include: [{
			model: db.Village
		}], attributes: { exclude: ['password'] } });

		res.status(200).json({
			success: true,
			users: users
		});

	} catch(error) {

		logger.error('Error fetching users ', error);

		res.status(500).json({
			success: false,
			message: error.message
		})

	}

}

getUserDetails = async(req, res, next) => {

	req.params.id = req.user.id;
	await getUserFromId(req, res, next);

}

getUserFromId = async(req, res, next) => {
	
	try {
		
		const userId = req.params.id;
        
		await db.User.findOne({ where: { id: userId }, attributes: { exclude: ['password'] } }).then(user => {

			return res.status(200).json({
				success: true,
				user: user
			});

		})


	} catch (error) {
		
		logger.error('Error finding user ', error);

		return res.status(500).json({
			success: false,
			message: 'Error finding user'
		})
		
	}

}

addUser = async(req, res, next) => {

	const user = req.body.user;

	try {
		
		user.password = await bcrypt.hash(user.password, 5);

		await db.User.create(user).then(newUser => {

			delete newUser.password;

			return res.status(200).json({
				success: true,
				user: newUser,
				message: 'User added successfully'
			});
		})
	} catch (error) {
		
		logger.error('Error adding user', error);
		return res.status(500).json({
			success: false,
			message: 'Error adding user'
		})

	}

}

updateUser = async(req, res, next) => {

	const userId = req.body.userId;
	const updatedUser = req.body.user;
	
	delete updatedUser.password;

	try {
        
		await db.User.update(updatedUser, { where: { id: userId } }).then(user => {
			logger.info('Update User res ' + user);
			logger.info('Updated User ' + updatedUser);

			res.status(200).json({
				status: true,
				message: 'User updated successfully'
			});

		}).catch(error => {
			throw Error(error);
		})

	} catch (error) {
        
		logger.error('Error updating user ' + error);

		res.status(500).json({
			status: false,
			message: 'Error updating user'
		});

	}

}

deleteUser = async(req, res, next) => {

	const userId = req.body.userId;

	try {
        
		await db.User.destroy({ where: { id: userId } }).then(() => {
            
			logger.info('User deleted successfully' + userId);

			res.status(200).json({
				status: true,
				message: 'User deleted successfully'
			})

		}).catch(error => {
			throw Error(error);
		})

	} catch (error) {
        
		logger.error('Error deleting user' + userId);

		res.status(500).json({
			status: false,
			message: 'Error deleting user'
		})

	}

}

toggleUserActiveStatus = async(req, res, next) => {

	const userId = req.body.userId;
	const newStatus = req.body.status;
    
	try {
        
		await db.User.update({ status: newStatus }, { where: { id: userId } }).then(() => {
            
			logger.info(`Updated user status ${userId} - ${status}`);

			res.status(200).json({
				status: true,
				message: `Updated user status ${userId} - ${status}`
			});

		}).catch(error => {
			throw Error(error);
		});

	} catch (error) {
        
		logger.error('Error updating user', error);

		res.status(500).json({
			status: false,
			message: 'Error updating user'
		})

	}

}

module.exports = {
	getAll, getAllFiltered, getUserFromId, addUser, deleteUser, updateUser, toggleUserActiveStatus, getAllExceptAdministrator
}