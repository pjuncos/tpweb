const Model = require('../models/order');
const Client = require('../models/client');
const { handleMongooseValidationError } = require('./utils');
const logger = require('../logger');
const { VALIDATION, COMMON } = require('../helpers/errors');
const { ORDER_STATUS } = require('../helpers/constants');

const listAll = (req, res) => {
  logger.info('Listing orders');

  let filter = {};
  let filterError = false;
  if (req.query.status) {
    if (!Object.values(ORDER_STATUS).includes(req.query.status)) {
      res.status(400).send();
      filterError = true;
    } else {
      filter = { status: { $in: req.query.status.split(',') } };
      logger.info(`filter: ${JSON.stringify(filter)}`);
    }
  }

  if (!filterError) {
    Model.find(filter)
      .then((items) => {
        logger.info(`${items.length} items retrieved`);
        res.status(200).send(items);
      })
      .catch((err) => {
        logger.error(err.message);
        res.status(500).send({
          message: err.message || COMMON.UNKNOWN_ERROR,
        });
      });
  }
};

const create = (req, res) => {
  logger.info('Creating Order...');

  if (!req.body.clientId || !req.body.products || !req.body.totalPrice) {
    logger.info(VALIDATION.MISSING_FIELDS);
    res.status(400).send({ message: VALIDATION.MISSING_FIELDS });
  }

  logger.info(`Getting client ${req.body.clientId}...`);
  Client.findById(req.body.clientId)
    .then((client) => {
      if (!client) {
        logger.info('Client not found');
        res.status(404).send({
          message: 'Client not found',
        });
      } else {
        const products = [];

        req.body.products.forEach((product) => {
          products.push({
            product: { _id: product.productId },
            quantity: product.quantity,
            price: product.price,
          });
        });

        const model = new Model({
          client: { _id: req.body.clientId },
          items: products,
          totalPrice: req.body.totalPrice,
        });
        model.save()
          .then((newItem) => {
            res.status(201).send(newItem);
            const { _id } = newItem;
            logger.info(`Order created with id ${_id}`);
          })
          .catch((error) => {
            logger.error(error.message);
            handleMongooseValidationError(req, res, error);
          });
      }
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).send({
        message: err.message,
      });
    });
};

const changeStatus = (req, res) => {
  logger.info(`Getting Order ${req.params.id}...`);
  if (!req.body.status || !Object.values(ORDER_STATUS).includes(req.body.status)) {
    res.status(400).send();
  } else {
    Model.findOneAndUpdate({ _id: req.params.id }, { status: req.body.status }, { new: true })
      .then((updated) => {
        if (!updated) {
          logger.info('Not found');
          res.status(404).send({
            message: COMMON.NOT_FOUND,
          });
        } else {
          logger.info(updated);
          res.status(200).send(updated);
        }
      })
      .catch((err) => {
        logger.error(err.message);
        res.status(500).send({
          message: err.message,
        });
      });
  }
};

const getById = (req, res) => {
  logger.info(`Getting order ${req.params.id}...`);
  Model.findById(req.params.id)
    .then((order) => {
      if (!order) {
        logger.info('Order not found');
        res.status(404).send({
          message: COMMON.NOT_FOUND,
        });
      } else {
        logger.info(order);
        res.status(200).send(order);
      }
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).send({
        message: err.message,
      });
    });
};

module.exports = {
  listAll, create, changeStatus, getById,
};
