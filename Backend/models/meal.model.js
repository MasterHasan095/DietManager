const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define("meals", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false, 
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
        name: {
            type: DataTypes.STRING,
        },
        quantity: {
            type: DataTypes.BIGINT
        },
        protein: {
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
