const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("meals", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        protein: {
            type: DataTypes.BIGINT,
        },
        carbohydrates: {
            type: DataTypes.BIGINT,
        },
        fats: {
            type: DataTypes.BIGINT,
        },
        calories: {
            type: DataTypes.BIGINT,
        },
        sugar: {
            type: DataTypes.BIGINT,
        },
    });
};
