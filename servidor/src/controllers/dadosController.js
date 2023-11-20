var Utilizadores = require('../models/utilizadores');

var sequelize = require('../models/database');
const controllers = {}

controllers.dados_list = async (req, res) => {
    const data = await Utilizadores.findAll({
        //include: [Genero]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}

controllers.dados_update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { gastoComprador, consumoComprador, nCompras, servicosVendidos, totalGanho} = req.body;
    // Update data
    const data = await Utilizadores.update({
        gastoComprador: gastoComprador,
        consumoComprador: consumoComprador,
        nCompras: nCompras,
        servicosVendidos: servicosVendidos,
        totalGanho: totalGanho
    },
        {
            where: { iduser: id }
        })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data});
}

module.exports = controllers;