var Sequelize = require('sequelize');
var sequelize = require('./database');

var Utilizadores = require('./utilizadores');
var TiposUtilizadores = require('./tipoutilizadores');
var Ligacao = sequelize.define('ligacaoUser', {
},
    {
        timestamps: false,
    });

Ligacao.belongsTo(Utilizadores);
Utilizadores.hasMany(Ligacao);
Ligacao.belongsTo(TiposUtilizadores);
TiposUtilizadores.hasMany(Ligacao);

module.exports = Ligacao