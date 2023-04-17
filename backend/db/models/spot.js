'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo( //Association with Spot and User
        models.User,
        { foreignKey: "ownerId", hooks: true, as: 'Owner' }
      )

      Spot.hasMany( //Association with Spot and Booking
        models.Booking,
        { foreignKey: "spotId", onDelete: "CASCADE", hooks: true }
      )

      Spot.hasMany( //Association with Spot and Review
        models.Review,
        { foreignKey: "spotId", onDelete: "CASCADE", hooks: true }
      )

      Spot.hasMany( //Association with Spot and SpotImage
        models.SpotImage,
        { foreignKey: "spotId", onDelete: "CASCADE", hooks: true }
      )

    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
