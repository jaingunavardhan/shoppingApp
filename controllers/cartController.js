const Cart = require('../models/cart.js');

exports.addToCart = (request, response, next)=>{
    console.log("Add Cart...")
    Cart.addToCart(request.body.productId, ()=>{
        console.log("Added, Redirecting to Showcart..")
        response.redirect('/showCart');
    })
    
}

exports.showCart = (request, response, next)=>{
    console.log("Show Cart...")
    Cart.showCart( (cartObject)=>{
        response.render('showCart', {
            pageTitle:"Cart",
            productsList : cartObject.productsList,
            totalPrice:cartObject.totalPrice
        })
    });
    
        
}

exports.deleteFromCart = (request, response, next)=>{
    console.log("Delete Cart...")
    Cart.deleteFromCart(request.body.productId, ()=>{
        console.log("Deleted, Redirecting to Showcart..")
        response.redirect('/showCart');
    })
}

