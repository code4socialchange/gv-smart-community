const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {

    const Sync = sequelize.define('Sync', {
        tableName: { type: Sequelize.STRING, allowNull: false },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

    return Sync;
};