/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('direccion_tutor', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_tutor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tutor',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'direccion_tutor',
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
        name: "fkIdx_129",
        using: "BTREE",
        fields: [
          { name: "id_tutor" },
        ]
      },
    ]
  });
};
