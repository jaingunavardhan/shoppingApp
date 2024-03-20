//This Controller uses the PRODUCT model to render the data onto views of PRODUCTS
const Product = require('../models/product.js');

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
    //Table_name.findAll() returns a promise with the content of array of rows present in data
    request.user.getProducts()
        .then( (products)=>{    //products-> contans an array of rows of the Table
            //Rendering the ejs file and passing the data to the ejs file so that it can handle how to display.
            //Refer .ejs (Templating Engines) to get more understanding of how the data is handled in .ejs views
            response.render( './admin/adminProducts', {
                pageTitle : "Products Page",
                productsList : products
            });
        })
        .catch(error=>{console.log(error)})
}

exports.showProducts = (request, response, next)=>{
    console.log("Show ProductS...")
    //Here we received the promise as a return from Products.fetchAll()
    //We destructure the result of the promise into rowsData(a list of rows) & metaData(we don't use)
    Product.findAll()
        .then( (products)=>{ //products-> contans an array of rows of the Table
            console.log(products)
            response.render( 'shop', {
                pageTitle : "Home Page",
                productsList : products
            });
        })
        .catch(error=>{console.log(error)})
    
}

exports.showProduct = (request, response, next)=>{
    console.log("Show ProducT...")
    //Table_name.findAll(Condition_Object with Conditions_in_Sub_Object)
    //gives an array of rows with id=requested_id
    //There is also other methods to find a row with id (refer getEditProduct method below)
    Product.findByPk(request.params.productId)
        .then( (product)=>{
            response.render('showProduct', {
                pageTitle:"Product Details",
                product: product    //Passing first row (Obviouslt we will have only one row with ID)
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
    console.log("post add product...", request.body)
    //Creates an entry (row) in the Products table and returns a promise
    //Table_name.create(Object_Containing_the_Values_of_Columns)
    request.user.createProduct({
        title: request.body.title,
        imageURL: request.body.imageURL,
        description: request.body.description,
        price: request.body.price
    })
    .then( ()=>{
        response.redirect('/admin/adminProducts');
    })
    .catch(error=>{console.log(error)})     
}

exports.deleteProduct = (request, response, next)=>{
    console.log("delete Product...", request.params.productId);
    //Finding Product/row by Primary key
    Product.findByPk(request.params.productId)
        .then( (product)=>{ //Returned a productObject
            return product.destroy(); //We destroy this object & return a promise
        })
        .then(()=>{ //Handling the above promise outside as it returned to outside
            response.redirect('/admin/adminProducts')
        })
        .catch(error=>{console.log(error)});

    //Instead of above, we can also directly use
    // Products.destroy({WHERE:{id: request.params.productID}})
    //This direclty destroys the product with the ID passed and returns a promise
}

exports.getEditProduct = (request, response, next)=>{
    console.log("Get Edit Product....", request.params.productId);
    //Finding by Primary Key of table which is the ID in this case
    //Table_name.findByPk(primary_key) gives the corresponding row object
    Product.findByPk(request.params.productId)
        .then( (product)=>{
            console.log(product.description)
            response.render('./admin/editProduct', {
                pageTitle:"Edit Product Page",
                product: product
            })
        })
        .catch(error=>{console.log(error)})
}

exports.postEditProduct = (request, response, next)=>{
    console.log("Post Edit Product...", request.body);
    //Finding the row by PrimaryKey
    Product.findByPk(request.body.productId)
        .then( (product)=>{
            //editing the row Object here
            product.title = request.body.title,
            product.imageURL = request.body.imageURL,
            product.description = request.body.description,
            product.price = request.body.price
            //Finally after replacing values at local, we need to execute
            //rowObject.save() to make changes in database
            //This also return a promise, so we return it outside this current then() callback
            return product.save()
        })
        .then(()=>{     //Handling the above callback outside of the callback
            response.redirect('/admin/adminProducts');
        })
        .catch(error=>{console.log(error)})
}

