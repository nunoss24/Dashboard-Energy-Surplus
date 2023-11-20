var sequelize = require('../models/database');
var Ofertas = require('../models/ofertas');
var Utilizadores = require('../models/utilizadores');
const controllers = {}

controllers.ofertas_list = async (req, res) => {
    const data = await Ofertas.findAll({
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

controllers.ofertas_detail = async (req, res) => {
    const { id } = req.params;
    const data = await Ofertas.findAll({
        where: { idoferta: id },
        include: [Utilizadores]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });
}

controllers.ofertas_create = async (req, res) => {
    // data
    const { idoferta, nomevendedor, duracaovenda, potenciaproduto, precomes, utilizadoreIduser } = req.body;
    // create
    const data = await Ofertas.create({
        idoferta: idoferta,
        nomevendedor: nomevendedor,
        duracaovenda: duracaovenda,
        potenciaproduto: potenciaproduto,
        precomes: precomes,
        utilizadoreIduser: utilizadoreIduser
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            console.log("Erro: " + error)
            return error;
        })
    // return res
    res.status(200).json({
        success: true,
        data: data
    });
}

controllers.ofertas_delete = async (req, res) => {
    // parâmetros por post
    const { idoferta } = req.body;
    // delete por sequelize
    const del = await Ofertas.destroy({
        where: { idoferta: idoferta }
    })
    res.json({ success: true, deleted: del});
}


module.exports = controllers;