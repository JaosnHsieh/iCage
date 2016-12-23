/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AnimalLog', {
    idNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cageNo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    animalId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    inOut: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    memo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customerId:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    
  }, {
    tableName: 'AnimalLog'
  });
};