const fs = require('fs');
const path = require('path')
const Products = require('./products.js')

const cartpath = path.join(__dirname, 'data', 'cart.json');

module.exports = class Cart{
    static addToCart(productId, callback)
    {
    console.log("MODULE - add to cart...")
        
        const product = Products.fetch(productId);
        console.log("Product Fetched...", product);
        if(product!=undefined)
        {
            let cart = { productsList:[], totalPrice:0 };
            let flag = false;

            fs.readFile(cartpath, (error, fileContent)=>{
                if(!error)
                {
                    cart = JSON.parse( fileContent );

                    //console.log("For start...", cart);
                    for(let prod of cart.productsList)
                    {
                        if(prod.id == productId)
                        {
                            prod.qty = 1 + prod.qty;
                            cart.totalPrice = cart.totalPrice + prod.price;
                            flag = true;
                            break;
                        }
                    }
                    console.log("For END...", cart);

                    if(flag==true)
                    {
                        fs.writeFile( cartpath, JSON.stringify(cart), (error)=>{
                            if(!error)
                                callback();
                        });
                    }
                }
                if(error || flag==false)
                {
                    console.log("No File", cart);
                    let newProduct = {...product, qty:1};
                    cart.productsList.push( newProduct );
                    
                    cart.totalPrice = cart.totalPrice + newProduct.price;
                    console.log("No File END - ", cart);

                    //console.log("Final cart - ", JSON.stringify(cart) );
                
                    fs.writeFile( cartpath, JSON.stringify(cart), (error)=>{
                        if(!error)
                            callback();
                    });
                }
                
            })
        }
        else
        {
            console.log("Product Not Available...", product);
            alert("Product Not available");
        }
        
    }


    static showCart(callback)
    {
        console.log("MODULE - show cart...")
        
        //const productsList = Products.fetchAll();
        fs.readFile(cartpath, (error, fileContent)=>{
            if(!error)
            {
                let cart = JSON.parse(fileContent);
                const availableCartProducts = [];
                let totalPrice = 0;
                for(let product of cart.productsList)
                {
                    const isAvailable = Products.fetch(product.id);
                    if(isAvailable != undefined)
                    {
                        availableCartProducts.push( {...isAvailable, qty:product.qty} );
                        totalPrice += (isAvailable.price * product.qty);
                    }
                }
                let updatedCart = {productsList:availableCartProducts, totalPrice:totalPrice};
                console.log("uodated cart - ", updatedCart);
                fs.writeFile(cartpath, JSON.stringify(updatedCart), (error)=>{
                    if(!error)
                        callback(updatedCart);
                })
            }
            if(error){
                callback({productsList:[], totalPrice:0})
            }
        })
    }


    static deleteFromCart(productId, callback)
    {
        console.log("MODULE - Delte from cart");

        fs.readFile(cartpath, (error, fileContent)=>{
            let cart = JSON.parse(fileContent);

            let updatedProductsList = [];
            let totalPrice = 0;

            for(let product of cart.productsList)
            {
                if(product.id == productId)
                {
                    product.qty = product.qty-1;
                    //cart.totalPrice = cart.totalPrice - product.price;
                }
                if(product.qty == 0)
                    continue;
                updatedProductsList.push(product);
                totalPrice += (product.price * product.qty);
            }

            let updatedCart = { productsList:updatedProductsList, totalPrice:totalPrice };

            fs.writeFile(cartpath, JSON.stringify(updatedCart), (error)=>{
                callback();
            })
        })
    }
}