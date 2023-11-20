var sequelize = require('../models/database');
var Infraestruturas = require('../models/infraestruturas');
const controllers = {}

controllers.infraestruturas_list = async (req, res) => {
    const data = await Infraestruturas.findAll({
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}

controllers.infraestruturas_detail = async (req, res) => {
    const { id } = req.params;
    const data = await Infraestruturas.findAll({
        where: { utilizadoreIduser: id }
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });
}

controllers.infraestruturas_detailid = async (req, res) => {
    const { id } = req.params;
    const data = await Infraestruturas.findAll({
        where: { idinfraestrutura: id }
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });
}

controllers.infraestruturas_create = async (req, res) => {
    // data
    const { idinfraestrutura, nome, capacidadegeracao, tipoproducao, areadeproducao, morada, utilizadoreIduser } = req.body;
    // create
    console.log('Dados recebidos:', req.body);
    const data = await Infraestruturas.create({
        idinfraestrutura: idinfraestrutura,
        nome: nome,
        capacidadegeracao: capacidadegeracao,
        tipoproducao: tipoproducao,
        areadeproducao: areadeproducao,
        morada: morada,
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
        message: "Infraestrutura criado com sucesso!",
        data: data
    });
    console.log('Dados salvos:', data);
}

controllers.infraestruturas_update = async (req, res) => {
    // parameter get id
    const { id} = req.params;
    // parameter POST
    const { nome, capacidadegeracao, tipoproducao, areadeproducao, morada } = req.body;
    // Update data
    const data = await Infraestruturas.update({
        nome: nome,
        capacidadegeracao: capacidadegeracao,
        tipoproducao: tipoproducao,
        areadeproducao: areadeproducao,
        morada: morada
    },
        {
            where: { idinfraestrutura: id }
        })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });
}

controllers.infraestruturas_delete = async (req, res) => {
    // parâmetros por post
    const { idinfraestrutura } = req.body;
    // delete por sequelize
    const del = await Infraestruturas.destroy({
        where: { idinfraestrutura: idinfraestrutura }
    })
    res.json({ success: true, deleted: del});
}

module.exports = controllers;