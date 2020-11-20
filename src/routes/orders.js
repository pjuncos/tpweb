const express = require('express');
const { OrdersController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(OrdersController.listAll);

router.route('/')
  .post(OrdersController.create);

router.route('/:id')
  .patch(OrdersController.changeStatus);

router.route('/:id')
  .get(OrdersController.getById);

module.exports = router;
