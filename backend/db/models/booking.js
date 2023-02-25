'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.Spot,
        {foreignKey: "spotId"}
      )

      Booking.belongsTo(
        models.User,
        {foreignKey: "userId"}
      )
    }
  }
  Booking.init({
    spotId: {type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'},
    userId: {type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'},
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
