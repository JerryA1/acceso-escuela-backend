/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tutorado', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tutor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tutor',
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
    principal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    llaveQR: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    llaveAlt: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tutorado',
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
        name: "fkIdx_56",
        using: "BTREE",
        fields: [
          { name: "id_tutor" },
        ]
      },
      {
        name: "fkIdx_59",
        using: "BTREE",
        fields: [
          { name: "id_alumno" },
        ]
      },
    ]
  });
};
