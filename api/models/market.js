'use strict';
module.exports = (sequelize, DataTypes) => {
  const market = sequelize.define('market', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  market.associate = function(models) {
    // associations can be defined here
    market.belongsTo(models.category, {
      foreignKey: {
        field: 'categoryId',
        allowNull: false,
      },
      onDelete: 'cascade',
    })
  };
  return market;
};