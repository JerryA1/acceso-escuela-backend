/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grupo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    grado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    grupo: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    id_profesor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'personal',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'grupo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fkIdx_18",
        using: "BTREE",
        fields: [
          { name: "id_profesor" },
        ]
      },
    ]
  });
};
