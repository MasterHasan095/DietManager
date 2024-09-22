const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("users", {
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false, // Fixed typo
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        } 
    });
};
