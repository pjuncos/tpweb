const express = require('express');
const { ClientsController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(ClientsController.listAll);

module.exports = router;
