var Sequelize = require('sequelize');
var sequelize = require('./database');

var Utilizadores = require('./utilizadores');
var Ofertas = sequelize.define('ofertas', {
    idoferta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nomevendedor: Sequelize.STRING,
    duracaovenda: Sequelize.INTEGER,
    potenciaproduto: Sequelize.INTEGER,
    precomes: Sequelize.FLOAT,
},
    {
        timestamps: false,
    });

Ofertas.belongsTo(Utilizadores);
Utilizadores.hasMany(Ofertas);

module.exports = Ofertas