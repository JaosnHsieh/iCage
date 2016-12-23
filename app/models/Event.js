/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Event', {
    idNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
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
    }
  }, {
    tableName: 'Event'
  });
};