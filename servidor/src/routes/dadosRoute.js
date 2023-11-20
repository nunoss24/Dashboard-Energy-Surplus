const express = require('express');
const router = express.Router();
//importer os controladores [2]

const dadosController = require('../controllers/dadosController')

router.get('/', dadosController.dados_list);

router.put('/update/:id', dadosController.dados_update);

module.exports = router;
