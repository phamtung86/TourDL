'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TourCalendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TourCalendar.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      voucher_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tour_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'TourCalendar',
      tableName: 'tour_calendar',
      timestamps: false,
    }
  );
  return TourCalendar;
};
