const express = require('express');
const bodyParser = require('body-parser')
const productsController = require('../controllers/productsController.js');

const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));

router.get('/addProduct', productsController.getAddProduct);
router.post('/addProduct', productsController.postAddProduct);
router.get('/adminProducts', productsController.getAdminProducts);

router.get('/deleteProduct/:productId', productsController.deleteProduct);

router.post('/editProduct', productsController.postEditProduct);
router.get('/editProduct/:productId', productsController.getEditProduct);

module.exports = router;