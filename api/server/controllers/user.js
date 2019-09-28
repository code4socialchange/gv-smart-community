const UserModel = require('./../../models/User');
const logger = require('./../../logger');

exports.getAll = async(req, res, next) => {

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

exports.getUserFromId = async(req, res, next) => {

    try {
        
        const userId = req.params.id;
        
        const user = UserModel.findOne({
            where: {  }
        })


    } catch (error) {
        
    }

}