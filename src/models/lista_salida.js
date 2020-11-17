/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lista_salida', {
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
      allowNull: true,
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
    },
    id_tutor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tutor',
        key: 'id'
      }
    },
    salida: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'lista_salida',
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
        name: "fkIdx_101",
        using: "BTREE",
        fields: [
          { name: "id_registrador" },
        ]
      },
      {
        name: "fkIdx_106",
        using: "BTREE",
        fields: [
          { name: "id_tutor" },
        ]
      },
      {
        name: "fkIdx_95",
        using: "BTREE",
        fields: [
          { name: "id_fecha" },
        ]
      },
      {
        name: "fkIdx_98",
        using: "BTREE",
        fields: [
          { name: "id_alumno" },
        ]
      },
    ]
  });
};
