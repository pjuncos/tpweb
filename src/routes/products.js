const express = require('express');

const { ProductsController, ImagesController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(ProductsController.listAll);

router.route('/')
  .post(ProductsController.create);

router.route('/:id')
  .delete(ProductsController.deleteById);

router.route('/:id')
  .get(ProductsController.getById);

router.route('/:id')
  .put(ProductsController.update);

router.route('/:id')
  .patch(ProductsController.changeStatus);

router.route('/:productId/images')
  .post(ImagesController.create);

router.route('/:productId/images')
  .get(ImagesController.listAllByProduct);

router.route('/:productId/images/:id')
  .get(ImagesController.getById);

router.route('/:productId/images/:id')
  .patch(ImagesController.updateTitle);

module.exports = router;
