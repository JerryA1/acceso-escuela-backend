const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('TACS', 'jerrya', 'Holamundo1', {
    dialect: 'mysql', 
    host: "127.0.0.1",
    port: 3306    
  });

module.exports = sequelize;