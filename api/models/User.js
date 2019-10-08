const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    
    const User = sequelize.define('User', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        firstName: { type: Sequelize.STRING, allowNull: false }, 
        lastName: { type: Sequelize.STRING, allowNull: false },
        phone: { type: Sequelize.BIGINT, allowNull: false },
        password: { type: Sequelize.TEXT, allowNull: false },
        role: { type: Sequelize.STRING, allowNull: false },
        active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

    User.associate = (models) => {
        models.User.belongsTo(models.Village, {
            onDelete: 'CASCADE',
            foreignKey: { allowNull: false }
        })
    }

    return User;
};