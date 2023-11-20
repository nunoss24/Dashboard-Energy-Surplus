var sequelize = require('../models/database');
var Utilizadores = require('../models/utilizadores');
var LigacaoUser = require('../models/ligacaoUser');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const Utilizador = require('../models/utilizadores');

sequelize.sync()
const controllers = {}

controllers.utilizadores_list = async (req, res) => {
    const data = await Utilizadores.findAll({
        include: [LigacaoUser]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        });
    res.json({ success: true, data: data });
}

controllers.login = async (req, res) => {
    if (req.body.email && req.body.pass) {
        var email = req.body.email;
        var pass = req.body.pass;
    }
    var user = await Utilizador.findOne({ where: { email: email } })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            console.log("Erro: " + error);
            return error;
        })
    if (pass === null || typeof pass === "undefined") {
        res.status(403).json({
            success: false,
            message: 'Campos em Branco'
        });
    } else {
        if (req.body.email && req.body.pass && user) {
            const isMatch = bcrypt.compareSync(pass, user.pass);
            if (req.body.email === user.email && isMatch) {
                let token = jwt.sign({ email: req.body.email, iduser: user.iduser }, config.jwtSecret,
                    {
                        expiresIn: '1h' //expira em 1 hora
                    });
                res.json({
                    success: true,
                    message: 'Autenticação realizada com sucesso!',
                    token: token,
                    iduser: user.iduser // Inclui o ID do usuário no objeto de resposta
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: 'Dados da autenticação inválidos.'
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Erro no processo de autenticação. Tente novamente mais tarde.'
            });
        }
    }
}

controllers.utilizadores_detail = async (req, res) => {
    const { id } = req.params;
    const data = await Utilizadores.findAll({
        where: { iduser: id },
        //include: [TipoUtilizadores]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });
}

controllers.utilizadores_create = async (req, res) => {
    // data
    const { iduser, nomeuser, email, pass, telemovel, cpe, nif, morada } = req.body;
    // create
    console.log('Dados recebidos:', req.body);
    const data = await Utilizadores.create({
        iduser: iduser,
        nomeuser: nomeuser,
        email: email,
        pass: pass,
        telemovel: telemovel,
        cpe: cpe,
        nif: nif,
        morada: morada
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

controllers.utilizadores_update = async (req, res) => {
    // parameter get id
    const { id } = req.params;
    // parameter POST
    const { nomeuser, email, pass, telemovel, cpe, nif, morada } = req.body;
    //const hashedPassword = await bcrypt.hash(pass, 10);
    // Update data
    const data = await Utilizadores.update({
        nomeuser: nomeuser,
        email: email,
        pass: pass,
        telemovel: telemovel,
        cpe: cpe,
        nif: nif,
        morada: morada
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
    res.json({ success: true, data: data });
}

controllers.utilizadores_delete = async (req, res) => {
    // parâmetros por post
    const { iduser } = req.body;
    // delete por sequelize
    const del = await Utilizadores.destroy({
        where: { iduser: iduser }
    })
    res.json({ success: true, deleted: del});
}

module.exports = controllers;