const express = require('express');
const { ClientsController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(ClientsController.listAll);

router.route('/')
  .post(ClientsController.create);

router.route('/:id')
  .delete(ClientsController.deleteById);

router.route('/:id')
  .get(ClientsController.getById);

router.route('/:id')
  .put(ClientsController.update);

module.exports = router;
