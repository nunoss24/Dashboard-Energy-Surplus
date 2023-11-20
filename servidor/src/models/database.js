var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    '',
    'postgres',
    '',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres'
    }
);

module.exports = sequelize;
