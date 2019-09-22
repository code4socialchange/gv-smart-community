const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

class User extends Sequelize.Model {}

User.init({
    firstName: { type: Sequelize.STRING, allowNull: false }, 
    lastName: { type: Sequelize.STRING, allowNull: false },
    phone: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
    password: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        set(value) { (async() => { this.setDataValue('password', await bcrypt.hash(value, 5)) })(); }
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
});

module.exports = User;