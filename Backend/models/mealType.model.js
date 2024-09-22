const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("types", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        day: {
            type: DataTypes.STRING
        },
        startTime: {
            type: DataTypes.TIME
        },
        endTime: {
            type: DataTypes.TIME
        },
    });
};
