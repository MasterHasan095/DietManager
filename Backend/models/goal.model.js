const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("goals", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false, // Fixed typo
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.BIGINT,
            references:{
                model: 'users',
                key: 'id'
              },
              allowNull: false // app_id can be null
        },
        protein: {
            type: DataTypes.BIGINT,
        },
        calories: {
            type: DataTypes.BIGINT,
        },
        sugar: {
            type: DataTypes.BIGINT,
        }
    });
};
