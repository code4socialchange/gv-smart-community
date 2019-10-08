const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {

    const Village = sequelize.define('Village', {
        name: { type: Sequelize.STRING, allowNull: false },
        district: { type: Sequelize.STRING, allowNull: false },
        pincode: { type: Sequelize.BIGINT, allowNull: false },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

    Village.associate = (models) => {
        models.Village.hasMany(models.User);
    }

    return Village;
};