const Model = require('../models/product');
const { handleMongooseValidationError } = require('./utils');
const logger = require('../logger');

const { COMMON } = require('../helpers/errors');
const { STATUS } = require('../helpers/constants');

const createFromObject = (obj) => ({
  title: obj.title,
  description: obj.description,
  price: obj.price,
});

const listAll = (req, res) => {
  logger.info('Listing products...');

  let filter = {};
  let filterError = false;
  if (req.query.status) {
    if (!Object.values(STATUS).includes(req.query.status)) {
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

const deleteById = (req, res) => {
  logger.info(`Deleting Product ${req.params.id}...`);
  Model.findByIdAndRemove(req.params.id)
    .then((item) => {
      if (!item) {
        res.status(404).send({
          message: COMMON.NOT_FOUND,
        });
      } else {
        logger.info('Successfully deleted');
        res.status(204).send();
      }
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).send({
        message: err.message,
      });
    });
};

const getById = (req, res) => {
  logger.info(`Getting Product ${req.params.id}...`);
  Model.findById(req.params.id)
    .then((item) => {
      if (!item) {
        logger.info('Not found');
        res.status(404).send({
          message: COMMON.NOT_FOUND,
        });
      } else {
        logger.info(item);
        res.status(200).send(item);
      }
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).send({
        message: err.message,
      });
    });
};

const create = (req, res) => {
  logger.info('Creating Product...');

  const model = new Model(createFromObject(req.body));
  model.save()
    .then((newItem) => {
      res.status(201).send(newItem);
      const { _id } = newItem;
      logger.info(`Poduct created with id ${_id}`);
    })
    .catch((error) => {
      logger.error(error.message);
      handleMongooseValidationError(req, res, error);
    });
};

const update = (req, res) => {
  logger.info(`Updating Product ${req.params.id}...`);

  const data = createFromObject(req.body);

  Model.validate(data)
    .then(
      Model.findOneAndUpdate({ _id: req.params.id }, data, { new: true })
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
        }),
    )
    .catch((error) => {
      logger.error(error.message);
      handleMongooseValidationError(req, res, error);
    });
};

const changeStatus = (req, res) => {
  logger.info(`Getting Product ${req.params.id}...`);
  if (!req.body.status || !Object.values(STATUS).includes(req.body.status)) {
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

module.exports = {
  listAll, create, deleteById, getById, update, changeStatus,
};
