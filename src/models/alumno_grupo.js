/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('alumno_grupo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_alumno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'alumno',
        key: 'id'
      }
    },
    id_grupo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'grupo',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'alumno_grupo',
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
        name: "fkIdx_27",
        using: "BTREE",
        fields: [
          { name: "id_alumno" },
        ]
      },
      {
        name: "fkIdx_35",
        using: "BTREE",
        fields: [
          { name: "id_grupo" },
        ]
      },
    ]
  });
};
