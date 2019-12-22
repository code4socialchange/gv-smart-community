const logger = require('./../../logger');
const db = require('./../../models/index');
const sequelize = require('sequelize');
const Op = require('sequelize').Op;

const getMessages = async(req, res, next) => {

    const userId = req.user.id;

    try {

        const messages = await db.Messages.findAll({ where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] } });
        
        res.status(200).json({
            success: true,
            messages: []
        })

    } catch (error) {
        
    }

}

const addMessages = async(req, res, next) => {

    
    try {
        
        const messageList = req.body.messages;

        const bulkCreateTransaction = await db.sequelize.transaction(async t => {
            return await db.Message.bulkCreate(messageList, { transaction: t })
        })

        console.log(bulkCreateTransaction);

        return res.status(200).json({
            success: true,
            records: bulkCreateTransaction
        })

    } catch (error) {
        logger.error('Error inserting messages ', error);
    }

}

module.exports = { getMessages, addMessages }