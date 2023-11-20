const express = require('express');
const router = express.Router();
//importer os controladores [2]

const contratosController = require('../controllers/contratosController')

router.get('/', contratosController.contratos_list);
router.get('/:id', contratosController.contratos_detail);
router.get('/detail/:id', contratosController.contratos_detailid);
router.post('/create', contratosController.contratos_create);
router.put('/update/:id', contratosController.contratos_update);

module.exports = router;
