const express = require('express');
const { OrdersController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(OrdersController.listAll);

module.exports = router;
