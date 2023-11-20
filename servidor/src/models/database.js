var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'bd_projeto',
    'postgres',
    'qwerty2424',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
);

module.exports = sequelize;