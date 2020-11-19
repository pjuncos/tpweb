const express = require('express');
const { CombosController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(CombosController.listAll);

module.exports = router;
