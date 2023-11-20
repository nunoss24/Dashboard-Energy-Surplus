var Sequelize = require('sequelize');
var sequelize = require('./database');

var Utilizadores = require('./utilizadores');
var Ofertas = require('./ofertas');
var Infraestruturas = require('./infraestruturas');
var Contratos = sequelize.define('contratos', {
    idcontrato: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado: Sequelize.BOOLEAN,
    duracao: Sequelize.INTEGER,
    datacontrato: Sequelize.DATEONLY
},
    {
        timestamps: false,
    });

Contratos.belongsTo(Infraestruturas);
Infraestruturas.hasMany(Contratos);

Contratos.belongsTo(Ofertas);
Ofertas.hasMany(Contratos);

Contratos.belongsTo(Utilizadores, {
    foreignKey: 'utilizadorIdV',
});
Utilizadores.hasMany(Contratos, {
    foreignKey: {
        name: 'utilizadorIdV'
    }
});

Contratos.belongsTo(Utilizadores, {
    foreignKey: 'utilizadorIdC',
});
Utilizadores.hasMany(Contratos, {
    foreignKey: {
        name: 'utilizadorIdC'
    }
});

module.exports = Contratos