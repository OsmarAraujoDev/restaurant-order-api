const express = require('express');
const OrderController = require('../controllers/order.controller');
const router = express.Router();

router.post('/:userId', OrderController.create);

router.get('/', OrderController.findAll);

router.patch('/:id', OrderController.update);

router.delete('/:id', OrderController.delete);

module.exports = router;