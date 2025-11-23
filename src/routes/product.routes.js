const express = require('express');
const ProductController = require('../controllers/product.controller');
const router = express.Router();

router.post('/', ProductController.create);

router.get('/', ProductController.findAll);

router.patch('/:id', ProductController.update);

router.delete('/:id', ProductController.delete);

module.exports = router;