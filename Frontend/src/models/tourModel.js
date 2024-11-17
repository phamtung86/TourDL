'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tour.belongsTo(models.TourType, {
        foreignKey: 'tour_type_id',
        as: 'tourType',
      });
      Tour.hasMany(models.TourOrder, {
        foreignKey: 'tour_id',
        as: 'tourOrders',
      });
    }
  }
  Tour.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      departure_point: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slot: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      transport_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tour_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Tour',
      tableName: 'tour',
      timestamps: false,
    }
  );
  return Tour;
};
