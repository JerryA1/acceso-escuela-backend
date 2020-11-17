/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lista_acceso', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_fecha: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'fecha',
        key: 'id'
      }
    },
    id_alumno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'alumno',
        key: 'id'
      }
    },
    id_registrador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'personal',
        key: 'id'
      }
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    comentario: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'lista_acceso',
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
        name: "fkIdx_74",
        using: "BTREE",
        fields: [
          { name: "id_fecha" },
        ]
      },
      {
        name: "fkIdx_77",
        using: "BTREE",
        fields: [
          { name: "id_alumno" },
        ]
      },
      {
        name: "fkIdx_87",
        using: "BTREE",
        fields: [
          { name: "id_registrador" },
        ]
      },
    ]
  });
};
