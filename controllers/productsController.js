//const bodyParser = require('body-parser');
const Products = require('../models/products.js');

exports.page404 = (request, response, next)=>{
    console.log("404 ...")
    response.status(404).render('page404',{
        pageTitle:"Page Not Found"
    })
}

exports.getContactusPage = (request, response, next)=>{
    console.log("Get contact us ...")
    response.render('contactus', {
        pageTitle:"Contact Us Page"
    })
}

exports.postContactusPage = (request, response, next)=>{
    console.log("Post contact us ...")
    response.render('contactSuccess', {
        pageTitle:"Success"
    })
}

exports.getAdminProducts = (request, response, next)=>{
    console.log("Get Admin Products...")
    const productsList = Products.fetchAll();
    response.render( './admin/adminProducts', {
        pageTitle : "Products Page",
        productsList : productsList
    });
}

exports.showProducts = (request, response, next)=>{
    console.log("Show ProductS...")
    const productsList = Products.fetchAll();
    response.render( 'shop', {
        pageTitle : "Home Page",
        productsList : productsList
    });
}

exports.showProduct = (request, response, next)=>{
    console.log("Show ProducT...")
    const product = Products.fetch(request.params.productId)
    console.log(request.params)
    response.render('showProduct', {
        pageTitle:"Product Details",
        product: product
    })    
}

exports.getAddProduct = (request, response, next)=>{
    console.log("get add product...")
    response.render('./admin/addProduct', {
        pageTitle: "Add Product Page"
    });
}

exports.postAddProduct = (request, response, next)=>{
    console.log("post add product...")
    new Products(
        Math.random().toString(),
        request.body.title,
        request.body.imageURL,
        request.body.desc,
        request.body.price
    ).save();
    response.redirect('/');
}

exports.deleteProduct = (request, response, next)=>{
    console.log("delete Product...");
    Products.deleteProduct(request.params.productId);
    response.redirect('/admin/adminProducts')
}

exports.getEditProduct = (request, response, next)=>{
    console.log("Get Edit Product....");
    const product = Products.fetch(request.params.productId);
    response.render('./admin/editProduct', {
        pageTitle:"Edit Product Page",
        product: product
    })
}

exports.postEditProduct = (request, response, next)=>{
    console.log("Post Edit Product...");
    Products.postEditProduct(request.body);
    response.redirect('/admin/adminProducts');
}

