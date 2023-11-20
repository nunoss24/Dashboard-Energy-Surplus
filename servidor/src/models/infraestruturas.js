var Sequelize = require('sequelize');
var sequelize = require('./database');

var Utilizadores = require('./utilizadores');
var Infraestruturas = sequelize.define('infraestruturas', {
    idinfraestrutura: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: Sequelize.STRING,
    capacidadegeracao: Sequelize.INTEGER,
    tipoproducao: Sequelize.STRING,
    areadeproducao: Sequelize.INTEGER,
    morada: Sequelize.STRING
},
    {
        timestamps: false,
    });

Infraestruturas.belongsTo(Utilizadores);
Utilizadores.hasMany(Infraestruturas);

module.exports = Infraestruturas