var sequelize = require('../models/database');
var LigacaoUser = require('../models/ligacaoUser');

const controllers = {}

controllers.ligacao_list = async (req, res) => {
    const data = await LigacaoUser.findAll({
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

controllers.ligacao_create = async (req, res) => {
    // data
    const { id, utilizadoreIduser, tipoutilizadoreCode } = req.body;
    // create
    console.log('Dados recebidos:', req.body);
    const data = await LigacaoUser.create({
        id: id,
        utilizadoreIduser: utilizadoreIduser,
        tipoutilizadoreCode: tipoutilizadoreCode
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
    console.log('Dados salvos:', data);
}

module.exports = controllers;