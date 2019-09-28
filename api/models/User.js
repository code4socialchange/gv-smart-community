const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
    
    const User = sequelize.define('User', {
        firstName: { type: Sequelize.STRING, allowNull: false }, 
        lastName: { type: Sequelize.STRING, allowNull: false },
        phone: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
        password: { 
            type: Sequelize.STRING, 
            allowNull: false, 
            set(value) { (async() => { this.setDataValue('password', await bcrypt.hash(value, 5)) })(); }
        },
        active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

    return User;
};