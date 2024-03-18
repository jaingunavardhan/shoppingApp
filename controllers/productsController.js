//This Controller uses the PRODUCT model to renser the data onto views of PRODUCTS
const Products = require('../models/products.js');

//Exporting the function to the routes which imports it.
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
    //Rendering the ejs file and passing the data to the ejs file so that it can handle how to display.
    //Refer .ejs (Templating Engines) to get more understanding of how the data is handled in .ejs views  
    Products.fetchAll()
        .then( ([rowsData, metaData])=>{
            response.render( './admin/adminProducts', {
                pageTitle : "Products Page",
                productsList : rowsData
            });
        })
}

exports.showProducts = (request, response, next)=>{
    console.log("Show ProductS...")
    //Here we received the promise as a return from Products.fetchAll()
    //We destructure the result of the promise into rowsData(a list of rows) & metaData(we don't use)
    Products.fetchAll()
        .then( ([rowsData, metaData])=>{
            response.render( 'shop', {
                pageTitle : "Home Page",
                productsList : rowsData
            });
        })
        .catch(error=>{console.log(error)})
    
}

exports.showProduct = (request, response, next)=>{
    console.log("Show ProducT...")
    Products.fetch(request.params.productId)
        .then( ([rowsData, metaData])=>{
            response.render('showProduct', {
                pageTitle:"Product Details",
                product: rowsData[0]
            }) 
        })
        .catch(error=>{console.log(error)})
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
        request.body.title,
        request.body.imageURL,
        request.body.description,
        request.body.price
    ).save()
        .then( ()=>{
            response.redirect('/');
        })
        .catch(error=>{console.log(error)})
}

exports.deleteProduct = (request, response, next)=>{
    console.log("delete Product...");
    Products.deleteProduct(request.params.productId)
        .then( ()=>{
            response.redirect('/admin/adminProducts')
        })
        .catch(error=>{console.log(error)});
}

exports.getEditProduct = (request, response, next)=>{
    console.log("Get Edit Product....");
    Products.fetch(request.params.productId)
        .then( ([rowsData, metaData])=>{
            response.render('./admin/editProduct', {
                pageTitle:"Edit Product Page",
                product: rowsData[0]
            })
        })
        .catch(error=>{console.log(error)})
}

exports.postEditProduct = (request, response, next)=>{
    console.log("Post Edit Product...", request.body);
    Products.postEditProduct(request.body)
        .then( ()=>{
            response.redirect('/admin/adminProducts');
        })
        .catch(error=>{console.log(error)})
}

