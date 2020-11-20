const multer = require('multer');
const Model = require('../models/image');
const Product = require('../models/product');
const { handleMongooseValidationError } = require('./utils');
const logger = require('../logger');

const { COMMON, VALIDATION } = require('../helpers/errors');
const { IMAGES } = require('../helpers/config');

const listAllByProduct = (req, res) => {
  logger.info(`Listing images for product ${req.params.productId}...`);
  Model.find({ product: { _id: req.params.productId } }, '_id title')
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
};

const deleteById = (req, res) => {
  logger.info(`Deleting Image ${req.params.id}...`);
  Model.findByIdAndRemove(req.params.id)
    .then((item) => {
      if (!item) {
        res.status(404).send({
          message: COMMON.NOT_FOUND,
        });
      } else {
        logger.info('Successfully deleted');
        res.status(204);
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
  logger.info(`Getting Image ${req.params.id}...`);
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

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: IMAGES.MAX_SIZE } }).single(IMAGES.FIELD);

const create = (req, res) => {
  logger.info('Creating Image...');
  upload(req, res, (err) => {
    if (err) {
      logger.error(err.message);
      if (err instanceof multer.MulterError) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    } else if (!IMAGES.VALID_MIMES.includes(req.file.mimetype)) {
      logger.error(`${req.file.mimetype} is not valid`);
      res.status(400).send({ message: VALIDATION.INVALID_FILETYPE });
    } else {
      Product.findById(req.params.productId)
        .then((product) => {
          if (product) {
            logger.info(JSON.stringify(req.file));
            const model = new Model({
              title: req.body.title,
              product: { _id: req.params.productId },
              img: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
              },
            });
            model.save()
              .then((newItem) => {
                const { _id, title } = newItem;
                res.status(201).send({ _id, title });
                logger.info(`Product created with id ${_id}`);
              })
              .catch((error) => {
                logger.error(error.message);
                handleMongooseValidationError(req, res, error);
              });
          } else {
            logger.info('Product Not found');
            res.status(404).send({
              message: COMMON.NOT_FOUND,
            });
          }
        })
        .catch((error) => {
          logger.error(error.message);
          res.status(500).send({ message: error.message });
        });
    }
  });
};

const updateTitle = (req, res) => {
  logger.info(`Updating title for image ${req.params.id}...`);

  const data = { title: req.body.title };

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
    });
};

module.exports = {
  listAllByProduct, create, deleteById, getById, updateTitle,
};
