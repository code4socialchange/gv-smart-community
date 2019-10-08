const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {

    const Message = sequelize.define('Message', {
        message: { type: Sequelize.STRING, allowNull: false },
        senderId: { type: Sequelize.STRING, allowNull: false },
        receiverId: { type: Sequelize.STRING, allowNull: false },
        messageType: { type: Sequelize.STRING, allowNull: false },
        received: { type: Sequelize.BOOLEAN, allowNull: false },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

    return Message;
};