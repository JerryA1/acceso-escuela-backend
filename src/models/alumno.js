const Sequelize = require('sequelize');
const db = require('../database');
const { DataTypes } = require('sequelize');

const UserSchema = db.define('ALUMNO', {
    id: {
        type: Sequelize.INTEGER,
        required: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        required: true
    },
    apellido: {
        type: DataTypes.STRING,
        required: true
    },
    foto: {
        type: DataTypes.STRING,
        required: true
    },
    direccionDefault: {
        type: DataTypes.STRING,
        required: true
    },
    curp: {
        type: DataTypes.STRING,
        required: true
    },
    activo: {
        type: DataTypes.INTEGER,
        required: true
    }
}, {
    freezeTableName: true,
    tableName: 'alumno',
    timestamps: false
  });

module.exports = UserSchema;