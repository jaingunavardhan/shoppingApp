//In this, we define how the data is handled for PRODUCTS view
//Importing the database file to use that database object created over there
//This database object returns a promise (refer ../util/database.js, It exports a promise from db)
const db = require('../util/database.js');

//Exporting Products class to be able to be accessible by Controller
module.exports = class Products{
    constructor(title, imageURL, description, price)
    {
        console.log("In constructor...")
        this.title = title;
        this.imageURL= imageURL;
        this.description= description;
        this.price=parseInt(price);  
    }

    save()
    {
        console.log("In save...", this.imageURL);
        return db.execute(
            'INSERT INTO products (title, imageURL, description, price) VALUES (?, ?, ?, ?)',
            [this.title, this.imageURL, this.description, this.price]
        ); 
    }

    static fetchAll()
    {
        console.log("In fetchAll...");
        //Returning the promise received from database
        return db.execute('SELECT * FROM products')
    }

    static fetch(productId)
    {
        //Retunring the promise received from Database object
        // Here, ?(question) represents that it should be replaced by data passed in following array
        //We use this ? as a security layer to not disclose data to sequel attackers
        return db.execute('SELECT * FROM products WHERE id=?', [productId]);
    }

    static deleteProduct(productId)
    {
        return db.execute(
            'DELETE FROM products WHERE id=?',
            [productId]
        );
    }

    static postEditProduct(productData)
    {
        // Here, ?(question) represents that it should be replaced by data passed in following array
        //We use this ? as a security layer to not disclose data to sequel attackers
        return db.execute(
            'UPDATE products SET title=?, imageURL=?, description=?, price=? WHERE id=?',
            [productData.title, productData.imageURL, productData.description, productData.price, productData.productId]
        )
    }
}
