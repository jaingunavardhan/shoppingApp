const express = require('express');
const bodyParser = require('body-parser')
const productsController = require('../controllers/productsController.js');
const cartController = require('../controllers/cartController.js');

const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}));

router.get('/contactus', productsController.getContactusPage);
router.post('/contactSuccess', productsController.postContactusPage)

router.get('/showCart', cartController.showCart)
router.post('/addToCart', cartController.addToCart);
router.post('/deleteFromCart', cartController.deleteFromCart);

router.get('/showProduct/:productId', productsController.showProduct);

router.get('/', productsController.showProducts);

router.use(productsController.page404);

module.exports= router;