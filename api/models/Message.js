const Sequelize = require('sequelize');

class Message extends Sequelize.Model {}

Message.init({
    message: { type: Sequelize.STRING, allowNull: false },
    senderId: { type: Sequelize.STRING, allowNull: false },
    receiverId: { type: Sequelize.STRING, allowNull: false },
    messageType: { type: Sequelize.STRING, allowNull: false },
    received: { type: Sequelize.BOOLEAN, allowNull: false },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = Message;