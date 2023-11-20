var Sequelize = require('sequelize');
var sequelize = require('./database');

var TiposUtilizadores = sequelize.define('tipoutilizadores', {
    idtipo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    code: {
        type: Sequelize.STRING(1),
        primaryKey: true,
    },
    tipo: Sequelize.STRING
},
    {
        timestamps: false,
    });

module.exports = TiposUtilizadores