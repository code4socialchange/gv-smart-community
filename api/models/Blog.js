const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {

    const Blog = sequelize.define('Blog', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull: false },
        category: { type: Sequelize.STRING, allowNull: false },
        content: { type: Sequelize.TEXT, allowNull: false },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    });

    return Blog;
};