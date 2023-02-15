'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Review.hasMany( //Association with Review and ReviewImage
      models.ReviewImage,
      {foreignKey: "reviewId"}
      )

      Review.belongsTo( //Association with Review and Spot
        models.Spot,
        {foreignKey: "spotId", onDelete: 'cascade', hooks:true}
      )

      Review.belongsTo( //Association with Review and User
      models.User,
      {foreignKey: "userId", onDelete: 'cascade', hooks:true}
    )

    }
  }
  Review.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
