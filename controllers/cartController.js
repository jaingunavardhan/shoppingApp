//This Controller uses the CART model to renser the data onto views of cart
const Cart = require('../models/cart.js');
const Product = require('../models/product.js');

//Exporting the function to the routes which imports it.
exports.addToCart = (request, response, next)=>{
    console.log("Add Cart...")
    let fetchedCart;
    request.user.getCart()
        .then((cart)=>{
            fetchedCart = cart;
            console.log("Fetched Cart...", fetchedCart)
            return fetchedCart.getProducts({where:{id:request.body.productId}});
        })
        .then(productsList=>{
            if(productsList.length>0)
            {
                const existingProduct = productsList[0];
                console.log("Fetched cart products with id...", existingProduct.cartItem.quantity);
                return fetchedCart.addProduct(existingProduct, {through: {quantity: existingProduct.cartItem.quantity + 1}})
            }
            let cartNewProduct;
            return Product.findByPk(request.body.productId)
                        .then(product=>{
                            cartNewProduct = product;
                            console.log("Fetched cart products NO id, cartNewProduct...", cartNewProduct)
                            return fetchedCart.addProduct(cartNewProduct, {through: {quantity: 1}});
                        }) 
        })
        .then(cart=>{
            response.redirect('/showCart');
        })
        .catch(error=>console.log(error));  
}

exports.showCart = (request, response, next)=>{
    console.log("Show Cart...")
    let productsInCart, cartTotal=0;
    request.user.getCart()
        .then(cart=>{
            return cart.getProducts();
        })
        .then(products=>{
            productsInCart = products;
            for(var i=0; i<productsInCart.length; i++)
            {
                cartTotal += productsInCart[i].cartItem.quantity * productsInCart[i].price;
            }
            response.render('showCart', {
                pageTitle:"Cart",
                productsList : productsInCart,
                totalPrice:cartTotal.toFixed(1)
            })                
        })
        .catch(error=>console.log(error)); 
}

exports.deleteFromCart = (request, response, next)=>{
    console.log("Delete Cart...", request.body.productId);
    request.user.getCart()
        .then(cart=>{
            console.log("Delete cart..cart...", cart);
            return cart.getProducts({where:{id: request.body.productId}})
        })
        .then(productsList=>{
            console.log("products list...", productsList);
            const product = productsList[0];
            console.log("Product....", product);
            return product.cartItem.destroy();
        })
        .then(result=>{
            console.log("Deleted, Redirecting to Showcart..")
            response.redirect('/showCart');
        })
}

