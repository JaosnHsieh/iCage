/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Animal', {
    idNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    animalNo: {
      type: DataTypes.STRING,
      allowNull: true,
      unique:true
    },
    status:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    strainId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cageId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cageNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sex: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    memo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: true
    },
    iacuc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    customerId:{
      type: DataTypes.INTEGER,
      allowNull: true,
    }
    
  }, {
    tableName: 'ANIMAL'
  });
};


    // Creat_Date: {
    //   type: DataTypes.DATE,
    //   allowNull: true
    // },