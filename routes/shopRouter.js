const express = require('express');
//Importing body-parser
const bodyParser = require('body-parser')
//Importing controller to fetch data from models and render them to views
const productsController = require('../controllers/productsController.js');
const cartController = require('../controllers/cartController.js');

//.Router is inbuilt in express and created as follows.
//With the help of this router we handle requests
const router = express.Router();

//Using body parser to inform that the request data received can be parsed directly
router.use(bodyParser.urlencoded({extended:false}));

//When a certain url has been called, we invoke the controller to handle the request
//we are using .get, .post to specifically handle only that type of CRUD requests
router.get('/contactus', productsController.getContactusPage);
router.post('/contactSuccess', productsController.postContactusPage)

router.get('/showCart', cartController.showCart)
router.post('/addToCart', cartController.addToCart);
router.post('/deleteFromCart', cartController.deleteFromCart);

router.get('/showProduct/:productId', productsController.showProduct);

router.get('/', productsController.showProducts);

router.use(productsController.page404);

//Exporting this router so that it can be accessed by app.js file which imports it.
module.exports= router;