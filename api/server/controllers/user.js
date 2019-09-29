/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
const logger = require('./../../logger');

getAll = async(req, res, next) => {

	try {
        
		const users = await UserModel.findAll();

		res.status(200).json({
			success: true,
			users: users
		});

	} catch (error) {
        
		logger.

			res.status(500).json({
				success: false,
				message: error.message
			})

	}

}

getUserFromId = async(req, res, next) => {

	try {
        
		const userId = req.params.id;
        
		const user = UserModel.findOne({
			where: {  }
		})


	} catch (error) {
        
	}

}

updateUser = async(req, res, next) => {

	const userId = req.body.user.id;
	const updatedUser = req.body.user;

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

	const userId = req.params.userId;

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
	getAll, getUserFromId, deleteUser, updateUser, toggleUserActiveStatus
}