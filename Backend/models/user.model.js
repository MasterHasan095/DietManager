const {DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
        userId: {
            type: DataTypes.BIGINT,
            allowNUll: false,
            primaryKey: true,
            autoIncrement: true
        },
        firtname: {
            type: DataTypes.STRING,
        }
    })
}