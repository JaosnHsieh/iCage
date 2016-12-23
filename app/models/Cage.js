/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cage', {
    idNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    no: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true
    },
    qrCodeId: {
      type: DataTypes.STRING,
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
    tableName: 'Cage'
  });
};