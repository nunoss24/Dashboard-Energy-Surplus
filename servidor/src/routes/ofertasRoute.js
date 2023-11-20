const express = require('express');
const router = express.Router();
//importer os controladores [2]

const ofertasController = require('../controllers/ofertasController')

router.get('/', ofertasController.ofertas_list);
router.get('/:id', ofertasController.ofertas_detail);
router.post('/create', ofertasController.ofertas_create);
router.delete('/delete', ofertasController.ofertas_delete);

module.exports = router;
