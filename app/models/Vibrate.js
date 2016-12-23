/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Vibrate', {
    idNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    customerId:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    
  }, {
    tableName: 'Vibrate'
  });
};