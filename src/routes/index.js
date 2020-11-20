const express = require('express');
const productsRouter = require('./products');
const clientsRouter = require('./clients');
const ordersRouter = require('./orders');
const usersRouter = require('./users');

const router = express.Router();
router.use('/products', productsRouter);
router.use('/clients', clientsRouter);
router.use('/users', usersRouter);
router.use('/orders', ordersRouter);

module.exports = router;
