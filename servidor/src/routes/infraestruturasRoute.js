const express = require('express');
const router = express.Router();

const infraestruturasController = require('../controllers/infraestruturasController')

router.get('/', infraestruturasController.infraestruturas_list);

router.get('/:id', infraestruturasController.infraestruturas_detail);

router.get('/detail/:id', infraestruturasController.infraestruturas_detailid);

router.post('/create', infraestruturasController.infraestruturas_create);

router.put('/update/:id', infraestruturasController.infraestruturas_update);

router.delete('/delete', infraestruturasController.infraestruturas_delete);

module.exports = router;