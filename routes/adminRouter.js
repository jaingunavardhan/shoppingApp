const express = require('express');
//Importing body-parser
const bodyParser = require('body-parser')
//Importing controller to fetch data from models and render them to views
const productsController = require('../controllers/productsController.js');

//.Router is inbuilt in express and created as follows.
//With the help of this router we handle requests
const router = express.Router();

//Using body parser to inform that the request data received can be parsed directly
router.use(bodyParser.urlencoded({extended:false}));

//When a certain url has been called, we invoke the controller to handle the request
//we are using .get, .post to specifically handle only that type of CRUD requests
router.get('/addProduct', productsController.getAddProduct);
router.post('/addProduct', productsController.postAddProduct);
router.get('/adminProducts', productsController.getAdminProducts);

router.get('/deleteProduct/:productId', productsController.deleteProduct);

router.post('/editProduct', productsController.postEditProduct);
router.get('/editProduct/:productId', productsController.getEditProduct);

//Exporting this router so that it can be accessed by app.js file which imports it.
module.exports = router;