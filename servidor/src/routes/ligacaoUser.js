const express = require('express');
const router = express.Router();

const ligacaoController = require('../controllers/ligacaoUserController')

router.get('/', ligacaoController.ligacao_list);

router.post('/create', ligacaoController.ligacao_create);

module.exports = router;