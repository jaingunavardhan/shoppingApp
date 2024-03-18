//Importing expresss
const express = require('express');
//Importing path={}
const path = require('path');
//Importing the router files to handle incoming request
const shopRoutes = require('./routes/shopRouter.js');
const adminRoutes = require('./routes/adminRouter.js');

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

//Filtering '/admin' routes to be handled by adminRoutes file
app.use('/admin', adminRoutes);
//Any other routes without '/admin' preceeding the routes will be handled by shopRoutes file
app.use(shopRoutes);
//All these route files are present in ROUTES folder.

//Listening for any requests on port 4000.
app.listen(4000);