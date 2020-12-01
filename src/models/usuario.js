/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_tipo_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipo_usuario',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'usuario',
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
        name: "fkIdx_147",
        using: "BTREE",
        fields: [
          { name: "id_tipo_usuario" },
        ]
      },
    ]
  });
};
