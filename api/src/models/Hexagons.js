const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('hexagons', {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        coordinates: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        characteristics: {
          type: DataTypes.TEXT,
          allowNull: false
        },
    })
}