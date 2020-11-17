/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('direccion_personal', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_personal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'personal',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'direccion_personal',
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
        name: "fkIdx_136",
        using: "BTREE",
        fields: [
          { name: "id_personal" },
        ]
      },
    ]
  });
};
