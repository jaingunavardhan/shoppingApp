//In this, we define how the data is handled for PRODUCTS view
const fs = require('fs');
const path = require('path');

//File path to store the file created. Conventionally we store these files in data folder
const productspath = path.join(__dirname, 'data', 'products.json');

function read()
{
    console.log("In read...")
    if(fs.existsSync(productspath))
        return JSON.parse( fs.readFileSync(productspath) );
    return [];
}

function write(data)
{
    console.log("In write...")
    fs.writeFileSync( productspath, JSON.stringify(data) );
}

//Exporting Products class to be able to be accessible by Controller
module.exports = class Products{
    constructor(id, title, imageURL, desc, price)
    {
        console.log("In constructor...")
        this.id = id;
        this.title = title;
        this.imageURL= imageURL;
        this.desc= desc;
        this.price=parseInt(price);
        
    }

    save()
    {
        console.log("In save...")
        const productsList = read();
        productsList.push(this);
        write(productsList);   
    }

    static fetchAll()
    {
        console.log("In fetchAll...");
        return read();
    }

    static fetch(productId)
    {
        const productsList = read();
        return productsList.find( product => product.id == productId )
    }

    static deleteProduct(productId)
    {
        const productsList = read();
        const updatedProductsList = [];
        for(let product of productsList)
        {
            if(product.id == productId)
                continue
            updatedProductsList.push(product);
        }
        write(updatedProductsList);
    }

    static postEditProduct(productData)
    {
        const productsList = Products.fetchAll();
        for(let product of productsList)
        {
            if(product.id == productData.productId)
            {
                product.title = productData.title;
                product.imageURL = productData.imageURL;
                product.desc = productData.desc;
                product.price = productData.price;
            }
        }
        write(productsList);
    }
}
