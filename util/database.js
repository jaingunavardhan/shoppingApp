//Importing Sequelize Class
const Sequelize = require('sequelize');

//Creating an instance of Sequelize class by specifying the arguments
const sequelize = new Sequelize(
    'node_shopping',      //Database name
    'root',         //Username
    'guna',         //Password
    {               //An OPTIONAL Object parameter to provide metaData info
        dialect: 'mysql',
        host: 'localhost'
    }
);

//Exporting the created instance
module.exports = sequelize;
//As we have created an instance, we now need to synchronize it with our node_db
//We do that in starting point file, so that we start our server only if db is available