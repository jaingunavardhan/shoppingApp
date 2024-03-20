//Importing expresss
const express = require('express');
//Importing path={}
const path = require('path');
//Importing the router files to handle incoming request
const shopRoutes = require('./routes/shopRouter.js');
const adminRoutes = require('./routes/adminRouter.js');
//Importing the db sequelize instance from database.js file
const sequelize = require('./util/database.js');
const Product = require('./models/product.js');
const User = require('./models/user.js');
const Cart = require('./models/cart.js');
const CartItem = require('./models/cartItem.js');


//Creating an express server
const app = express();

//As we are using .ejs files instead of .html at frontend, we need to configure ejs views.
//html cannot have power to implement logics, but ejs does.
app.set("view engine", "ejs");
//express.static(ANY_FILE_PATH) - used to send the dependencies to be accessed by views
//path.join(ANY_DIRECTORY, SUB_PATH, SUB_PATH)- clubs and gives ANY_DIRECTORY/SUB_PATH/SUB_PATH
// __dirname is a inbuilt function of PATH module and gives the current directory we are in.
//__direname gives the current directory of the file where the server has started, in this case app.js
app.use( express.static(path.join(__dirname, 'public')) );


app.use((request, response, next)=>{
    User.findByPk(1)
        .then((user)=>{
            request.user = user;
            next();
        })
        .catch(error=>console.log(error));
})
//Filtering '/admin' routes to be handled by adminRoutes file
app.use('/admin', adminRoutes);
//Any other routes without '/admin' preceeding the routes will be handled by shopRoutes file
app.use(shopRoutes);
//All these route files are present in ROUTES folder.


Product.belongsTo(User, {constraints:true, onDelete: 'CASCADE'});
User.hasMany(Product);
Cart.belongsTo(User, {constraints:true, onDelete:'CASCADE'});
User.hasOne(Cart);
Product.belongsToMany(Cart, {through: CartItem});
Cart.belongsToMany(Product, {through: CartItem});

//Synchronizing our node_db database with the created instance
//It returns a promise
sequelize.sync()
    .then((result)=>{
        return User.findByPk(1)
    })
    .then((user)=>{
        if(!user)
            return User.create({name:"Gunavardhan jain", email:"gunavardhanjain@gmail.com"})
        return user;
    })
    .then( (user)=>{
        user.getCart()
            .then(cart=>{
                if(!cart)
                    return user.createCart()
                return cart;
            })
    })
    .then((cart)=>{
        //The RESULT would contain the SQL statement executed & other metadata
        //console.log(result);
        //If sync with database is success,
        //Listening for any requests on port 4000.
        app.listen(4000);  
    })
    .catch(error=>{console.log(error)})
