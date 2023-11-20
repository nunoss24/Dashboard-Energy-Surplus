var Sequelize = require('sequelize');
var sequelize = require('./database');
const bcrypt = require('bcrypt'); //encripta a pass a guardar na BD

var Utilizador = sequelize.define('utilizadores', {
    iduser: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nomeuser: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    pass: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telemovel: Sequelize.STRING(9),
    cpe: Sequelize.STRING(20),
    nif: Sequelize.STRING(9),
    morada: Sequelize.STRING,
    gastoComprador: Sequelize.FLOAT,
    consumoComprador: Sequelize.INTEGER,
    nCompras: Sequelize.INTEGER,
    servicosVendidos: Sequelize.INTEGER,
    totalGanho: Sequelize.FLOAT
},
    {
        timestamps: false,
    });

Utilizador.beforeCreate((user, options) => {
    return bcrypt.hash(user.pass, 10)
        .then(hash => {
            user.pass = hash;
        })
        .catch(err => {
            throw new Error();
        });
});

module.exports = Utilizador