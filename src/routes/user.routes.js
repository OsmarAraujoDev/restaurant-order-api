const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

router.post('/', UserController.register);

router.post('/login', UserController.login);

router.get('/:id', UserController.getById);

router.patch('/:id', UserController.update);

router.delete('/:id', UserController.delete);

module.exports = router;